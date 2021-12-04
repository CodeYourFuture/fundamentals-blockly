/* jshint esversion: 6 */

window.LoopTrap = 1000;
Blockly.JavaScript.INFINITE_LOOP_TRAP =
  'if(--window.LoopTrap <= 0) throw "Infinite loop.";\n';

function BlocklyDomEditor(root, id) {
  this.root = root;
  this.id = id;
  this.toolbox = document.getElementById("toolbox");
  this.blocklyHtml = this.getElementId("blocklyHtml");
  this.htmlTab = this.getElementId("htmlTab");
  this.jsTab = this.getElementId("jsTab");
  this.htmlTextarea = this.getElementId("htmlTextarea");
  this.generatedJsTextarea = this.getElementId("generatedJsTextarea");
  this.blocklyOutput = this.getElementId("blocklyOutput");
  this.blocklyDiv = this.getElementId("blocklyDiv");
  this.runButton = this.getElementId("runButton");
}

BlocklyDomEditor.prototype.getElementId = function (elementId) {
  return elementId + this.id;
};

BlocklyDomEditor.prototype.init = function (initHtml) {
  // keep <ul id="list"></ul> as default value in text area for most exercises
  this.root.innerHTML = `
    <div id="${this.blocklyHtml}" class="blocklyHtml" style="float: left">
      <ul>
        <li id="${this.htmlTab}" class="current">Static html</li>
        <li id="${this.jsTab}" class="notcurrent">Generated code</li>
      </ul>
      <textarea id="${this.htmlTextarea}" cols="50" rows="10">
<ul id="list"></ul>
      </textarea>
      <textarea id="${this.generatedJsTextarea}" class="generatedJsTextarea" cols="50" rows="10"></textarea>
      <button id="${this.runButton}" class="btn">run</button>
    </div>
    <div id="${this.blocklyOutput}" style="float: left; clear: left"></div>
    <div id="${this.blocklyDiv}" style="height: 480px; width: 1300px"></div>
  `;
  this.workspace = Blockly.inject(this.blocklyDiv, {
    toolbox: this.toolbox,
  });
  let workspace = this.workspace;
  let id = this.id;

  let $generatedJsTextarea = document.getElementById(this.generatedJsTextarea);
  let $htmlTextarea = document.getElementById(this.htmlTextarea);
  let $htmlTab = document.getElementById(this.htmlTab);
  let $jsTab = document.getElementById(this.jsTab);
  let $blocklyOutput = document.getElementById(this.blocklyOutput);

  if (initHtml) {
    $htmlTextarea.value = initHtml;
  }

  setTimeout(() => {
    BlocklyDomEditor.restoreBlocks(workspace, $htmlTextarea, id);
    // don't register backup unless we successfully restored blocks to avoid losing data
    BlocklyDomEditor.backupOnUnload(workspace, $htmlTextarea, id);
  }, 0);

  let code = "";
  workspace.addChangeListener(() => {
    Blockly.JavaScript.addReservedWords("code");
    code = Blockly.JavaScript.workspaceToCode(workspace);
    $generatedJsTextarea.value = code;
  });

  function loadHtmlAndRunCode() {
    let blocklyHtml = $htmlTextarea.value;
    $blocklyOutput.innerHTML = blocklyHtml;
    BlocklyTest.setCurrentTest(id);
    window.LoopTrap = 1000; // reset it
    eval(code);
  }

  document
    .getElementById(this.runButton)
    .addEventListener("click", loadHtmlAndRunCode);

  $htmlTab.addEventListener("click", () => {
    $generatedJsTextarea.style.display = "none";
    $htmlTextarea.style.display = "block";
    $htmlTab.className = "current";
    $jsTab.className = "notcurrent";
  });

  $jsTab.addEventListener("click", () => {
    $generatedJsTextarea.style.display = "block";
    $htmlTextarea.style.display = "none";
    $htmlTab.className = "notcurrent";
    $jsTab.className = "current";
  });
};

BlocklyDomEditor.prototype.hide = function () {
  // remove html from dom to avoid id collisions between exercises
  let blocklyOutput = document.getElementById(this.blocklyOutput);
  blocklyOutput.replaceChildren();
};

BlocklyDomEditor.prototype.show = function () {
  // do we need to do anything?
};

/**
 * Backup code blocks to localStorage.
 * @param {!Blockly.WorkspaceSvg} workspace Workspace.
 * @private
 */
BlocklyDomEditor.backupBlocks_ = function (workspace, $htmlTextarea, id) {
  if ("localStorage" in window) {
    var xml = Blockly.Xml.workspaceToDom(workspace);
    // Gets the current URL, not including the hash.
    var url = window.location.href.split("#")[0];
    window.localStorage.setItem(url + id, Blockly.Xml.domToText(xml));
    window.localStorage.setItem(url + "html" + id, $htmlTextarea.value);
  }
};

/**
 * Bind the localStorage backup function to the unload event.
 * @param {Blockly.WorkspaceSvg=} opt_workspace Workspace.
 */
BlocklyDomEditor.backupOnUnload = function (workspace, $htmlTextarea, id) {
  window.addEventListener(
    "unload",
    function () {
      BlocklyDomEditor.backupBlocks_(workspace, $htmlTextarea, id);
    },
    false
  );
};

/**
 * Restore code blocks from localStorage.
 * @param {Blockly.WorkspaceSvg=} opt_workspace Workspace.
 * @param {String} id unique id, must be stable across page reloads
 */
BlocklyDomEditor.restoreBlocks = function (workspace, $htmlTextarea, id) {
  var url = window.location.href.split("#")[0];
  if ("localStorage" in window && window.localStorage[url + id]) {
    var xml = Blockly.Xml.textToDom(window.localStorage[url + id]);
    Blockly.Xml.domToWorkspace(xml, workspace);
    var html = window.localStorage[url + "html" + id];
    if (html) {
      $htmlTextarea.value = html;
    }
  }
};

BlocklyTest = {
  tests: {},
  registerTest: function (name, test) {
    this.tests[name] = test;
  },
  findElement: function (selectors) {
    let prefix = this.currentTestName;
    return selectors
      .map((selector) => document.querySelector(`#${prefix} ${selector}`))
      .find((element) => element !== null && element !== undefined);
  },
  findArrayValues: function () {
    let prefix = this.currentTestName;
    let code = document.querySelector(`#${prefix} .generatedJsTextarea`).value;
    try {
      return JSON.parse(code.match(/data: (\[.*\])}/)[1].replaceAll("'", '"'));
    } catch (e) {
      return [];
    }
  },
  expect: function (index, message, element, assertion) {
    if (!element) return;
    // Options for the observer (which mutations to observe)
    const config = { attributes: true, childList: true, subtree: true };

    let $report = this.getOrCreateNotYetPassing(index, message);

    const observer = new MutationObserver(() => {
      if (assertion(element)) {
        $report.showPassing();
      }
    });

    // Start observing the target node for configured mutations
    observer.observe(element, config);
  },
  expectAfterClick: function (index, message, element, getState, assertion) {
    if (!element) return;
    let $report = this.getOrCreateNotYetPassing(index, message);

    let stateBefore = null;
    // add as the first event listener
    element.addEventListener("click", () => {
      stateBefore = getState();
    });

    window.setTimeout(() => {
      // add as the last event listener
      element.addEventListener("click", () => {
        stateAfter = getState();
        if (assertion(stateBefore, stateAfter)) {
          $report.showPassing();
        }
      });
    }, 0);
  },
  setCurrentTest(id) {
    this.currentTestName = id;
    let test = this.tests[id];
    if (test) {
      test();
    }
  },
  getOrCreateNotYetPassing: function (index, message) {
    const checkId = `${this.currentTestName}_${index}`;
    let $li = document.getElementById(checkId);
    let $span = $li.querySelector("span");
    if (!$span) {
      $span = document.createElement("span");
      $span.innerHTML = "&check;&nbsp;";
      $li.insertBefore($span, $li.firstChild);
    }
    $span.style.color = "gray";
    $span.title = "This test is not currently passing: " + message;
    return {
      showPassing: function () {
        $span.style.color = "chartreuse";
        $span.title = message;
      },
    };
  },
};

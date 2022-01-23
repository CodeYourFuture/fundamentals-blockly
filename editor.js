/* jshint esversion: 6 */

window.LoopTrap = 1000;
Blockly.JavaScript.INFINITE_LOOP_TRAP =
  'if(--window.LoopTrap <= 0) throw "Infinite loop.";\n';

function BlocklyDomEditor(root, id) {
  this.root = root;
  this.id = id;
  this.toolbox = document.querySelector(`#${id} .toolbox`);
  if (!this.toolbox) {
    this.toolbox = document.getElementById("toolbox");
  }
  this.blocklyHtml = this.getElementId("blocklyHtml");
  this.htmlTab = this.getElementId("htmlTab");
  this.jsTab = this.getElementId("jsTab");
  this.htmlTextarea = this.getElementId("htmlTextarea");
  this.generatedJsTextarea = this.getElementId("generatedJsTextarea");
  this.blocklyOutput = this.getElementId("blocklyOutput");
  this.blocklyDiv = this.getElementId("blocklyDiv");
  this.blocklyArea = this.getElementId("blocklyArea");
  this.runButton = this.getElementId("runButton");
  this.share = this.getElementId("share");
}

BlocklyDomEditor.prototype.getElementId = function (elementId) {
  return elementId + this.id;
};

BlocklyDomEditor.prototype.init = function (initHtml, initJsonBlockly) {
  this.root.setAttribute(
    "style",
    "margin-left:2em; display:grid;grid-template-columns: 1fr 2fr;grid-template-rows: auto 1fr;"
  );
  this.root.innerHTML = `
    <div id="${this.blocklyHtml}" class="blocklyHtml">
      <ul>
        <li id="${this.htmlTab}" class="current">Static html</li>
        <li id="${this.jsTab}" class="notcurrent">Generated code</li>
        <li id="${this.share}" class="notcurrent">Share</li>
      </ul>
      <textarea id="${this.htmlTextarea}" cols="50" rows="10">
      </textarea>
      <textarea id="${this.generatedJsTextarea}" class="generatedJsTextarea" cols="50" rows="10"></textarea>
      <button id="${this.runButton}" class="runButton">run</button>
    </div>
    <div id="${this.blocklyArea}" style="height:400px;resize:vertical; overflow:auto; grid-row-end: span 2;"></div>
    <div id="${this.blocklyOutput}"></div>
    <div id="${this.blocklyDiv}" style="position:absolute"></div>
  `;

  let $blocklyArea = document.getElementById(this.blocklyArea);
  let $blocklyDiv = document.getElementById(this.blocklyDiv);
  let id = this.id;

  this.workspace = Blockly.inject(this.blocklyDiv, {
    toolbox: this.toolbox,
  });
  let workspace = this.workspace;

  this.onresize = function (e) {
    if (
      window.getComputedStyle($blocklyArea).display !== "block" ||
      $blocklyArea.offsetWidth === 0
    ) {
      // don't resize if the area is invisible or has a width of 0
      return;
    }
    // Compute the absolute coordinates and dimensions of blocklyArea.
    var element = $blocklyArea;

    var x = 0;
    var y = 0;
    do {
      x += element.offsetLeft;
      y += element.offsetTop;
      element = element.offsetParent;
    } while (element);
    // Position blocklyDiv over blocklyArea.
    $blocklyDiv.style.left = x + "px";
    $blocklyDiv.style.top = y + "px";
    $blocklyDiv.style.width = $blocklyArea.offsetWidth - 10 + "px";
    $blocklyDiv.style.height = $blocklyArea.offsetHeight - 10 + "px";
    Blockly.svgResize(workspace);
  };
  resizeObserver = new ResizeObserver(this.onresize);
  resizeObserver.observe($blocklyArea);
  this.onresize();
  //Blockly.svgResize(workspace);

  let $generatedJsTextarea = document.getElementById(this.generatedJsTextarea);
  let $htmlTextarea = document.getElementById(this.htmlTextarea);
  let $htmlTab = document.getElementById(this.htmlTab);
  let $jsTab = document.getElementById(this.jsTab);
  let $share = document.getElementById(this.share);
  let $blocklyOutput = document.getElementById(this.blocklyOutput);

  if (initHtml) {
    $htmlTextarea.value = initHtml;
  }

  setTimeout(() => {
    try {
      if (initJsonBlockly !== undefined) {
        // don't use storage at all
        Blockly.serialization.workspaces.load(initJsonBlockly, workspace);
      } else {
        BlocklyDomEditor.restoreBlocks(workspace, $htmlTextarea, id);
      }
      // don't register backup unless we successfully restored blocks to avoid losing data
      BlocklyDomEditor.backupOnUnload(workspace, $htmlTextarea, id);
    } catch (e) {
      console.log("couldn't restore blocks for " + id);
      throw e;
    }
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

  $share.addEventListener("click", () => {
    let json = Blockly.serialization.workspaces.save(workspace);
    let html = $htmlTextarea.value;
    let data = JSON.stringify({ j: json, h: html });
    console.log(data);
    let minifiedData = JSONCrush.crush(data);
    var url = window.location.href
      .split("#")[0]
      .replace("index.html", "share.html");
    let uri = url + "?v=" + encodeURIComponent(minifiedData);
    navigator.clipboard.writeText(uri);
  });
};

BlocklyDomEditor.prototype.hide = function () {
  // remove html from dom to avoid id collisions between exercises
  let blocklyOutput = document.getElementById(this.blocklyOutput);
  blocklyOutput.replaceChildren();
};

BlocklyDomEditor.prototype.show = function () {
  //this.onresize();
};

/**
 * Backup code blocks to localStorage.
 * @param {!Blockly.WorkspaceSvg} workspace Workspace.
 * @private
 */
BlocklyDomEditor.backupBlocks_ = function (workspace, $htmlTextarea, id) {
  if ("localStorage" in window) {
    var json = JSON.stringify(Blockly.serialization.workspaces.save(workspace));
    // Gets the current URL, not including the hash.
    var url = window.location.href.split("#")[0];
    window.localStorage.setItem(url + id, json);
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
    let serialised = window.localStorage[url + id];
    if (serialised[0] === "<") {
      let xml = Blockly.Xml.textToDom(serialised);
      Blockly.Xml.domToWorkspace(xml, workspace);
    } else {
      let json = JSON.parse(serialised);
      console.log(
        "chars",
        id,
        serialised.length,
        JSONCrush.crush(serialised).length
      );
      Blockly.serialization.workspaces.load(json, workspace);
    }

    let html = window.localStorage[url + "html" + id];
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
    let prefix = "blocklyOutput" + this.currentTestName;
    return selectors
      .map((selector) => document.querySelector(`#${prefix} ${selector}`))
      .find((element) => element !== null && element !== undefined);
  },
  findArrayValues: function (n) {
    let prefix = this.currentTestName;
    let code = document.querySelector(`#${prefix} .generatedJsTextarea`).value;
    try {
      return JSON.parse(
        [...code.matchAll(/(\[.*\]);/g)][n][1].replaceAll("'", '"')
      );
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
    let $span = $li.querySelector("span.test-checkbox");
    if (!$span) {
      $span = document.createElement("span");
      $span.setAttribute("class", "test-checkbox");
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

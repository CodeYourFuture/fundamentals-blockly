/* jshint esversion: 6 */

const zeroMdRendered = Promise.all(
  [...document.querySelectorAll("zero-md")].map((zeroMd) => {
    return new Promise((resolve, reject) => {
      addEventListener("zero-md-rendered", (ev) => {
        // ev.detail.stamped.body says true even when there is no markdow-body?
        // could be a bug in zero-md - or a misunderstanding of the apoi
        if (zeroMd.shadowRoot.querySelector("div.markdown-body")) {
          resolve(true);
        }
      });
    });
  })
);
// wait for all zeroMd to be rendered before initialising
zeroMdRendered.then(initExercises);

function initExercises() {
  let exercises = findExercises();
  setupToc(exercises);
  addDomElements(exercises);
  exercises.forEach(hideExercise);
  let exerciseIdFromUrl = window.location.hash.substring(1);
  let initialExercise =
    exercises.find((exercise) => exercise.id === exerciseIdFromUrl) ||
    exercises[0];
  selectExercise(initialExercise);
}

function findExercises() {
  let $exercises = [...document.querySelectorAll(".exercise")];
  return $exercises.map(($exercise) => {
    $h2 = $exercise.querySelector("h2");
    title = $h2.innerText;
    return { $exercise, $h2, title };
  });
}

function setupToc(exercises) {
  let $toc = document.getElementById("toc");
  let $ul = document.createElement("ol");
  exercises.forEach((exercise) => {
    $li = document.createElement("li");
    $li.setAttribute("role", "button");
    $li.innerText = exercise.title;
    $li.addEventListener("click", () => {
      selectExercise(exercise);
    });
    $ul.appendChild($li);
    exercise.$li = $li;
  });
  $toc.appendChild($ul);
}

function addDomElements(exercises) {
  for (let i = 0; i < exercises.length; i++) {
    let exercise = exercises[i];
    let $nav = document.createElement("nav");
    $nav.setAttribute("class", "nav-buttons");
    if (i > 0) {
      $nav.appendChild(createNavElement("previous exercise", exercises[i - 1]));
    }
    if (i < exercises.length - 1) {
      $nav.appendChild(createNavElement("next exercise", exercises[i + 1]));
    }
    exercise.$exercise.insertBefore($nav, exercise.$h2);
    exercise.$blockly = document.createElement("div");
    exercise.$exercise.insertBefore(
      exercise.$blockly,
      exercise.$h2.nextSibling
    );
    exercise.id = i;
    if (exercise.$exercise.id) {
      exercise.id = exercise.$exercise.id;
    }
    exercise.blocklyDomEditor = new BlocklyDomEditor(
      exercise.$blockly,
      exercise.id
    );
    let $startCode = exercise.$exercise.querySelector(".start_code"); // can be removed when all migrated to markdown
    if (!$startCode) {
      // get the first <pre class="language-html"> inside rendered markdown
      let $zeroMd = exercise.$exercise.querySelector("zero-md");
      if ($zeroMd) {
        let $instructionsRoot = $zeroMd.shadowRoot;
        $startCode = $instructionsRoot.querySelector("pre.language-html");
      }
    }
    if ($startCode) {
      exercise.blocklyDomEditor.init($startCode.innerText);
    } else {
      exercise.blocklyDomEditor.init();
    }
  }
}

function createNavElement(name, exercise) {
  $navElement = document.createElement("button");
  $navElement.innerText = name;
  $navElement.addEventListener("click", (e) => {
    e.preventDefault();
    selectExercise(exercise);
  });
  return $navElement;
}

let currentExercise = null;

function selectExercise(exercise) {
  if (currentExercise) {
    hideExercise(currentExercise);
  }
  showExercise(exercise);
  window.location.hash = exercise.id;
  currentExercise = exercise;
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function hideExercise(exercise) {
  exercise.$exercise.style.display = "none";
  exercise.$li.classList.remove("current");
  exercise.blocklyDomEditor.hide();
}

function showExercise(exercise) {
  exercise.$exercise.style.display = "block";
  exercise.$li.classList.add("current");
  exercise.blocklyDomEditor.show();
}

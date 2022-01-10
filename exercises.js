/* jshint esversion: 6 */

let exercises = findExercises();
let currentExercise = null;
setupToc(exercises);
addDomElements(exercises);
exercises.forEach(hideExercise);
let exerciseIdFromUrl = window.location.hash.substring(1);
let initialExercise =
  exercises.find((exercise) => exercise.id === exerciseIdFromUrl) ||
  exercises[0];
selectExercise(initialExercise);

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
  let $ul = document.createElement("ul");
  exercises.forEach((exercise) => {
    $li = document.createElement("li");
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
    let $nav = document.createElement("div");
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
    let startCode = exercise.$exercise.querySelector(".start_code");
    if (startCode) {
      exercise.blocklyDomEditor.init(startCode.innerText);
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
  $navElement.style.marginRight = "5px";
  return $navElement;
}

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
  exercise.$li.style.backgroundColor = "darkslateblue";
  exercise.blocklyDomEditor.hide();
}

function showExercise(exercise) {
  exercise.$exercise.style.display = "block";
  exercise.$li.style.backgroundColor = "slateblue";
  exercise.blocklyDomEditor.show();
}

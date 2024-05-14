let secondStage;
const editorSecond = document.querySelector(".editor-second");
let workSheet = document.querySelector(".question-list-container");
const workSheetList = document.querySelector(".question-list");
const initialState = document.getElementById("editor").innerHTML;
let pageTitle = document.title;
let questionList = [];

let workSheetHTML = "";

function startEditing() {
  let questionInput = document.querySelector(".question-input");
  let content = questionInput.value;
  if (!content) {
    return;
  }
  if (content.trim().length == 0) {
    return;
  }

  if (editorSecond.childNodes.length) {
    return;
  }
  secondStage = content;
  breakOnButtons();
}

function handleTaskKeydown(event) {
  if (event.key === "Enter") {
    startEditing();
  }
}

function onWordClick(event) {
  let input = document.createElement("input");
  input.classList.add("js-word-gap", "js-switched-word");
  let edit = document.createElement("button");
  edit.classList.add("js-word-gaped");
  const parent = event.target.parentElement;
  const index = Array.prototype.indexOf.call(parent.children, event.target);
  let blockPlace = document.createElement("span");
  blockPlace.classList.add("js-block-place");
  blockPlace.classList.add(`js-block-place-${index}`);
  blockPlace.appendChild(input);
  blockPlace.appendChild(edit);
  editorSecond.appendChild(blockPlace);

  edit.innerHTML = "X";
  function restoreButton() {
    console.log(`.js-block-place-${index}`);
  }

  edit.onclick = function () {
    removeInputPlace(`.js-block-place-${index}`, restoreButton);
  };
  event.target.replaceWith(blockPlace);


  editedWord = event.target.innerText;
  let hint = document.createElement("p");
  hint.classList.add("js-task-hint");
  hint.innerHTML = `
(<input class="js-hint-generator" placeholder="${editedWord}"/>)
<button onclick="
 removeHintPlace();
">X</button>
`;
  editorSecond.appendChild(hint);
}

function breakOnButtons() {
  if (secondStage != null) {
    let secondStageList = secondStage.split(" ");
    for (i = 0; i < secondStageList.length; i++) {
      let wordButt = document.createElement("button");
      wordButt.classList.add("js-switched-word");
      let wordDatt = document.createTextNode(secondStageList[i]);
      wordButt.appendChild(wordDatt);
      editorSecond.appendChild(wordButt);
      wordButt.onclick = onWordClick;
    }
  }
}

function getWordElementsByClass() {
  const elements = document.querySelectorAll(".js-switched-word");

  return Array.from(elements);
}
function printElements() {
  const elements = getWordElementsByClass();
  if (elements.length === 0) {
    return;
  }
  const words = elements.map((element) => {
    if (element.classList.contains("js-word-gap")) {
      const value = element.getAttribute("value");
      return "".padStart(value ? value.length : 9, "___________");
    }

    return element.textContent;
  });
  const question = words.join(" ");
  const hintPlace = document.querySelector(".js-hint-generator");
  let hint = hintPlace?.value || "";
  createListItem(question, hint);
  saveQuestionToLocalStorage(question, hint);
}   

function saveQuestionToLocalStorage(question, hint){
  const currentQuestions = getQuestions();
  const updatedQuestions = [...currentQuestions, { text: question, hint: hint }];
  localStorage.setItem("questions", JSON.stringify(updatedQuestions));
}

function createListItem(question, hint) {
  let listItem = document.createElement("li");
  let questionWords = document.createElement("div");
  listItem.classList.add("question-item");
  questionWords.classList.add("question-words");

  questionWords.innerText = question;
  listItem.appendChild(questionWords);
  workSheetList.appendChild(listItem);

  if (hint) {
    let questionHint = document.createElement("span");
    questionHint.classList.add("question-hint");
    const hintOutcome = `(${hint})`;
    questionHint.innerHTML = hintOutcome;
    listItem.appendChild(questionHint);
  }
  const removeButton = document.createElement("button");
  removeButton.classList.add("js-removal-button");
  listItem.appendChild(removeButton);
  removeButton.onclick = removeDetail;
  clearAllForm();
  removeButton.innerHTML = 'x';

  let questionString = listItem.innerText;
  console.log(questionString);
  questionList.push(questionString);
  console.log(questionList);

  

  function removeDetail(event) {
    const questionNode = event.currentTarget.parentElement;
    const index = Array.prototype.indexOf.call(questionNode.parentNode.childNodes, questionNode);
    removeQuestionFromLocalStorage(index);
    questionNode.remove();
  }
}

function removeQuestionFromLocalStorage(index){
  const currentQuestions = getQuestions();
  const updatedQuestions = [...currentQuestions];
  updatedQuestions.splice(index, 1);
  localStorage.setItem("questions", JSON.stringify(updatedQuestions));

}

function clearAllForm() {
  const editorOrigin = document.getElementById("editor");
  editorOrigin.innerHTML = initialState;
  const questionSet = document.querySelector(".question-input");
  questionSet.value = "";
}

function removeHintPlace() {
  const hintPlace = document.querySelector(".js-task-hint");
  const hintTool = document.querySelector(".js-hint-gaped");
  hintPlace.remove();
  hintTool.remove();
}

function removeInputPlace(className, onRemove) {
  const savePlace = document.querySelector(className);
  savePlace.remove();
  onRemove();
}

function addTestTitle() {}

window.addEventListener("beforeprint", function () {
  let assignedTitle = document.querySelector(".worksheet-name").value;
  if (assignedTitle) {
    document.title = assignedTitle;
  }
});

window.addEventListener("afterprint", function () {
  document.title = pageTitle;
});

function getQuestions() {
  const questions = JSON.parse(localStorage.getItem("questions")) || [];
  return questions;
}

function init() {
  const questions = getQuestions();
  questions.forEach((question) => {
    createListItem(question.text, question.hint);
  });
}

init();

$(document).ready(function(){
  $('#name_one').on('keyup',function(){
    var c_val = $(this).val();
    $('#name_two').text(c_val);
});
});


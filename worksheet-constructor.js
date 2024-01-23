let secondStage = document.querySelector('.input-second-stage').innerText
let secondStageInfo = document.querySelector('.input-second-stage')
const editorSecond = document.querySelector('.editor-second')
let workSheet = document.querySelector('.question-list-container')
const workSheetList = document.querySelector('.question-list')

const questionList = [];
let workSheetHTML = '';


function startEditing() {
let questionSet= document.querySelector('.question-input')
let content = questionSet.value
if (content != null) {
document.querySelector('.input-second-stage')
 .innerHTML = `${content}`;
 secondStage = content
 breakOnButtons()
  }
}

function handleTaskKeydown(event) {
 if (event.key === 'Enter') { 
 startEditing();
 }
}

function onWordClick (event) {
let input = document.createElement("input");
input.classList.add('js-word-gap','js-switched-word');
let edit = document.createElement("button");
edit.classList.add('js-word-gaped');
edit.innerHTML = 'X';
edit.onclick = removeInputPlace;
event.target.replaceWith(input, edit);
editedWord = event.target.innerText;
let hint = document.createElement("p")
hint.classList.add('js-task-hint')
hint.innerHTML = `<p class="js-hint-place">
(<input class="js-hint-generator" placeholder="${editedWord}">)
<button onclick="
 removeHintPlace();
">X</button>
</p>
`
editorSecond.appendChild(hint);
}

function breakOnButtons() {
if (secondStage != null) {
let secondStageList = secondStage.split(" ");
 for (i = 0; i < secondStageList.length; i++) {
 let wordButt = document.createElement("button");
 wordButt.classList.add('js-switched-word')
 let wordDatt = document.createTextNode(secondStageList[i]);
 wordButt.appendChild(wordDatt);
 editorSecond.appendChild(wordButt);
 secondStageInfo.remove();
 wordButt.onclick = onWordClick;

  }
 }
}

function getWordElementsByClass() {
const elements = document.querySelectorAll('.js-switched-word');

return Array.from(elements);
}

function printElements() {
const elements = getWordElementsByClass();

const words = elements.map((element) => {
 if(element.classList.contains('js-word-gap')) {
   const value = element.getAttribute('value');
   return ''.padStart(value ? value.length : 6, '________');
 }
 
 return element.textContent;
 

}); 
let dataQuestion = document.createElement('li');
dataQuestion.innerText = words.join(' ');
workSheetList.appendChild(dataQuestion)
questionList.push(dataQuestion);

}

function addHints() {
const hintPlace = document.querySelector('.js-hint-generator');
let hintData = hintPlace.value;
let html = document.createElement('span');
html.innerHTML = `(${hintData})`;
workSheetList.appendChild(html)
};


function removeHintPlace() {
const hintPlace = document.querySelector('.js-hint-place');
const hintTool = document.querySelector('.js-hint-gaped');
hintPlace.remove();
// hintTool.remove();
}

function removeInputPlace() {
const savePlace = document.querySelector('.js-word-gap');
savePlace.remove();
}

//build grid
const grid = document.querySelector('#grid');
const SIZE_OF_GRID = 16;
buildGrid(SIZE_OF_GRID);

//add icons randomly
const icons = ["anchor","bomb","bolt",
"bicycle","cookie","leaf", "paper-plane",
"gem"];
let boxes = document.querySelectorAll('.side');
addIcons();

//resetButton
const resetButton = document.querySelector('#resetButton');


//Points and Guesses DOM
const pointCounter = document.querySelector('#pointCounter');
const guessCounter = document.querySelector('#guessCounter');

let points = 0;
let guesses = 0;
let choices = [];
let boxIndexes = [];
flipCard();

//GAME LOGIC

function flipCard(){
    boxes.forEach(function(box){
        box.addEventListener('click', function(){
          checkNotFlipped(box);
        })
    })
}

function checkNotFlipped(box){
  if(box.classList.contains('hidden') && !box.classList.contains('correct')){
    box.classList.toggle('hidden');
    choices.push(box.classList[2]);
    boxIndexes.push(box.classList[0]);
    checkMatch();
  }
}

function checkMatch(){
  if(choices.length === 2){
    if(choices[0] == choices[1]){
      console.log('MATCH')
      points ++;
      guesses ++;
      pointCounter.textContent = points;
      guessCounter.textContent = guesses;
      console.log('points= '+ points);
      console.log('guesses= '+ guesses);
      choices = [];
      setCorrectBox();
      checkIfWin();
      boxIndexes = [];
    }else{
      console.log('NOMATCH')
      guesses ++;
      guessCounter.textContent = guesses;
      choices = [];
      resetBoxes();
      boxIndexes = [];
    }
  }
}

function setCorrectBox(){
    boxes.forEach(function(box){
      if(box.classList.contains(boxIndexes[0]) || box.classList.contains(boxIndexes[1])){
        box.classList.add('correct');
      }
    })
}

function resetBoxes(){
    boxes.forEach(function(box){
      if(box.classList.contains(boxIndexes[0]) || box.classList.contains(boxIndexes[1])){
        window.setTimeout(function(){
          box.classList.toggle('hidden')
        }, 1000);  //hideafter a second
      }
    })

}

function checkIfWin(){
  if(points === SIZE_OF_GRID/2){
    console.log('WINNER!')
  }
}

//DOM CHANGING

function setPointsAndGuesses(){

}

//BUILD GRID
function buildGrid(size){
  grid.innerHTML = '';
  for(let i = 0; i< size; i++){
    console.log('working')
    grid.innerHTML += '<div class="box-container"><div class="box"><div class="index'+ i +' side hidden" style = "line-height: 100px;"></div><div class="back"></div></div></div>';
  }
}

function createArray(num){
  let array = [];
  for(let i = 1; i <= num; i++){
    array += i;
    array += i;
  }
  console.log(array);
  return array;
}

function randomizeArray(arr){
  let newArr= [];
  for(let i = 0; i < arr.length; i++){
    let random = Math.floor(Math.random()*newArr.length);
    newArr.splice(random, 0, arr[i]);
  }
  return newArr;
}

function addIcons(){
  let randomArray = randomizeArray(createArray(8));
  boxes = document.querySelectorAll('.side');
  for(let i = 0; i < randomArray.length; i++){
    boxes[i].classList.add(randomArray[i]);
    boxes[i].classList.add('fas');
    boxes[i].classList.add('fa-'+ icons[randomArray[i]-1]);
  }
}

//RESET BUTTON
resetButton.addEventListener('click', resetGame);

function resetGame(){
  buildGrid(SIZE_OF_GRID);
  addIcons();
  flipCard();

  points = 0;
  guesses = 0;
  choices = [];
  boxIndexes = [];
  pointCounter.textContent = points;
  guessCounter.textContent = guesses;
}

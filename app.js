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

//Reset Button
const resetButton = document.querySelector('#resetButton');
//Guesses DOM
const guessCounter = document.querySelector('#guessCounter');
//Win Screen
const winScreen = document.querySelector('#winScreen');


//timer
let seconds = 0;
let minutes = 0;

//Game variables
let points = 0;
let guesses = 0;
let choices = [];
let boxIndexes = [];

//initialize game logic
flipCard();
timer();
setStars();


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
      correctGuess();
    }else{
      incorrectGuess();
    }
  }
}

function correctGuess(){
  points ++;
  guesses ++;
  guessCounter.textContent = guesses;
  choices = [];
  setCorrectBox();
  checkIfWin();
  boxIndexes = [];
  setStars();
}

function incorrectGuess(){
  guesses ++;
  guessCounter.textContent = guesses;
  choices = [];
  resetBoxes();
  boxIndexes = [];
  setStars();
}

function setCorrectBox(){
    boxes.forEach(function(box){
      if(box.classList.contains(boxIndexes[0]) || box.classList.contains(boxIndexes[1])){
        box.nextSibling.classList.toggle('hidden');
        window.setTimeout(function(){
          box.classList.add('correct');
        }, 400)
        box.style.background = '#77fd77';
      }
    })
}

function resetBoxes(){
    boxes.forEach(function(box){
      if(box.classList.contains(boxIndexes[0]) || box.classList.contains(boxIndexes[1])){
        window.setTimeout(function(){
          box.nextSibling.classList.toggle('hidden');
          box.classList.toggle('shake');
        }, 500);  //hideafter a second
        window.setTimeout(function(){
          box.nextSibling.classList.toggle('hidden');
          box.classList.toggle('hidden');
          box.classList.toggle('shake');
        }, 1000);  //hideafter a second
      }

    })

}

function checkIfWin(){
  if(points === SIZE_OF_GRID/2){
    addWinScreen();
  }
}

//STARS



//BUILD GRID
function buildGrid(size){
  grid.innerHTML = '';
  for(let i = 0; i< size; i++){
    console.log('working')
    grid.innerHTML += '<div class="box-container"><div class="box"><div class="index'+ i +' side hidden" style = "line-height: 100px;"></div><div class="back"></div></div></div>';
  }
}

//Creates an array with 1122334455667788
function createArray(num){
  let array = [];
  for(let i = 1; i <= num; i++){
    array += i;
    array += i;
  }
  console.log(array);
  return array;
}

//Jumbles the array
function randomizeArray(arr){
  let newArr= [];
  for(let i = 0; i < arr.length; i++){
    let random = Math.floor(Math.random()*newArr.length);
    newArr.splice(random, 0, arr[i]);
  }
  return newArr;
}

//Places icons based on jumbled array
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

  seconds = 0;
  minutes = 0;
  points = 0;
  guesses = 0;
  choices = [];
  boxIndexes = [];
  guessCounter.textContent = guesses;

  if(!winScreen.classList.contains('hidden')){
    winScreen.classList.add('hidden')
  }
}

//TIMER
function timer(){
  let Seconds = document.querySelector('#seconds');
  let Minutes = document.querySelector('#minutes');
  let winScreen = document.querySelector('#winScreen');
  let clock = setInterval(function(){
    seconds ++
    if(seconds == 60){
      seconds = 0;
      minutes += 1;
    }
    if(seconds < 10){
      Seconds.textContent= '0'+seconds;
    }else{
      Seconds.textContent = seconds;
      Minutes.textContent = minutes;
    }
    },1000)
}

//Win page
function addWinScreen(){
  winScreenAppear();
  setWinTime();
  playAgain();
  setStars();
}

function winScreenAppear(){
  winScreen.classList.toggle('hidden');
}

function setWinTime(){
  let Seconds = document.querySelector('#seconds');
  let Minutes = document.querySelector('#minutes');
  let winSeconds = document.querySelector('.winSeconds');
  let winMinutes = document.querySelector('.winMinutes');
  winSeconds.textContent = seconds;
  winMinutes.textContent = minutes;
}

function playAgain(){
   let playAgainBtn = document.querySelector('.playAgainBtn');
   playAgainBtn.addEventListener('click', function(){
   resetGame();
  })
}

function setStars(){
  let stars = document.querySelectorAll('.stars');
  stars.forEach(function(star){
    star.innerHTML='';
    let amount = 3;
    if(guesses < 12){
      let amount = 3;
    }else if (guesses >=12 && guesses < 20) {
      amount = 2;
    }else{
      amount = 1;
    }
    for(i= 0; i < amount; i++){
      star.innerHTML+='<i class="fas fa-star"></i>';
    }
  })
}

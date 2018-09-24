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

//timer
let seconds = 0;
let minutes = 0;

let points = 0;
let guesses = 0;
let choices = [];
let boxIndexes = [];
flipCard();

timer();


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
    winScreen();
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
  timer();

  seconds = 0;
  minutes = 0;
  points = 0;
  guesses = 0;
  choices = [];
  boxIndexes = [];
  pointCounter.textContent = points;
  guessCounter.textContent = guesses;
}

//TIMER
function timer(){
  let Seconds = document.querySelector('#seconds');
  let Minutes = document.querySelector('#minutes');
  let winScreen = document.querySelector('#winScreen');
  let timer = setInterval(function(){
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
    if(!winScreen.classList.contains('hidden')){
      clearInterval(timer);
    }
  },1000)

}

//Win page
function winScreen(){
  winScreenAppear();
  setWinTime();
  playAgain();
  setStars();
}

function winScreenAppear(){
  let winScreen = document.querySelector('#winScreen');
  winScreen.classList.toggle('hidden');
}

function setWinTime(){
  let Seconds = document.querySelector('#seconds');
  let Minutes = document.querySelector('#minutes');
  let winSeconds = document.querySelector('.winSeconds');
  let winMinutes = document.querySelector('.winMinutes');
  winSeconds.textContent = Seconds.textContent;
  winMinutes.textContent = Minutes.textContent;
}

function playAgain(){
  let playAgainBtn = document.querySelector('.playAgainBtn');
  playAgainBtn.addEventListener('click', function(){
    resetGame();
    winScreenAppear();
  })
}

function setStars(){
  let stars = document.querySelector('.stars');
  stars.innerHTML+='';
  let amount = 3;
  if(guesses < 12){
    let amount = 3;
  }else if (guesses >=12 && guesses < 20) {
    amount = 2;
  }else{
    amount = 1;
  }
  for(i= 0; i < amount; i++){
    stars.innerHTML+='<i class="fas fa-star"></i>';
  }
}

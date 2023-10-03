const startBtn = document.querySelector('.start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
let time = 0
const timeElem = document.querySelector('#time')
const board = document.querySelector('#board');
const circle = document.querySelector('#circle');
const { clientHeight, clientWidth } = board
const boardStyles = getComputedStyle(board)
const maxBoardTop = boardStyles 
let interval = null;
let coin = 0;

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

circle.addEventListener('click', (event) => {
    const height = (clientHeight / 2) - 20;
    const width = (clientWidth / 2) - 20;

    const randY = getRandom(-height, height);
    const randX = getRandom(-width, width);
    const size = getRandom(3, 40);

    circle.setAttribute(
        'style', 
        `transform: translate(${randX}px, ${randY}px);
        width: ${size}px; 
        height: ${size}px;
        background: ${getRandomColor()}`
    );
    
    coin++;
})

timeList.addEventListener('click', (event) => {
    if(event.target.classList.contains('time-btn')){
        time = parseInt(event.target.getAttribute('data-time'))
        startGame()
    }
})

function startGame(){
    screens[1].classList.add('up')
    timeElem.innerHTML = `00:${time}`
    
    interval = setInterval(timeDown, 1000)
}

function timeDown(){
    if(time == 0 && interval){
        return finishGame();
    } else {
        time--;

        if(time < 10){
            time = '0' + time
        }
            
        timeElem.innerHTML = `00:${time}`
    }  

}

function finishGame(){
    board.style.display = 'block'
    let scoreInfo = document.createElement('h3')
    scoreInfo.innerHTML = `Your score - ${coin}` 
    scoreInfo.style.margin = '50px'
    board.append(scoreInfo)
    const restartElem = document.createElement('button')
    restartElem.classList.add('time-btn')
    restartElem.innerHTML = 'Restart game'
    board.append(restartElem)
    restartElem.addEventListener('click', () => {
        screens[1].classList.remove('up')
    })
    clearInterval(interval);
    circle.style.display = 'none'
}

function getRandom(min, max){
    return Math.floor(Math.random() * (max - min +1)) + min;
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
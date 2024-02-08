function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

var soundIsOn = true;
var soundController = document.querySelector('#sound-controller');

soundController.addEventListener('click', function() {
  soundIsOn = !soundIsOn,
  soundIsOn ? soundController.className = '' : soundController.className = 'off'
});

var body = document.querySelector('body');

var board = document.querySelector('#board');

board.onmouseover = function() {
  console.log('board hover ON')

  cursor.classList.add('hovering-board')
}

board.onmouseout = function() {
  console.log('board hover OFF')

  cursor.classList.remove('hovering-board')
}

async function handleItem(pos) {

  // prevent double click .. fix later
  board.style.pointerEvents = 'none';

  // Create a node:
  const input = document.createElement('input');

  // Append the node:
  document.querySelector('main').appendChild(input);
  
  await sleep(1000);
  
  // cursor
  cursor.classList.add('focusing-empty-input');
  
  input.focus();
  
  input.style.top = pos.pageY;
  input.style.left = pos.pageX;

  // empty cursor handle it okay .. ?
  input.addEventListener('input', function(e) {
    if (this.value.trim().length !== 0) {
      console.log('empty input');
      cursor.classList.add('focusing-input');
    } else {
      console.log('not empty!!');
      cursor.classList.remove('focusing-input');
    }
  });
  
  // save ..
  const save = function(e) {
    const el = e.target;
    const article = document.createElement('article');
    article.innerHTML = el.value;

    article.style.top = pos.pageY;
    article.style.left = pos.pageX;

    el.replaceWith(article);
    
    board.style.pointerEvents = '';

    // fk
    cursor.classList.remove('focusing-empty-input');
    cursor.classList.remove('focusing-input');

    // handle hover .. ?
    article.onmouseover = function() {
      console.log('article hover ON')

      cursor.classList.add('hovering-article')
    }
  
    article.onmouseout = function() {
      console.log('article hover OFF')

      cursor.classList.remove('hovering-article')
    }

    // handle removal ..
    article.addEventListener('click', function () {
      this.remove();
      cursor.classList.remove('hovering-article');

      // remove audio
      let audio = new Audio('/sounds/remove.m4a');
      soundIsOn && audio.play();

      getNumberOfArticles();
    });

    // run count
    var counterVisible = false;

    function getNumberOfArticles() {
      var leftToAvoid = document.querySelector('#left-to-avoid');
      var numberOfArticles = document.querySelectorAll('article').length;

      leftToAvoid.innerHTML = 'you have ' + numberOfArticles + ' things to avoid';

      counterVisible = true;

      console.log(counterVisible);
    }

    getNumberOfArticles();
  }
  
  // blur uuu
  input.addEventListener('blur', save, {
    once: true,
  });
  
  // keydown
  input.addEventListener('keydown', function (e) {
    
    if (e.code === 'Enter') {
      this.blur();
    }
  });
}

board.addEventListener('click', handleItem, false);

// ..
function handleCursor(e) {
  mouseX = e.pageX;
  mouseY = e.pageY;
}

let cursor = document.getElementById('cursor');

let mouseX = 0;
let mouseY = 0;

let boxX = 0;
let boxY = 0;

let boxSpeed = 0.02;

function animateCursor() {
  
  let distX = mouseX - boxX;
  let distY = mouseY - boxY;
  
  boxX = boxX + (distX * boxSpeed);
  boxY = boxY + (distY * boxSpeed);
  
  cursor.style.left = boxX + 'px';
  cursor.style.top = boxY + 'px';
  
  requestAnimationFrame(animateCursor);
}

animateCursor();

document.addEventListener('mousemove', function(e) {
  handleCursor(e);
});

// TODO: move up & rename ..
var infoController = document.querySelector('#i-button');

// TODO: bump ba dam
async function bumpInterface() {
  cursor.classList.add('active');
  
  soundController.className = 'bump';
  infoController.className = 'bump';
}

var messages = [
  'Calling the Choppa',
  'Valuing enthusiasm over perfection',
  'Investigating Who Killed Captain Alex',
  'Stealing The Choppa',
  'Mining minerals in Congo',
  'Expecting the unexpectable'
];

async function pasteMessages() {
  messages = shuffle(messages);

  var introHeadline = document.createElement('h1');
  document.querySelector('body').appendChild(introHeadline);

  for(var i = 0; i < messages.length; i++)
  {
    tekst = messages[i]
    introHeadline.innerText = tekst+'... ';
    await sleep(250);
    // terminal.innerHTML += '<code>DONE</code><br>';
    // await sleep(getRandomNumberBetween(10, 200));
  }

  introHeadline.innerText = 'ulala .. ?';
  await sleep(1000);
  introHeadline.remove();

  // bump UI ..
  bumpInterface();

  // push to storage
  sessionStorage.setItem('intro', 'true');

}

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

(() => {

  if(!sessionStorage.getItem('intro')) {
    pasteMessages();
  } else {
    bumpInterface();
  }
})()

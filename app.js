function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

var body = document.querySelector('body');

var board = document.querySelector('#board');

async function handleItem(pos) {

  // prevent double click .. fix later
  board.style.pointerEvents = 'none';

  // Create a node:
  const input = document.createElement('input');

  // Append the node:
  document.querySelector('main').appendChild(input);
  
  await sleep(1000);
  
  // cursor
  cursor.classList.add('hide');
  
  input.focus();
  
  input.style.top = pos.pageY;
  input.style.left = pos.pageX;
  
  // save ..
  const save = function(e) {
    const el = e.target;
    const article = document.createElement('article');
    article.innerHTML = el.value;

    article.style.top = pos.pageY;
    article.style.left = pos.pageX;

    el.replaceWith(article);
    
    board.style.pointerEvents = '';

    cursor.classList.remove('hide');

    // handle hover .. ?
    article.onmouseover = function() {
      console.log('article hover ON')

      cursor.classList.add('hover')
    }
  
    article.onmouseout = function() {
      console.log('article hover OFF')

      cursor.classList.remove('hover')
    }

    // handle removal ..
    article.addEventListener('click', function () {
      this.remove();
    });
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
  scrollTop = void 0 !== window.pageYOffset ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop,
  cursorLeft = e.pageX + 'px',
  cursorTop = e.pageY - scrollTop + 'px',
  cursor.style.top = cursorTop,
  cursor.style.left = cursorLeft;
  //cursor.classList.add('active')
}

var scrollTop, cursorLeft, cursorTop, 
    windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
    windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0), 
    body = document.body, 
    cursor = document.getElementById('cursor');

document.addEventListener('mousemove', function(e) {
  handleCursor(e);
});

var commands = [
  'Calling the Choppa',
  'Valuing enthusiasm over perfection',
  'Cooking German food',
  'Investigating Who Killed Captain Alex',
  'Stealing The Choppa',
  'Mining minerals in Congo',
  'Expecting the unexpectable'
];

async function pasteCommands() {
  commands = shuffle(commands);

  var terminal = document.createElement('h1');
  document.querySelector('body').appendChild(terminal);

  for(var i = 0; i < commands.length; i++)
  {
    tekst = commands[i]
    terminal.innerHTML = tekst+'... ';
    await sleep(500);
    // terminal.innerHTML += '<code>DONE</code><br>';
    // await sleep(getRandomNumberBetween(10, 200));
  }

  terminal.innerHTML = 'ulala .. ?';
  await sleep(1000);
  terminal.remove();

  cursor.classList.add('active')

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
  pasteCommands();
})()

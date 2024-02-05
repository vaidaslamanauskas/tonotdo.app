document.addEventListener('DOMContentLoaded', (event) => {
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  var body = document.querySelector('body');

  var clickCanvas = document.querySelector('#clickCanvas');

  async function tellPos(pos) {

    // prevent double click .. fix later
    clickCanvas.style.pointerEvents = 'none';

    // Create a node:
    const node = document.createElement('input');

    // Append the node:
    document.querySelector('main').appendChild(node);
    
    await sleep(1000);
    
    // cursor
    cursor.className = 'hide';
    
    node.focus();
    
    node.style.top = pos.pageY;
    node.style.left = pos.pageX;
    
    /**
     We're defining the callback with `once`, because we know that
    the element will be gone just after that, and we don't want 
    any callbacks leftovers take memory. 
    Next time `p` turns into `input` this single callback 
    will be applied again.
    */
    const save = function(e) {
      const el = e.target;
      const div = document.createElement('div');
      div.innerHTML = el.value;
      el.replaceWith(div);
      
      clickCanvas.style.pointerEvents = '';

      cursor.className = '';
      
      // node.style.background = 'hotpink'
    }
    
    // blur uuu
    node.addEventListener('blur', save, {
      once: true,
    });
    
    // keydown
    node.addEventListener('keydown', function (e) {
      
      if (e.code === 'Enter') {
          //const el = e.target;
          this.blur();
        
          // const div = document.createElement('div');
          // div.innerHTML = el.value;
          // el.replaceWith(div);
      }
    });
  }

  clickCanvas.addEventListener('click', tellPos, false);

  // ..
  function handleCursor(e) {
    scrollTop = void 0 !== window.pageYOffset ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop,
    cursorLeft = e.pageX + 'px',
    cursorTop = e.pageY - scrollTop + 'px',
    cursor.style.top = cursorTop,
    cursor.style.left = cursorLeft;
    //cursor.className = "active"
  }
  
  var scrollTop, cursorLeft, cursorTop, 
      windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
      windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0), 
      body = document.body, 
      cursor = document.getElementById('cursor');
  
  document.addEventListener('mousemove', function(e) {
    handleCursor(e);
  });
});
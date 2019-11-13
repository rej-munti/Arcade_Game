// Enemies our player must avoid
let EndGame = document.getElementById('End');
let End_Statement = document.createElement('h1');
End_Statement.textContent = "CONGRAtULATIONS You are WIN !!!";

class Enemy {
 constructor () {
      // Variables applied to each of our instances go here,
      // we've provided one for you to get started

      // The image/sprite for our enemies, this uses
      // a helper we've provided to easily load images
      this.sprite = 'images/enemy-bug.png';
      this.x = -3;
      this.y = Math.floor((Math.random() * 300) + 30);
      this.width = 80;
      this.hight = 50;
      this.speed =  Math.floor((Math.random() * 6) + 3);
      this.angle = 0;
  }
  // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks
 update(dt){
      // You should multiply any movement by the dt parameter
      // which will ensure the game runs at the same speed for
      // all computers.
      this.x += this.speed * Math.cos(this.angle);
      this.y -= this.speed * Math.sin(this.angle);

          if (this.x > 500) {
             this.x -= 500;
             this.y = Math.floor((Math.random() * 300) + 30);
             this.speed = Math.floor((Math.random() * 6) + 3);

      }

  }
  // Draw the enemy on the screen, required method for game
  render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

  }
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
  constructor (x,y) {
   this.sprite = 'images/char-boy.png';
   this.x = x;
   this.y = y;
   this.width = 50;
   this.hight = 80;
   this.z = false;
        }

  update() {
      // You should multiply any movement by the dt parameter
      // which will ensure the game runs at the same speed for
      // all computers.

      collisionDetection();
      if (this.y == -30)
  {
       setTimeout(function(){EndGame.appendChild(End_Statement);}, 3);
       setTimeout(function(){document.location.reload();}, 3000);
       this.z = true;
  }
}
  render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  handleInput(direction) {
    if (this.z == true)
    {
      if((direction == 'up') || (direction == 'down') || (direction == 'right') || (direction == 'left'))
          {this.y = -30;}
    }
      else
          {if((direction == 'up') && (this.y > 0))
              {this.y -= 50;}
          if((direction == 'down') && (this.y < 420))
              {this.y += 50;}
          if((direction == 'right') && (this.x < 420))
              {this.x += 50;}
          if((direction == 'left') && (this.x > 0))
              {this.x -= 50;}}
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const player = new Player(200,420);
const enemy1 = new Enemy();
const enemy2 = new Enemy();
const enemy3 = new Enemy();
const allEnemies =[enemy1, enemy2, enemy3];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

function collisionDetection() {
    for(let i = 0; i < allEnemies.length; i++) {
      if (player.z == true)
           {player.y = -30;}
           else
            {  if(!(((player.y + player.hight)<= (allEnemies[i].y)) || (player.y >= (allEnemies[i].y + allEnemies[i].hight)) ||
              ((player.x + player.width) <= allEnemies[i].x) || (player.x >= (allEnemies[i].x + allEnemies[i].width))))
              {
                    player.x = 200;
                    player.y = 420;
              console.log('they in');
            }}
        }
    }

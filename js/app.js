// Enemies our player must avoid
const Enemy = function (x, y) {
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 50;
    //returns a number between 50 and 250
    this.speed = Math.floor(Math.random() * 250) + 50;

    /* The image/sprite for our enemies, this uses
    a helper to load images */
    this.sprite = 'images/enemy-bug.png';
};

/* Update the enemy's position, required method for game
 Parameter: dt, a time delta between ticks */
Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;
    this.x >= 600 ? this.x = -150 : null;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


const Player = function () {
    this.sprite = 'images/char-cat-girl.png';
    this.x = 200;
    this.y = 400;
    this.width = 50;
    this.height = 50;
};

Player.prototype.update = function (dt) {
    //Keeps player on screen
    this.y === -25 || this.y > 400 ? this.reset('y') : null;
    this.x >= 400 ? this.reset('x') : null;
    this.x < 0 ? this.x = 0 : null;

    this.collision();

};

//Resets player position to starting point
Player.prototype.reset = function (position) {
    if (this.y === -25) {
        var element = document.createElement('div');
        element.innerHTML = "You won!"
        document.body.appendChild(element)
    }

    position === 'y' ? this.y = 400 : this.x = 400;
}

/*
2D Collision detection is modified from
https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
*/
Player.prototype.collision = function () {
    allEnemies.forEach(enemy => {
        if (this.x < enemy.x + enemy.width &&
            this.x + this.width > enemy.x &&
            this.y < enemy.y + enemy.height &&
            this.height + this.y > enemy.y) {
            this.y = 400;
            this.x = 200;
        }
    });
}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// moves player according to input by number of pixels
Player.prototype.handleInput = function (key) {
    key === "up" ? this.y -= 85 : null;
    key === "down" ? this.y += 85 : null;
    key === "right" ? this.x += 100 : null;
    key === "left" ? this.x -= 100 : null;
}



const player = new Player();
const allEnemies = [new Enemy(-150, 225), new Enemy(-150, 140), new Enemy(-150, 60)];


/*
Listens for key presses and sends the keys to
Player.handleInput() method.
*/
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

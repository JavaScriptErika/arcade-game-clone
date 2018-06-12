// Enemies our player must avoid
const Enemy = function (x, y) {
    this.x = x;
    this.y = y;
    //returns a number between 50 and 250
    this.speed = Math.floor(Math.random() * 250) + 50;

    // The image/sprite for our enemies, this uses
    // a helper to load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
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
};

Player.prototype.update = function (dt) {
    //Keeps player on screen
    this.y < -30 || this.y > 400 ? this.y = 400 : null;
    this.x >= 400 ? this.x = 400 : null;
    this.x < 0 ? this.x = 0 : null;
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function (key) {
    key === "up" ? this.y -= 85 : null;
    key === "down" ? this.y += 85 : null;
    key === "right" ? this.x += 100 : null;
    key === "left" ? this.x -= 100 : null;
}


const player = new Player();
const allEnemies = [new Enemy(-150, 225), new Enemy(-150, 140), new Enemy(-150, 60)]


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

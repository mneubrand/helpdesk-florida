var game = new Phaser.Game(64, 64, Phaser.CANVAS, 'phaser', {preload: preload, create: create, update: update, render: render});
var pixelcontext = null;
var pixelwidth = 0;
var pixelheight = 0;
var scale;

var bgColors = [ 0x6347AB, 0xC6B4B8, 0x2A6C5E, 0x660852, 0xB3D3E9 ];
var bgIndex = 0;

var moveSpeed = 20;
var walkAnimationSpeed = 400;

function preload() {
    game.load.spritesheet('player', 'assets/sprites/player.png', 4, 4);
    game.load.image('cursor', 'assets/sprites/cursor.png');
}

var player, cursor;
var mouseX, mouseY, rotation = 0;
var cursors;

function create() {
    var pixelCanvas = document.getElementById('pixel');
    pixelcontext = pixelCanvas.getContext('2d');
    pixelwidth = pixelCanvas.width;
    pixelheight = pixelCanvas.height;
    scale = pixelwidth / 64;
    Phaser.Canvas.setSmoothingEnabled(pixelcontext, false);

    // Background color
    game.stage.backgroundColor = bgColors[bgIndex];
    tweenBg();

    // Player + cursor
    player = game.add.sprite(25, 25, 'player');
    player.lastFrameUpdate = 0;
    cursor = game.add.sprite(0, 0, 'cursor');
    cursor.visible = false;
    game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN_TIGHT);

    // Physics
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.enable(player);
    player.body.setRectangle(4, 2);
    player.body.fixedRotation = true;
    player.body.collideWorldBounds = true;
    //player.body.debug = true;

    // Input
    pixelCanvas.addEventListener('mousedown', requestLock);
    document.addEventListener('mousemove', move, false);
    cursors = game.input.keyboard.createCursorKeys();
}

function requestLock() {
    game.input.mouse.requestPointerLock();
}

function move(e) {
    if (game.input.mouse.locked) {
        // Limit cursor to just slightly outside playing field
        if(e.x + e.movementX + mouseX >= -20 && e.x + e.movementX + mouseX <= (64 - cursor.width)*scale + 20) {
            mouseX += e.movementX;
        }
        if(e.y + e.movementY + mouseY >= -20 && e.y + e.movementY + mouseY <= (64 - cursor.width)*scale + 20) {
            mouseY += e.movementY;
        }

        var x = (e.x + mouseX) / scale;
        var y = (e.y + mouseY) / scale;

        cursor.visible = true;
        cursor.x = x;
        cursor.y = y;

        rotation = ((Math.atan2(y - player.y, x - player.x) * 180 / Math.PI) + 450) % 360;
    } else {
        cursor.visible = false;
        mouseX = 0;
        mouseY = 0;
    }
}


function update() {
    updatePlayerPhysics();

    player.frame = Math.round((rotation / 45)) % 8;
    if(player.body.velocity.x !== 0 || player.body.velocity.y !== 0) {
        var diff = game.time.now - player.lastFrameUpdate;
        if(diff > walkAnimationSpeed) {
            player.lastFrameUpdate = game.time.now;
        } else if(diff > walkAnimationSpeed / 2) {
            player.frame += 16;
        } else {
            player.frame += 8;
        }
    }


    // render game canvas to big canvas
    pixelcontext.drawImage(game.canvas, 0, 0, 64, 64, 0, 0, pixelwidth, pixelheight);
}

function render() {

}

function updatePlayerPhysics() {
    player.body.angle = rotation;
    player.body.setZeroVelocity();

    var velocityX = 0;
    var velocityY = 0;
    var rad = Phaser.Math.degToRad(rotation) + Math.PI / 2;

    velocityX += moveSpeed * Math.cos(rad) * ((cursors.up.isDown ? -1 : 0) + (cursors.down.isDown ? 1 : 0));
    velocityY += moveSpeed * Math.sin(rad) * ((cursors.up.isDown ? -1 : 0) + (cursors.down.isDown ? 1 : 0));

    velocityX += moveSpeed * Math.cos(rad - Math.PI / 2) * ((cursors.left.isDown ? -1 : 0) + (cursors.right.isDown ? 1 : 0));
    velocityY += moveSpeed * Math.sin(rad - Math.PI / 2) * ((cursors.left.isDown ? -1 : 0) + (cursors.right.isDown ? 1 : 0));

    if (cursors.up.isDown) {
        player.body.moveForward(moveSpeed);

    } else if (cursors.up.isDown) {
        player.body.moveBackward(moveSpeed);
    }

    player.body.velocity.x = velocityX;
    player.body.velocity.y = velocityY;

}

function tweenBg() {
    var steps = 500;
    var colorBlend = {step: 0};
    var colorTween = game.add.tween(colorBlend).to({step: steps}, 4000);
    colorTween.onUpdateCallback(function() {
        var color = Phaser.Color.interpolateColor(bgColors[bgIndex % bgColors.length], bgColors[(bgIndex+1) % bgColors.length], steps, Math.round(colorBlend.step), 1);
        game.stage.backgroundColor = color & 0xffffff;
    });

    colorTween.onComplete.add(function() {
        bgIndex++;
        tweenBg();
    });

    colorTween.start();
}
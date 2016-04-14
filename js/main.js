// Constants
var PHYSICS_DEBUG = false;
var BOUNDS_INSET = 15;
var MOVE_SPEED = 30;
var WALK_ANIMATION_SPEED = 600;
var DOOR_WIDTH = 8;

// Globals
var game = new Phaser.Game(64, 64, Phaser.CANVAS, 'phaser', {
    preload: preload,
    create: create,
    update: update,
    render: render
});
var pixelcontext = null;
var pixelwidth = 0;
var pixelheight = 0;
var scale;

var bgColors = [0x6347AB, 0xC6B4B8, 0x2A6C5E, 0x660852, 0xB3D3E9];
var bgIndex = 0;

var staticCollisionGroup, dynamicCollisionGroup, bulletCollisionGroup;

function preload() {
    game.load.spritesheet('player', 'assets/sprites/player.png', 4, 4);
    game.load.image('cursor', 'assets/sprites/cursor.png');

    game.load.image('door', 'assets/sprites/door.png');
    game.load.image('wall_h', 'assets/sprites/wall_h.png');
    game.load.image('wall_v', 'assets/sprites/wall_v.png');
    game.load.image('floor_a', 'assets/sprites/floor_a.png');
    game.load.image('floor_b', 'assets/sprites/floor_b.png');
    game.load.image('floor_c', 'assets/sprites/floor_c.png');
    game.load.image('floor_d', 'assets/sprites/floor_d.png');
    game.load.image('floor_e', 'assets/sprites/floor_e.png');

    game.load.image('bullet', 'assets/sprites/bullet.png');
    game.load.image('debris', 'assets/sprites/debris.png');
    game.load.spritesheet('shotgun', 'assets/sprites/shotgun.png', 8, 8);
}

function create() {
    var pixelCanvas = document.getElementById('pixel');
    pixelcontext = pixelCanvas.getContext('2d');
    pixelwidth = pixelCanvas.width;
    pixelheight = pixelCanvas.height;
    scale = pixelwidth / 64;

    Phaser.Canvas.setSmoothingEnabled(pixelcontext, false);
    Phaser.Canvas.setSmoothingEnabled(game.context, false);
    game.renderer.renderSession.roundPixels = true;

    // Background color
    game.stage.backgroundColor = bgColors[bgIndex];
    tweenBg();

    // Physics
    game.physics.startSystem(Phaser.Physics.P2JS);
    staticCollisionGroup = game.physics.p2.createCollisionGroup();
    bulletCollisionGroup = game.physics.p2.createCollisionGroup();
    dynamicCollisionGroup = game.physics.p2.createCollisionGroup();
    game.physics.p2.updateBoundsCollisionGroup();

    loadLevel(currentLevel);
    changeWeapon('shotgun', 100);

    // Input
    pixelCanvas.addEventListener('mousedown', requestLock);
    document.addEventListener('mousemove', move, false);

    cursors = game.input.keyboard.createCursorKeys();
    game.input.mouse.capture = true;
}

function update() {
    // Player
    updateInput();
    updateCharacterFrame(player, rotation);

    // render game canvas to big canvas
    pixelcontext.drawImage(game.canvas, 0, 0, 64, 64, 0, 0, pixelwidth, pixelheight);
}

function render() {

}

function setWorldBounds(w, h) {
    game.world.setBounds(0, 0, 200, 200);
    var sim = game.physics.p2;

    var left = new p2.Body({
        mass: 0,
        position: [sim.pxmi(BOUNDS_INSET), sim.pxmi(BOUNDS_INSET)],
        angle: Math.PI / 2
    });
    left.addShape(new p2.Plane());

    var right = new p2.Body({
        mass: 0,
        position: [sim.pxmi(w - BOUNDS_INSET), sim.pxmi(BOUNDS_INSET)],
        angle: -Math.PI / 2
    });
    right.addShape(new p2.Plane());

    var top = new p2.Body({
        mass: 0,
        position: [sim.pxmi(BOUNDS_INSET), sim.pxmi(BOUNDS_INSET)],
        angle: -Math.PI
    });
    top.addShape(new p2.Plane());

    var bottom = new p2.Body({mass: 0, position: [sim.pxmi(BOUNDS_INSET), sim.pxmi(h - BOUNDS_INSET)]});
    bottom.addShape(new p2.Plane());

    sim.world.addBody(left);
    sim.world.addBody(right);
    sim.world.addBody(top);
    sim.world.addBody(bottom);
}

function tweenBg() {
    var steps = 500;
    var colorBlend = {step: 0};
    var colorTween = game.add.tween(colorBlend).to({step: steps}, 4000);
    colorTween.onUpdateCallback(function () {
        var color = Phaser.Color.interpolateColor(bgColors[bgIndex % bgColors.length], bgColors[(bgIndex + 1) % bgColors.length], steps, Math.round(colorBlend.step), 1);
        game.stage.backgroundColor = color & 0xffffff;
    });

    colorTween.onComplete.add(function () {
        bgIndex++;
        tweenBg();
    });

    colorTween.start();
}


function updateCharacterFrame(sprite, rotation) {
    sprite.frame = Math.round((rotation / 45)) % 8;

    if (sprite.body.velocity.x !== 0 || sprite.body.velocity.y !== 0) {
        var diff = game.time.now - sprite.lastFrameUpdate;
        if (diff > WALK_ANIMATION_SPEED) {
            sprite.lastFrameUpdate = game.time.now;
        } else if (diff > WALK_ANIMATION_SPEED / 2) {
            sprite.frame += 16;
        } else {
            sprite.frame += 8;
        }
    }

    if(sprite.weaponSprite) {
        sprite.weaponSprite.frame = sprite.frame % 8;
    }
}

function changeWeapon(name, ammo) {
    console.log('changing weapon to ' + name);
    player.weapon = WEAPONS[name];
    player.ammo = ammo;
    if(player.weaponSprite) {
        player.weaponSprite.destroy();
        delete player.weaponSprite;
    }

    player.weaponSprite = game.make.sprite(-4, -4, 'shotgun');
    player.addChild(player.weaponSprite);
}
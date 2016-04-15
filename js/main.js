// Constants
var PHYSICS_DEBUG = false;
var SIGHT_DEBUG = false;

var BOUNDS_INSET = 14;
var MOVE_SPEED = 20;
var WALK_ANIMATION_SPEED = 800;
var DOOR_WIDTH = 8;
var STRIPE_SPEED = 50;

var ENEMY_REACTION = 330;
var ENEMY_MOVE_SPEED = 15;
var ENEMY_SIGHT_ANGLE = 70;

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

var sounds = {};

function preload() {
    game.load.spritesheet('player', 'assets/sprites/player.png', 4, 4);
    game.load.spritesheet('enemy', 'assets/sprites/enemy.png', 4, 4);
    game.load.spritesheet('player_dead', 'assets/sprites/player_dead.png', 6, 6);
    game.load.spritesheet('enemy_dead', 'assets/sprites/enemy_dead.png', 6, 6);
    game.load.image('cursor', 'assets/sprites/cursor.png');

    game.load.image('spacer', 'assets/sprites/spacer.png');
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
    game.load.image('blood', 'assets/sprites/blood.png');
    game.load.spritesheet('shotgun', 'assets/sprites/shotgun.png', 8, 8);
    game.load.spritesheet('assault_rifle', 'assets/sprites/assault_rifle.png', 8, 8);

    game.load.spritesheet('numbers', 'assets/sprites/numbers.png', 3, 7);
    game.load.image('text_dead', 'assets/sprites/text_dead.png');
    game.load.image('text_clear', 'assets/sprites/text_clear.png');
    game.load.image('text_over', 'assets/sprites/text_over.png');
    game.load.image('stripes', 'assets/sprites/stripes.png');

    game.load.audio('bg-loop', 'assets/sounds/bg-loop.wav');
    game.load.audio('shotgun', 'assets/sounds/shotgun.wav');
    game.load.audio('hit_wall', 'assets/sounds/hit_wall.wav');
    game.load.audio('gun_click', 'assets/sounds/gun_click.wav');
    game.load.audio('splat', 'assets/sounds/splat.wav');
    game.load.audio('assault_rifle', 'assets/sounds/assault_rifle.wav');
}

function create() {
    var loop = loadSound('bg-loop');
    loop.loop = true;
    loop.play();

    loadSound('shotgun');
    loadSound('hit_wall').volume = 0.5;
    loadSound('gun_click').volume = 0.8;
    loadSound('splat');
    loadSound('assault_rifle');

    game.sound.mute = true;

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

    loadLevel(currentLevel);

    // Input
    pixelCanvas.addEventListener('mousedown', requestLock);
    document.addEventListener('mousemove', move, false);

    cursors = game.input.keyboard.createCursorKeys();
    game.input.mouse.capture = true;
}

function update() {
    // render game canvas to big canvas
    pixelcontext.drawImage(game.canvas, 0, 0, 64, 64, 0, 0, pixelwidth, pixelheight);

    var diff = game.time.now - stripes.lastFrameUpdate;
    if (diff > STRIPE_SPEED) {
        stripes.cameraOffset.y = stripes.cameraOffset.y == 1 ? 0 : 1;
        stripes.lastFrameUpdate = game.time.now;
        stripes.alpha = 0.05 + Math.random() * 0.05;
    }

    updateInput();

    if (waitingForSpace) {
        return;
    }

    // update spritesheet index based on rotation
    updateCharacterFrame(player, rotation);

    for (var i = 0; i < enemies.length; i++) {
        var enemy = enemies[i];
        enemy.body.setZeroVelocity();
        updateCharacterFrame(enemy, (enemy.body.angle + 360) % 360);

        // check line of sight
        var sightAngle = (game.math.radToDeg(Math.atan2(player.y - enemy.y, player.x - enemy.x) + game.math.degToRad(90)) + 360) % 360;
        var angleDiff = Math.abs(sightAngle - ((enemy.body.angle + 360) % 360));

        if (!getWallIntersection(enemy, player) && angleDiff < ENEMY_SIGHT_ANGLE) {
            if (SIGHT_DEBUG) {
                game.debug.geom(new Phaser.Line(player.x, player.y, enemy.x, enemy.y), 'rgba(255,0,0,1)');
            }

            if (enemy.firstSeen < 0) {
                enemy.firstSeen = game.time.now;
            } else if (enemy.firstSeen > 0 && game.time.now - enemy.firstSeen > ENEMY_REACTION) {
                enemy.body.angle = sightAngle;
                enemy.weapon.fire(enemy, player.x, player.y);
            }
        } else {
            enemy.firstSeen = -1;

            if (enemy.data.waypoints) {
                var current = enemy.data.waypoints[enemy.currentWaypoint];
                if (game.math.distance(current[0], current[1], enemy.x, enemy.y) < 1) {
                    enemy.currentWaypoint = (enemy.currentWaypoint + 1) % enemy.data.waypoints.length;
                    current = enemy.data.waypoints[enemy.currentWaypoint];
                }

                var angle = Math.atan2(current[1] - enemy.y, current[0] - enemy.x);
                enemy.body.rotation = angle + game.math.degToRad(90);
                enemy.body.velocity.x = Math.cos(angle) * ENEMY_MOVE_SPEED;
                enemy.body.velocity.y = Math.sin(angle) * ENEMY_MOVE_SPEED;
            }
        }
    }

    // update ammo count
    var ammo0 = Math.floor(player.ammo / 10);
    var ammo1 = player.ammo % 10;
    ammo[0].frame = ammo0;
    ammo[1].frame = ammo1;

    ammo[0].visible = false;
    ammo[1].visible = false;

    // check win and lose condition
    if (player.dead) {
        var text = game.add.sprite(0, 0, 'text_dead');
        text.fixedToCamera = true;
        waitForSpace();
    } else if (enemies.length == 0) {
        if (currentLevel == LEVELS.length - 1) {
            var text = game.add.sprite(0, 0, 'text_over');
            text.fixedToCamera = true;
            waitForSpace();
        } else {
            var text = game.add.sprite(0, 0, 'text_clear');
            text.fixedToCamera = true;
            currentLevel++;
            waitForSpace();
        }
    }

    stripes.bringToTop();
    cursor.bringToTop();
}

function render() {
}

function getWallIntersection(a, b) {
    var dx = Math.abs(a.x - b.x);
    var dy = Math.abs(a.y - b.y);

    for (var i = 0; i < (dx > dy ? dx : dy); i++) {
        var offsetX = dx > dy ? i : dx / dy * i;
        var offsetY = dx > dy ? dy / dx * i : i;

        var x = a.x + (a.x > b.x ? -offsetX : offsetX);
        var y = a.y + (a.y > b.y ? -offsetY : offsetY);

        var ret = game.physics.p2.hitTest(new Phaser.Point(x, y), sightBlockingBodies);

        if (SIGHT_DEBUG) {
            game.debug.geom(new Phaser.Rectangle(x, y, 1, 1), 'rgba(255,255,0,1)');
        }

        if (ret.length > 0) {
            return true;
        }
    }

    return false;
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
    sprite.bringToTop();
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

    if (sprite.weaponSprite) {
        sprite.weaponSprite.frame = sprite.frame % 8;
    }
}

function loadSound(key) {
    sounds[key] = game.add.audio(key);
    sounds[key].allowMultiple = true;
    return sounds[key];
}
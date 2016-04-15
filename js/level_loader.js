var player, cursor;
var enemies;
var layers;
var stripes;
var currentLevel = 0;

var ammo;
var pickup;

var staticCollisionGroup, dynamicCollisionGroup, bulletCollisionGroup;
var sightBlockingBodies;
var pickups;

function loadLevel(index) {
    if (game.physics.p2) {
        game.physics.p2.clear()
    }
    game.world.removeAll(true);

    var level = LEVELS[index];

    // Physics
    game.physics.startSystem(Phaser.Physics.P2JS);
    staticCollisionGroup = game.physics.p2.createCollisionGroup();
    bulletCollisionGroup = game.physics.p2.createCollisionGroup();
    dynamicCollisionGroup = game.physics.p2.createCollisionGroup();

    // Stripes
    stripes = game.add.tileSprite(0, 0, 64, 64, 'stripes');
    stripes.lastFrameUpdate = 0;
    stripes.fixedToCamera = true;

    // Bounds
    setWorldBounds(level.w, level.h);
    layers = [];
    for (var i = 0; i < 3; i++) {
        layers.push(game.add.group());
    }

    // Rooms
    sightBlockingBodies = [];
    for (var i = 0; i < level.rooms.length; i++) {
        createRoom(level.rooms[i]);
    }

    // Player + cursor
    player = game.add.sprite(level.playerX, level.playerY, 'player');
    player.lastFrameUpdate = 0;
    game.camera.follow(player, Phaser.Camera.FOLLOW_TOPDOWN);

    cursor = game.add.sprite(0, 0, 'cursor');
    cursor.visible = false;
    cursor.fixedToCamera = true;

    // Physics
    game.physics.p2.enable(player);
    player.body.fixedRotation = true;
    player.body.collideWorldBounds = true;
    setDynamicCollisionGroup(player.body);
    player.body.debug = PHYSICS_DEBUG;

    player.body.onBeginContact.add(function (body, bodyB, shapeA, shapeB, equation) {
        if (!body) {
            return;
        }

        if (body._collisionGroup == 'dynamic') {
            var hit = body.sprite;
            if (hit.key === 'enemy') {
                window.setTimeout(function () {
                    if(hit.exists) {
                        var angle = Math.atan2(player.y - hit.y, player.x - hit.x);
                        hit.body.rotation = angle + game.math.degToRad(90);
                    }
                }, ENEMY_REACTION);
            }
        }
    }, this);

    changeWeapon(player, 'fist');

    enemies = [];
    for (var i = 0; i < level.enemies.length; i++) {
        var enemyData = level.enemies[i];
        var enemy = game.add.sprite(enemyData.x, enemyData.y, 'enemy');
        enemy.currentWaypoint = 0;
        enemy.data = enemyData;
        enemy.lastFrameUpdate = 0;

        game.physics.p2.enable(enemy);
        enemy.body.fixedRotation = true;
        enemy.body.collideWorldBounds = true;
        setDynamicCollisionGroup(enemy.body);
        enemy.body.debug = PHYSICS_DEBUG;
        enemy.body.angle = enemyData.angle;

        changeWeapon(enemy, enemyData.weapon);

        enemies.push(enemy);
    }

    game.paused = false;

    createAmmoDisplay();

    game.physics.p2.updateBoundsCollisionGroup();

    pickups = [];
    pickup = game.add.sprite(0, 0, 'shotgun_pickup');
    pickup.visible = false;
    pickup.fixedToCamera = true;
    pickup.cameraOffset.x = 64 - 13;
    pickup.cameraOffset.y = 0;
}

function setWorldBounds(w, h) {
    game.world.setBounds(0, 0, w, h);

    var sim = game.physics.p2;

    var top = game.add.tileSprite(w / 2, BOUNDS_INSET / 2, w, BOUNDS_INSET, 'spacer');
    game.physics.p2.enable(top);
    top.body.static = true;
    top.body.debug = PHYSICS_DEBUG;
    setStaticCollisionGroup(top.body);

    var left = game.add.tileSprite(BOUNDS_INSET / 2, h / 2, BOUNDS_INSET, h, 'spacer');
    game.physics.p2.enable(left);
    left.body.static = true;
    left.body.debug = PHYSICS_DEBUG;
    setStaticCollisionGroup(left.body);

    var bottom = game.add.tileSprite(w / 2, w - BOUNDS_INSET / 2, w, BOUNDS_INSET, 'spacer');
    game.physics.p2.enable(bottom);
    bottom.body.static = true;
    bottom.body.debug = PHYSICS_DEBUG;
    setStaticCollisionGroup(bottom.body);

    var right = game.add.tileSprite(h - BOUNDS_INSET / 2, h / 2, BOUNDS_INSET, h, 'spacer');
    game.physics.p2.enable(right);
    right.body.static = true;
    right.body.debug = PHYSICS_DEBUG;
    setStaticCollisionGroup(right.body);
}

function createAmmoDisplay() {
    var ammo0 = game.add.sprite(0, 0, 'numbers');
    ammo0.fixedToCamera = true;
    ammo0.cameraOffset.x = 1;
    ammo0.cameraOffset.y = 1;

    var ammo1 = game.add.sprite(0, 0, 'numbers');
    ammo1.fixedToCamera = true;
    ammo1.cameraOffset.x = 5;
    ammo1.cameraOffset.y = 1;

    ammo = [
        ammo0, ammo1
    ];
}

function createRoom(room) {
    var x = room.x;
    var y = room.y;
    var w = room.w;
    var h = room.h;
    var doors = room.doors;

    layers[0].add(game.add.tileSprite(x, y, w, h, room.floor));
    createWall(x, y, w - 3, 3, 'h', doors[0]); // north
    createWall(x + w - 3, y, 3, h, 'v', doors[1]); // east
    createWall(x, y + h - 3, w - 3, 3, 'h', doors[2]); // south
    createWall(x, y, 3, h - 3, 'v', doors[3]); // west
}

function createWall(x, y, w, h, direction, door) {
    if (!door) {
        console.log('adding wall at ' + x + ',' + y + ' with w=' + w + ' h=' + h);

        var wall = game.add.tileSprite(x, y, w, h, 'wall_' + direction);
        layers[1].add(wall);

        game.physics.p2.enable(wall);
        wall.anchor.setTo(0, 0);
        wall.body.setRectangle(w, h, w / 2, h / 2);
        wall.body.static = true;
        wall.body.debug = PHYSICS_DEBUG;
        setStaticCollisionGroup(wall.body);

        sightBlockingBodies.push(wall.body);
    } else {
        createWall(x, y,
            direction == 'v' ? w : door.offset, direction == 'v' ? door.offset : h,
            direction);
        createWall(direction == 'v' ? x : x + door.offset + DOOR_WIDTH, direction == 'v' ? y + door.offset + DOOR_WIDTH : y,
            direction == 'v' ? w : w - door.offset - DOOR_WIDTH, direction == 'v' ? h - door.offset - DOOR_WIDTH : h,
            direction);
        if (door.door) {
            createDoor(direction == 'v' ? x : x + door.offset, direction == 'v' ? y + door.offset : y, direction);
        }
    }
}

function createDoor(x, y, direction) {
    // Some shady math with the offsets in here.
    // P2 can't seem to do pixel perfect physics at this resolutions
    var sim = game.physics.p2;
    if (direction == 'v') {
        x += 2;
    } else {
        y++;
    }

    console.log('creating door at ' + x + ',' + y);

    var point = new p2.Body();
    sim.world.addBody(point);

    var door;
    if (direction == 'v') {
        door = game.add.sprite(x + 0.5, y + DOOR_WIDTH / 2, 'door');
    } else {
        door = game.add.sprite(x + DOOR_WIDTH / 2, y + 0.5, 'door');
    }
    layers[1].add(door);

    sim.enable(door);
    door.body.setRectangle(DOOR_WIDTH - 2, 1, 0, 0, 0);
    door.body.angularDamping = 0.9;
    door.body.debug = PHYSICS_DEBUG;
    door.body.angle = direction == 'v' ? 90 : 0;
    setDynamicCollisionGroup(door.body);

    // For sight blocking
    door.body.addRectangle(DOOR_WIDTH + 2, 2, 0, 0, 0);
    door.body.data.shapes[1].sensor = true;

    var jointX = x + 0.5;
    var jointY = y + 0.5;

    console.log('door joint at ' + jointX + ',' + jointY);
    var revolute = new p2.RevoluteConstraint(point, door.body.data, {
        worldPivot: [sim.pxmi(jointX), sim.pxmi(jointY)]
    });
    sim.world.addConstraint(revolute);

    sightBlockingBodies.push(door.body);
}

function changeWeapon(sprite, name, ammo) {
    console.log('changing weapon to ' + name);

    if (sprite.weaponSprite) {
        sprite.weaponSprite.destroy();
        delete sprite.weaponSprite;
    }

    sprite.weapon = WEAPONS[name];
    sprite.ammo = ammo || WEAPONS[name].ammo;

    sprite.weaponSprite = game.make.sprite(-4, -4, name);
    sprite.addChild(sprite.weaponSprite);

    if (name == 'fist') {
        sprite.weaponSprite.visible = false;
    }
}

function setStaticCollisionGroup(body) {
    body.setCollisionGroup(staticCollisionGroup);
    body._collisionGroup = 'static';
    body.collides([staticCollisionGroup, dynamicCollisionGroup, bulletCollisionGroup]);
}

function setDynamicCollisionGroup(body) {
    body.setCollisionGroup(dynamicCollisionGroup);
    body._collisionGroup = 'dynamic';
    body.collides([staticCollisionGroup, dynamicCollisionGroup, bulletCollisionGroup]);
}
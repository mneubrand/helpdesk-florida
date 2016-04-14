var player, cursor;
var layers;
var currentLevel = 0;

function loadLevel(index) {
    game.world.removeAll();
    var level = LEVELS[index];

    // Bounds
    setWorldBounds(level.w, level.h);
    layers = [];
    for(var i = 0; i < 3; i++) {
        layers.push(game.add.group());
    }

    // Rooms
    for(var i = 0; i < level.rooms.length; i++) {
        createRoom(level.rooms[i]);
    }

    // Player + cursor
    player = game.add.sprite(level.playerX, level.playerY, 'player');
    player.lastFrameUpdate = 0;
    game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON);

    cursor = game.add.sprite(0, 0, 'cursor');
    cursor.visible = false;
    cursor.fixedToCamera = true;

    // Physics
    game.physics.p2.enable(player);
    player.body.fixedRotation = true;
    player.body.collideWorldBounds = true;
    setDynamicCollisionGroup(player.body);
    player.body.debug = PHYSICS_DEBUG;
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
    } else {
        createWall(x, y,
            direction == 'v' ? w : door.offset, direction == 'v' ? door.offset : h,
            direction);
        createWall(direction == 'v' ? x : x + door.offset + DOOR_WIDTH, direction == 'v' ? y + door.offset + DOOR_WIDTH : y,
            direction == 'v' ? w : w - door.offset - DOOR_WIDTH, direction == 'v' ? h - door.offset - DOOR_WIDTH : h,
            direction);
        if(door.door) {
            createDoor(direction == 'v' ? x : x + door.offset, direction == 'v' ? y + door.offset : y, direction);
        }
    }
}

function createDoor(x, y, direction) {
    // Some shady math with the offsets in here.
    // P2 can't seem to do pixel perfect physics at this resolutions
    var sim = game.physics.p2;
    if(direction == 'v') {
        x+= 2;
    } else {
        y++;
    }

    console.log('creating door at ' + x + ',' + y);

    var point = new p2.Body();
    sim.world.addBody(point);

    var door;
    if(direction == 'v') {
        door = game.add.sprite(x + 0.5 , y + DOOR_WIDTH / 2, 'door');
    } else {
        door = game.add.sprite(x + DOOR_WIDTH / 2 , y + 0.5, 'door');
    }
    layers[1].add(door);

    sim.enable(door);
    door.body.setRectangle(DOOR_WIDTH - 2, 1, 0, 0, 0);
    door.body.angularDamping = 0.9;
    door.body.debug = PHYSICS_DEBUG;
    door.body.angle = direction == 'v' ? 90 : 0;
    setDynamicCollisionGroup(door.body);

    var jointX = x + 0.5;
    var jointY = y + 0.5;

    console.log('door joint at ' + jointX + ',' + jointY);
    var revolute = new p2.RevoluteConstraint(point, door.body.data, {
        worldPivot: [ sim.pxmi(jointX), sim.pxmi(jointY) ]
    });
    sim.world.addConstraint(revolute);
}

function setStaticCollisionGroup(body) {
    body.setCollisionGroup(staticCollisionGroup);
    body._collisionGroup = 'static';
    body.collides([ staticCollisionGroup, dynamicCollisionGroup, bulletCollisionGroup ]);
}

function setDynamicCollisionGroup(body) {
    body.setCollisionGroup(dynamicCollisionGroup);
    body._collisionGroup = 'dynamic';
    body.collides([ staticCollisionGroup, dynamicCollisionGroup, bulletCollisionGroup ]);
}
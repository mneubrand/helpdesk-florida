var mouseX, mouseY, rotation = 0;
var cursors;
var waitingForSpace = false;

function requestLock(e) {
    game.input.mouse.requestPointerLock();
}

function mouseMove(e) {
    if (game.input.mouse.locked && !player.dead) {
        // Limit cursor to playing field
        var halfWidth = 32 * scale;
        if (halfWidth + e.movementX + mouseX >= 0 && halfWidth + e.movementX + mouseX <= (64 - cursor.width) * scale) {
            mouseX += e.movementX;
        }
        if (halfWidth + e.movementY + mouseY >= 0 && halfWidth + e.movementY + mouseY <= (64 - cursor.width) * scale) {
            mouseY += e.movementY;
        }

        var x = (halfWidth + mouseX) / scale;
        var y = (halfWidth + mouseY) / scale;

        cursor.visible = true;
        cursor.cameraOffset.x = Math.round(x);
        cursor.cameraOffset.y = Math.round(y);

        rotation = ((Math.atan2(game.camera.y + y - player.y, game.camera.x + x - player.x) * 180 / Math.PI) + 450) % 360;
    } else {
        cursor.visible = false;
        mouseX = 0;
        mouseY = 0;
    }
}

function mouseDown(e) {
    if (e.button == 0) {
        game.input.activePointer.leftButton.timeDown = game.time.time;
        game.input.activePointer.leftButton.isDown = true;
    } else if (e.button == 2) {
        for (var i = 0; i < pickups.length; i++) {
            var boundsA = player.getBounds();
            var boundsB = pickups[i].getBounds();

            if (Phaser.Rectangle.intersects(boundsA, boundsB)) {
                spawnPickup(player);
                changeWeapon(player, pickups[i].weapon, pickups[i].ammo);
                pickups[i].destroy();
                pickups.splice(i, 1);
                return;
            }
        }
    }
}

function mouseUp(e) {
    if (e.button == 0) {
        game.input.activePointer.leftButton.isDown = false;
    }
}

function updateInput() {
    if (player) {
        player.body.setZeroVelocity();
    }

    if (waitingForSpace) {
        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
            waitingForSpace = false;
            loadLevel(currentLevel);
        }
        return;
    }

    player.body.angle = rotation;

    if (cursors.down.isDown) {
        player.body.moveDown(MOVE_SPEED);
    }
    if (cursors.up.isDown) {
        player.body.moveUp(MOVE_SPEED);
    }
    if (cursors.left.isDown) {
        player.body.moveLeft(MOVE_SPEED);
    }
    if (cursors.right.isDown) {
        player.body.moveRight(MOVE_SPEED);
    }

    if (game.input.activePointer.leftButton.isDown) {
        var targetX = cursor.cameraOffset.x + game.camera.x;
        var targetY = cursor.cameraOffset.y + game.camera.y;
        player.weapon.fire(player, targetX, targetY, game.input.activePointer.leftButton.timeDown);
    }
}

function waitForSpace() {
    waitingForSpace = true;
}
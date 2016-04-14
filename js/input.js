var mouseX, mouseY, rotation = 0;
var cursors;

function requestLock() {
    game.input.mouse.requestPointerLock();
}

function move(e) {
    if (game.input.mouse.locked) {
        // Limit cursor to just slightly outside playing field
        if (e.x + e.movementX + mouseX >= 0 && e.x + e.movementX + mouseX <= (64 - cursor.width) * scale) {
            mouseX += e.movementX;
        }
        if (e.y + e.movementY + mouseY >= 0 && e.y + e.movementY + mouseY <= (64 - cursor.width) * scale) {
            mouseY += e.movementY;
        }

        var x = (e.x + mouseX) / scale;
        var y = (e.y + mouseY) / scale;

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

function updatePlayerPhysics() {
    player.body.angle = rotation;
    player.body.setZeroVelocity();

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
}
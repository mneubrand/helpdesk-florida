var BULLET_SPEED = 100;
var DEBRIS_SPEED = 60;
var DEBRIS_DAMPING = 0.99995;
var ANGULAR_DEBRIS_DAMPING = 0.995;

var WEAPONS = {
    shotgun: {
        name: 'shotgun',
        ammo: 6,
        fire: function (sprite, clickTime) {
            var diff = game.time.now - sprite.lastShot;
            if (diff < 500 || sprite.lastClick === clickTime) {
                return;
            }

            sprite.lastShot = game.time.now;
            sprite.lastClick = clickTime;

            if (sprite.ammo > 0) {
                sprite.ammo--;

                for (var i = 0; i < 5; i++) {
                    var targetX = cursor.cameraOffset.x + game.camera.x;
                    var targetY = cursor.cameraOffset.y + game.camera.y;
                    console.log('Shooting shotgun from ' + sprite.x + ',' + sprite.y + ' to ' + targetX + ',' + targetY);

                    //var bulletX = sprite.x + Math.cos(game.math.degToRad(sprite.body.angle)) * 2;
                    //var bulletY = sprite.y + Math.sin(game.math.degToRad(sprite.body.angle)) * 2;
                    var bulletX = sprite.x;
                    var bulletY = sprite.y;

                    var spray = 6;
                    var angle = Math.atan2(targetY - bulletY, targetX - bulletX) + game.math.degToRad(-2 * spray + i * spray);
                    spawnBullet(bulletX, bulletY, angle, sprite === player);
                }
            } else {
                // TODO play empty gun sound
            }
        }
    }
}

function spawnBullet(x, y, angle, fromPlayer) {
    var bullet = game.add.sprite(x, y, 'bullet');
    game.physics.p2.enable(bullet);
    bullet.body.setCollisionGroup(bulletCollisionGroup);
    bullet.body.mass = 1000;
    bullet.body.data.isBullet = true;
    bullet.body.data.fromPlayer = fromPlayer;

    bullet.body.collides([ staticCollisionGroup, dynamicCollisionGroup ]);

    bullet.body.onBeginContact.add(function blockHit (body, bodyB, shapeA, shapeB, equation) {
        if(body._collisionGroup == 'static') {
            // Spawn debris
            for(var i = 0; i < Math.floor(Math.random() * 2) + 1; i++) {
                var debris = game.add.sprite(bullet.x, bullet.y, 'debris');
                game.physics.p2.enable(debris);
                debris.body.clearShapes();

                var debrisAngle = game.math.degToRad(game.math.radToDeg(angle) + 180 + (-45 + Math.random() * 90) % 360);
                console.log('in: ' + game.math.radToDeg(angle) + 'out: ' + game.math.radToDeg(debrisAngle));
                debris.body.angle = debrisAngle;
                debris.body.damping = DEBRIS_DAMPING;
                debris.body.velocity.x = Math.cos(debrisAngle) * DEBRIS_SPEED * Math.random();
                debris.body.velocity.y = Math.sin(debrisAngle) * DEBRIS_SPEED * Math.random();
                debris.body.angularDamping = DEBRIS_DAMPING;
                debris.body.angularVelocity = DEBRIS_SPEED * (-0.5 + Math.random());
             }

            bullet.destroy();
        } else if(body._collisionGroup == 'dynamic') {
            // TODO check if we hit a character
        }
    }, this);

    bullet.body.rotation = angle + game.math.degToRad(90);
    bullet.body.velocity.x = Math.cos(angle) * BULLET_SPEED;
    bullet.body.velocity.y = Math.sin(angle) * BULLET_SPEED;

    player.body.setZeroVelocity();
}
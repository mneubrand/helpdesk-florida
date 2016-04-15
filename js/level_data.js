var LEVELS = [
    {
        w: 110,
        h: 110,
        playerX: 32,
        playerY: 18,
        rooms: [
            {
                x: 25,
                y: 25,
                w: 18,
                h: 55,
                doors: [{offset: 4, door: true}, {offset: 40, door: true}],
                floor: 'floor_d'
            },
            {
                x: 40,
                y: 55,
                w: 40,
                h: 25,
                doors: [{offset: 5, door: true}, null, null, {offset: 10}],
                floor: 'floor_a'
            },
            {
                x: 40,
                y: 35,
                w: 23,
                h: 23,
                doors: [null, {offset: 6, door: true}, {offset: 5}],
                floor: 'floor_b'
            },
            {
                x: 60,
                y: 35,
                w: 20,
                h: 23,
                doors: [null, null, null, {offset: 6}],
                floor: 'floor_e'
            }
        ],
        enemies: [
            {
                x: 50,
                y: 60,
                angle: 0,
                weapon: 'assault_rifle'
            }
        ]
    },
    {
        w: 140,
        h: 140,
        playerX: 86,
        playerY: 105,
        rooms: [
            {
                x: 20,
                y: 20,
                w: 25,
                h: 35,
                doors: [null, {offset: 10, door: true}, {offset: 7, door: true}],
                floor: 'floor_a'
            },
            {
                x: 20,
                y: 52,
                w: 25,
                h: 35,
                doors: [{offset: 7}],
                floor: 'floor_c'
            },
            {
                x: 42,
                y: 20,
                w: 40,
                h: 35,
                doors: [null, {offset: 7}, {offset: 7}, {offset: 10}],
                floor: 'floor_d'
            },
            {
                x: 42,
                y: 52,
                w: 40,
                h: 35,
                doors: [{offset: 7, door: true}, null, null, {offset: 10}],
                floor: 'floor_b'
            },
            {
                x: 64,
                y: 52,
                w: 18,
                h: 18,
                doors: [null, null, {offset: 4, door: true}, {offset: 4, door: true}],
                floor: 'floor_e'
            },
            {
                x: 59,
                y: 67,
                w: 23,
                h: 20,
                doors: [{offset: 9}],
                floor: 'floor_a'
            },
            {
                x: 79,
                y: 20,
                w: 18,
                h: 78,
                doors: [null, null, {offset: 4, door: true}, {offset: 7, door: true}],
                floor: 'floor_c'
            }
        ],
        enemies: [
            {
                x: 88,
                y: 75,
                angle: 0,
                weapon: 'assault_rifle'
            },
            {
                x: 50,
                y: 28,
                angle: 90,
                weapon: 'fist',
                waypoints: [
                    [50, 28],
                    [70, 28]
                ]
            }
        ]
    }
];
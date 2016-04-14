var LEVELS = [
    {
        w: 200,
        h: 200,
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
                floor: 'floor_b'
            }
        ],
        enemies: [
            {
                x: 88,
                y: 60
            }
        ]
    },
    {
        w: 200,
        h: 200,
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
                floor: 'floor_b'
            }
        ],
        enemies: [
            {
                x: 88,
                y: 60
            }
        ]
    }
];
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
                x: 46,
                y: 68,
                angle: 90,
                weapon: 'assault_rifle'
            },
            {
                x: 57,
                y: 41,
                angle: 180,
                weapon: 'fist',
                waypoints: [
                    [57, 41],
                    [57, 52]
                ]
            },
            {
                x: 75,
                y: 48,
                angle: 270,
                weapon: 'shotgun'
            },
        ],
        stuff: [
            {
                x: 59,
                y: 62,
                angle: 0,
                type: 'sofa'
            },
            {
                x: 59,
                y: 69,
                angle: 0,
                type: 'table'
            },
            {
                x: 69,
                y: 62,
                angle: 0,
                type: 'nightstand'
            },
            {
                x: 47,
                y: 43,
                angle: 0,
                type: 'single_bed'
            },
            {
                x: 52,
                y: 42,
                angle: 0,
                type: 'nightstand'
            },
            {
                x: 72,
                y: 42,
                angle: 0,
                type: 'bath_tub'
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
                weapon: 'shotgun'
            },
            {
                x: 47,
                y: 42,
                angle: 90,
                weapon: 'fist',
                waypoints: [
                    [47, 42],
                    [75, 42]
                ]
            },
            {
                x: 61,
                y: 63,
                angle: 315,
                weapon: 'assault_rifle'
            },
            {
                x: 77,
                y: 60,
                angle: 270,
                weapon: 'shotgun'
            },
            {
                x: 25,
                y: 28,
                angle: 90,
                weapon: 'shotgun',
                waypoints: [
                    [27, 32],
                    [27, 48],
                ]
            },
            {
                x: 32,
                y: 75,
                angle: 0,
                weapon: 'assault_rifle'
            }
        ],
        stuff: [
            {
                x: 70,
                y: 26,
                angle: 0,
                type: 'sofa'
            },
            {
                x: 55,
                y: 26,
                angle: 0,
                type: 'sofa'
            },
            {
                x: 32,
                y: 26,
                angle: 0,
                type: 'sofa'
            },
            {
                x: 55,
                y: 36,
                angle: 0,
                type: 'table'
            },
            {
                x: 73,
                y: 50,
                angle: 180,
                type: 'dresser'
            },
            {
                x: 63,
                y: 50,
                angle: 180,
                type: 'nightstand'
            },
            {
                x: 51,
                y: 79,
                angle: 180,
                type: 'double_bed'
            },
            {
                x: 57,
                y: 82,
                angle: 180,
                type: 'nightstand'
            },
            {
                x: 75,
                y: 82,
                angle: 180,
                type: 'dresser'
            },
            {
                x: 68,
                y: 82,
                angle: 180,
                type: 'dresser'
            },
            {
                x: 78,
                y: 62,
                angle: 90,
                type: 'sink'
            },
            {
                x: 39,
                y: 49,
                angle: 180,
                type: 'nightstand'
            },
            {
                x: 27,
                y: 66,
                angle: 0,
                type: 'table'
            },
            {
                x: 31,
                y: 66,
                angle: 0,
                type: 'table'
            }
        ]
    }
];
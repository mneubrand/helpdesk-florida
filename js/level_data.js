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
            }
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
                    [27, 48]
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
    },





    {
        w: 160,
        h: 160,
        playerX: 70,
        playerY: 126,
        rooms: [
            {
                x: 20,
                y: 20,
                w: 100,
                h: 100,
                doors: [null, null, {offset: 46, door: true}],
                floor: 'floor_c'
            },
            {
                x: 20,
                y: 20,
                w: 42,
                h: 42,
                doors: [null, {offset: 17, door: true}, {offset: 17, door: true}],
                floor: 'floor_a'
            },
            {
                x: 20,
                y: 78,
                w: 42,
                h: 42,
                doors: [{offset: 17, door: true}, {offset: 17, door: true}],
                floor: 'floor_d'
            },
            {
                x: 78,
                y: 78,
                w: 42,
                h: 42,
                doors: [{offset: 17, door: true}, null, null, {offset: 17, door: true}],
                floor: 'floor_e'
            },
            {
                x: 78,
                y: 20,
                w: 42,
                h: 42,
                doors: [null, null, {offset: 17, door: true}, {offset: 17, door: true}],
                floor: 'floor_b'
            }
        ],
        enemies: [
            {
                x: 70,
                y: 80,
                angle: 0,
                weapon: 'shotgun',
                waypoints: [
                    [70, 80],
                    [70, 115]
                ]
            },
            {
                x: 110,
                y: 70,
                angle: 270,
                weapon: 'assault_rifle'
            },
            {
                x: 30,
                y: 70,
                angle: 90,
                weapon: 'fist'
            },
            {
                x: 28,
                y: 95,
                angle: 90,
                weapon: 'shotgun',
                waypoints: [
                    [28, 98],
                    [52, 98]
                ]
            },
            {
                x: 85,
                y: 85,
                angle: 90,
                weapon: 'assault_rifle',
                waypoints: [
                    [85, 85],
                    [85, 112],
                    [112, 112],
                    [112, 85]
                ]
            },
            {
                x: 98,
                y: 98,
                angle: 270,
                weapon: 'assault_rifle'
            },
            {
                x: 29,
                y: 32,
                angle: 90,
                weapon: 'shotgun',
                waypoints: [
                    [29, 32],
                    [52, 32],
                    [52, 52],
                    [29, 52]
                ]
            },
            {
                x: 86,
                y: 41,
                angle: 90,
                weapon: 'assault_rifle',
                waypoints: [
                    [86, 41],
                    [114, 41]
                ]
            }
        ],
        stuff: [
            {
                x: 31,
                y: 84,
                angle: 0,
                type: 'sofa'
            },
            {
                x: 31,
                y: 90,
                angle: 0,
                type: 'table'
            },
            {
                x: 52,
                y: 114,
                angle: 180,
                type: 'double_bed'
            },
            {
                x: 31,
                y: 114,
                angle: 180,
                type: 'double_bed'
            },
            {
                x: 31,
                y: 26,
                angle: 0,
                type: 'dresser'
            },
            {
                x: 31,
                y: 26,
                angle: 0,
                type: 'dresser'
            },
            {
                x: 41,
                y: 26,
                angle: 0,
                type: 'dresser'
            },
            {
                x: 51,
                y: 26,
                angle: 0,
                type: 'dresser'
            },
            {
                x: 41,
                y: 39,
                angle: 0,
                type: 'sofa'
            },
            {
                x: 41,
                y: 45,
                angle: 0,
                type: 'table'
            },
            {
                x: 88,
                y: 28,
                angle: 0,
                type: 'double_bed'
            },
            {
                x: 100,
                y: 28,
                angle: 0,
                type: 'double_bed'
            },
            {
                x: 112,
                y: 28,
                angle: 0,
                type: 'double_bed'
            },
            {
                x: 88,
                y: 55,
                angle: 180,
                type: 'double_bed'
            },
            {
                x: 112,
                y: 55,
                angle: 180,
                type: 'double_bed'
            }
        ]
    }
];
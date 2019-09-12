/* globals randomInt, shuffle */
const comp = {
  body: {
    round: [
      [64, 64, 40]
    ],
    bigRound: [
      [64, 64, 45]
    ],
    smallRound: [
      [64, 64, 35]
    ],
    tall: [
      [64, 64, 15, 44, 0]
    ],
    wide: [
      [64, 64, 40, 35, 0]
    ]
  },
  ears: {
    pointed: [[
      [34, 50],
      [30, 6],
      [54, 36]
    ], [
      [92, 60],
      [96, 6],
      [72, 36]
    ]],
    bigRound: [
      [40, 34, 25], [88, 34, 25]
    ],
    smallRound: [
      [38, 32, 20], [90, 32, 20]
    ]
  },
  eyes: {
    round: [
      [46, 54, 10],
      [82, 54, 10]
    ],
    smallRound: [
      [46, 54, 6],
      [82, 54, 6]
    ],
    pandy: [
      [46, 54, 14, 12, -20],
      [46, 54, 6],
      [82, 54, 14, 12, 20],
      [82, 54, 6]
    ],
    feelers: [
      [[60, 30], [46, 15]],
      [[68, 30], [82, 15]],
      [46, 14, 6],
      [82, 14, 6]
    ],
    froggy: [
      [46, 35, 10],
      [46, 35, 4],
      [82, 35, 10],
      [82, 35, 4]
    ]
  },
  nose: {
    round: [
      [64, 72, 4]
    ],
    bigRound: [
      [64, 72, 6]
    ],
    piggy: [
      [64, 72, 14, 10, 0], [58, 72, 3], [70, 72, 3]
    ],
    beak: [[
      [64, 62], [64, 78], [88, 70]
    ]],
    trunk: [[
      [64, 66], [74, 72], [54, 95], [70, 112], [60, 118], [40, 96]
    ]],
    dots: [
      [60, 64, 2],
      [68, 64, 2]
    ]
  },
  mouth: {
    normal: [
      [[44, 74], [84, 74]]
    ],
    smiling: [
      [[44, 74], [50, 80], [60, 83], [68, 83], [78, 80], [84, 74]]
    ]
  },
  beard: {
    whiskers: [[
      [70, 70],
      [92, 60]
    ], [
      [58, 70],
      [32, 60]
    ], [
      [70, 72],
      [92, 78]
    ], [
      [58, 72],
      [32, 78]
    ]]
  },
  wings: {
    butterflyish: [
      [38, 46, 30], [90, 46, 30],
      [44, 84, 25], [84, 84, 25]
    ],
    birdy: [
      [[84, 56], [84, 76], [108, 68]],
      [[44, 56], [44, 76], [20, 68]]
    ]
  }
}

const animals = Object.entries({
  cat: [
    comp.ears.pointed,
    comp.body.round,
    comp.eyes.round,
    comp.nose.round,
    comp.beard.whiskers
  ],
  bear: [
    comp.ears.smallRound,
    comp.body.bigRound,
    comp.eyes.round,
    comp.nose.bigRound
  ],
  mouse: [
    comp.ears.bigRound,
    comp.body.smallRound,
    comp.eyes.round,
    comp.nose.round,
    comp.beard.whiskers
  ],
  pig: [
    comp.ears.pointed,
    comp.body.round,
    comp.eyes.smallRound,
    comp.nose.piggy
  ],
  panda: [
    comp.ears.smallRound,
    comp.body.bigRound,
    comp.eyes.pandy,
    comp.nose.round
  ],
  bird: [
    comp.wings.birdy,
    comp.body.smallRound,
    comp.eyes.smallRound,
    comp.nose.beak
  ],
  elephant: [
    comp.ears.bigRound,
    comp.body.smallRound,
    comp.eyes.smallRound,
    comp.nose.trunk
  ],
  butterfly: [
    comp.wings.butterflyish,
    comp.body.tall,
    comp.eyes.feelers
  ],
  frog: [
    comp.body.wide,
    comp.eyes.froggy,
    comp.nose.dots,
    comp.mouth.smiling
  ],
  mutant: shuffle(Object.values(comp).map(e => {
    const values = Object.values(e)
    return values[randomInt(0, values.length)]
  })).slice(0, -1)
}).map(([name, comps]) => ({ name, comps }))

window.animals = animals

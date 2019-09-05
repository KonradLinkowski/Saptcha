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
      [38, 32, 15], [100, 32, 20]
    ],
  },
  eyes: {
    round: [
      [46, 54, 10],
      [82, 54, 10]
    ]
  },
  nose: {
    round: [
      [64, 72, 4]
    ],
    bigRound: [
      [64, 72, 6]
    ]
  },
  beard: {
    whiskers: [[
      [70, 70],
      [92, 60],
      [92, 62]
    ], [
      [58, 70],
      [32, 60],
      [32, 62]
    ], [
      [70, 72],
      [92, 78],
      [92, 80]
    ], [
      [58, 72],
      [32, 78],
      [32, 80]
    ]]
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
    comp.nose.bigRound,
  ],
  mouse: [
    comp.ears.bigRound,
    comp.body.smallRound,
    comp.eyes.round,
    comp.nose.round,
    comp.beard.whiskers
  ],
}).map(([name, comps]) => ({ name, comps }))

const SHAPE = Object.freeze({
  POLYGON: 'polygon',
  CIRCLE: 'circle'
})

const shape = {
  cat: [{
    t: SHAPE.POLYGON,
    p: [
      [17, 25],
      [15, 3],
      [27, 18]
    ]
  }, {
    t: SHAPE.POLYGON,
    p: [
      [46, 30],
      [48, 3],
      [36, 18]
    ],
  }, {
    t: SHAPE.CIRCLE,
    x: 32,
    y: 32,
    r: 20,
  }, {
    t: SHAPE.CIRCLE,
    x: 23,
    y: 27,
    r: 5,
  }, {
    t: SHAPE.CIRCLE,
    x: 41,
    y: 27,
    r: 5,
  }, {
    t: SHAPE.POLYGON,
    p: [
      [30, 34],
      [34, 34],
      [32, 38]
    ],
  }, {
    t: SHAPE.POLYGON,
    p: [
      [35, 35],
      [46, 30],
      [46, 31]
    ],
  }, {
    t: SHAPE.POLYGON,
    p: [
      [29, 35],
      [16, 30],
      [16, 31]
    ],
  }, {
    t: SHAPE.POLYGON,
    p: [
      [35, 36],
      [46, 39],
      [46, 40]
    ],
  }, {
    t: SHAPE.POLYGON,
    p: [
      [29, 36],
      [16, 39],
      [16, 40]
    ],
  }],
  bear: [{
    t: SHAPE.CIRCLE,
    x: 20,
    y: 17,
    r: 10,
  }, {
    t: SHAPE.CIRCLE,
    x: 44,
    y: 17,
    r: 10,
  }, {
    t: SHAPE.CIRCLE,
    x: 32,
    y: 32,
    r: 20,
  }, {
    t: SHAPE.CIRCLE,
    x: 23,
    y: 27,
    r: 5,
  }, {
    t: SHAPE.CIRCLE,
    x: 41,
    y: 27,
    r: 5,
  }, {
    t: SHAPE.CIRCLE,
    x: 32,
    y: 32,
    r: 3,
  }],
  mouse: [{
    t: SHAPE.CIRCLE,
    x: 20,
    y: 17,
    r: 10,
  }, {
    t: SHAPE.CIRCLE,
    x: 44,
    y: 17,
    r: 10,
  }, {
    t: SHAPE.CIRCLE,
    x: 32,
    y: 32,
    r: 20,
  }, {
    t: SHAPE.CIRCLE,
    x: 23,
    y: 27,
    r: 5,
  }, {
    t: SHAPE.CIRCLE,
    x: 41,
    y: 27,
    r: 5,
  }, {
    t: SHAPE.CIRCLE,
    x: 32,
    y: 36,
    r: 2,
  },  {
    t: SHAPE.POLYGON,
    p: [
      [35, 35],
      [46, 30],
      [46, 31]
    ],
  }, {
    t: SHAPE.POLYGON,
    p: [
      [29, 35],
      [16, 30],
      [16, 31]
    ],
  }, {
    t: SHAPE.POLYGON,
    p: [
      [35, 36],
      [46, 39],
      [46, 40]
    ],
  }, {
    t: SHAPE.POLYGON,
    p: [
      [29, 36],
      [16, 39],
      [16, 40]
    ],
  }]
}

const shapes = Object.entries(shape).map(([name, value]) => ({ name, value }))

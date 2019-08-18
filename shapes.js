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
      [32, 30]
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
  }]
}

const shapes = Object.entries(shape).map(([name, value]) => ({ name, value }))

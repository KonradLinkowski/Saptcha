const SHAPE = Object.freeze({
  POLYGON: 'polygon',
  CIRCLE: 'circle'
})

const shape = {
  cat: [{
    t: SHAPE.POLYGON,
    p: [
      [34, 50],
      [30, 6],
      [54, 36]
    ]
  }, {
    t: SHAPE.POLYGON,
    p: [
      [92, 60],
      [96, 6],
      [72, 36]
    ],
  }, {
    t: SHAPE.CIRCLE,
    x: 64,
    y: 64,
    r: 40,
  }, {
    t: SHAPE.CIRCLE,
    x: 46,
    y: 54,
    r: 10,
  }, {
    t: SHAPE.CIRCLE,
    x: 82,
    y: 54,
    r: 10,
  }, {
    t: SHAPE.POLYGON,
    p: [
      [60, 68],
      [68, 68],
      [64, 76]
    ],
  }, {
    t: SHAPE.POLYGON,
    p: [
      [70, 70],
      [92, 60],
      [92, 62]
    ],
  }, {
    t: SHAPE.POLYGON,
    p: [
      [58, 70],
      [32, 60],
      [32, 62]
    ],
  }, {
    t: SHAPE.POLYGON,
    p: [
      [70, 72],
      [92, 78],
      [92, 80]
    ],
  }, {
    t: SHAPE.POLYGON,
    p: [
      [58, 72],
      [32, 78],
      [32, 80]
    ],
  }],
  bear: [{
    t: SHAPE.CIRCLE,
    x: 40,
    y: 34,
    r: 20,
  }, {
    t: SHAPE.CIRCLE,
    x: 88,
    y: 34,
    r: 20,
  }, {
    t: SHAPE.CIRCLE,
    x: 64,
    y: 64,
    r: 40,
  }, {
    t: SHAPE.CIRCLE,
    x: 46,
    y: 54,
    r: 10,
  }, {
    t: SHAPE.CIRCLE,
    x: 82,
    y: 54,
    r: 10,
  }, {
    t: SHAPE.CIRCLE,
    x: 64,
    y: 64,
    r: 6,
  }],
  mouse: [{
    t: SHAPE.CIRCLE,
    x: 40,
    y: 34,
    r: 20,
  }, {
    t: SHAPE.CIRCLE,
    x: 88,
    y: 34,
    r: 20,
  }, {
    t: SHAPE.CIRCLE,
    x: 64,
    y: 64,
    r: 40,
  }, {
    t: SHAPE.CIRCLE,
    x: 46,
    y: 54,
    r: 10,
  }, {
    t: SHAPE.CIRCLE,
    x: 82,
    y: 54,
    r: 10,
  }, {
    t: SHAPE.CIRCLE,
    x: 64,
    y: 72,
    r: 4,
  },  {
    t: SHAPE.POLYGON,
    p: [
      [70, 70],
      [92, 60],
      [92, 62]
    ],
  }, {
    t: SHAPE.POLYGON,
    p: [
      [58, 70],
      [32, 60],
      [32, 62]
    ],
  }, {
    t: SHAPE.POLYGON,
    p: [
      [70, 72],
      [92, 78],
      [92, 80]
    ],
  }, {
    t: SHAPE.POLYGON,
    p: [
      [58, 72],
      [32, 78],
      [32, 80]
    ],
  }]
}

const shapes = Object.entries(shape).map(([name, value]) => ({ name, value }))

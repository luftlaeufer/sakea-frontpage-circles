window.onload = function () {
  balls();
};

function balls() {
  const Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Composites = Matter.Composites,
    MouseConstraint = Matter.MouseConstraint,
    Mouse = Matter.Mouse,
    Composite = Matter.Composite,
    Bodies = Matter.Bodies,
    Common = Matter.Common;

  let cols = 12;
  let rows = 12;
  let size = 0;

  let buttonPositionX = window.innerWidth * 0.22;
  let buttonsPositionY = window.innerHeight * 0.75;
  let buttonSize = 100;

  if (window.innerWidth <= 730) {
    buttonPositionX = window.innerWidth * 0.22;
    buttonsPositionY = window.innerHeight * 0.85;
    buttonSize = 75;
  }

  function random(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);;
  }

  // create engine
  const engine = Engine.create(),
    world = engine.world;

  // create renderer
  const render = Render.create({
    element: document.getElementById('canvas'),
    engine: engine,
    options: {
      width: window.innerWidth,
      height: window.innerHeight,
      wireframes: false,
      background: "#ffffff",
    },
  });

  //engine.timing.timeScale = 1.25;

  Render.run(render);

  // create runner
  const runner = Runner.create();
  Runner.run(runner, engine);

  // add bodies

  if (window.innerWidth <= 730) {
    cols = 6;
    rows = 5;
  }

  // add circles
  const stack = Composites.stack(0, 0, cols, rows, 0, 0, function (x, y) {
    size = random(cols, (window.innerWidth / cols * 0.5));

    if (window.innerWidth <= 730) {
      size = random(cols, (window.innerWidth / cols * 0.75 ));
    }

    return Bodies.circle(x, y, size, {
      render: {
        fillStyle: "#D3F539",
        strokeStyle: "white",
        lineWidth: 1,
      },
    });
  });


  let wallThickness = 200;

  Composite.add(world, [
    // walls x | y | width | height
    // walls need to be thicker
    Bodies.rectangle(window.innerWidth / 2, -wallThickness/2 - 1, window.innerWidth, wallThickness, { isStatic: true }), //top
    Bodies.rectangle(window.innerWidth + wallThickness / 2 + 1, window.innerHeight / 2, wallThickness, window.innerHeight, { isStatic: true }), //right
    Bodies.rectangle(window.innerWidth / 2, window.innerHeight + wallThickness / 2 + 1, window.innerWidth, wallThickness, { isStatic: true }), //bottom
    Bodies.rectangle(-wallThickness/2 - 1, window.innerHeight / 2, wallThickness, window.innerHeight, { isStatic: true }), //left

    stack,

    // portfolio button
    Bodies.circle(buttonPositionX, buttonsPositionY, buttonSize, {
      isStatic: true,
      render: {
        fillStyle: "white",
        strokeStyle: "transparent",
        lineWidth: 1,
      },
    }),

    // home logo  in upper left corner
    Bodies.circle(0, 0, buttonSize * 2, {
      isStatic: true,
      render: {
        fillStyle: "white",
        strokeStyle: "transparent",
        lineWidth: 1,
      },
    }),

    // menu in upper right corner
    Bodies.circle(window.innerWidth, 0, buttonSize * 1.5, {
      isStatic: true,
      render: {
        fillStyle: "white",
        strokeStyle: "transparent",
        lineWidth: 1,
      },
    }),

    // language switcher in lower right corner
    Bodies.circle(window.innerWidth, window.innerHeight - buttonSize * 0.3, buttonSize * 1.2, {
      isStatic: true,
      render: {
        fillStyle: "white",
        strokeStyle: "transparent",
        lineWidth: 1,
      },
    }),
  ]);

  // add mouse control
  const mouse = Mouse.create(render.canvas),
    mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 1,
        render: {
          visible: false,
        },
      },
    });

  Composite.add(world, mouseConstraint);

  // keep the mouse in sync with rendering
  render.mouse = mouse;

  window.onresize = function() {
    console.log('resized')
  }
}

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

  // create engine
  const engine = Engine.create(),
    world = engine.world;

  // create renderer
  const render = Render.create({
    element: document.body,
    engine: engine,
    options: {
      width: window.innerWidth,
      height: window.innerHeight,
      wireframes: false,
      background: "#ffffff",
    },
  });

  Render.run(render);

  // create runner
  const runner = Runner.create();
  Runner.run(runner, engine);

  // add bodies

  const cols = 12;
  const rows = 12;

  const stack = Composites.stack(0, 0, cols, rows, 0, 0, function (x, y) {
    let size = Math.round(Common.random(16, 64));
    return Bodies.circle(x, y, size, {
      render: {
        fillStyle: "#D3F539",
        strokeStyle: "transparent",
        lineWidth: 0,
      },
    });
  });

  //console.log(stack);

  Composite.add(world, [
    // walls x | y | width | height
    Bodies.rectangle(window.innerWidth / 2, -1, window.innerWidth, 1, { isStatic: true }), //top
    Bodies.rectangle(window.innerWidth + 1, window.innerHeight / 2, 1, window.innerHeight, { isStatic: true }), //right
    Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 1, window.innerWidth, 1, { isStatic: true }), //bottom
    Bodies.rectangle(0, window.innerHeight / 2, 1, window.innerHeight, { isStatic: true }), //left

    stack,

    // portfolio button
    Bodies.circle(window.innerWidth * 0.3, window.innerHeight * 0.6, 100, {
      isStatic: true,
      render: {
        fillStyle: "white",
        strokeStyle: "transparent",
        lineWidth: 1,
      },
    }),

    // home logo  in upper left corner
    Bodies.circle(0, 0, 200, {
      isStatic: true,
      render: {
        fillStyle: "white",
        strokeStyle: "transparent",
        lineWidth: 1,
      },
    }),

    // menu in upper right corner
    Bodies.circle(window.innerWidth, 0, 200, {
      isStatic: true,
      render: {
        fillStyle: "white",
        strokeStyle: "transparent",
        lineWidth: 1,
      },
    }),

    // language switcher in lower right corner
    Bodies.rectangle(window.innerWidth, window.innerHeight, 200, 200, {
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
}

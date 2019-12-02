import Matter from "matter-js";

const Physics = (entities, { touches, time }) => {
    let engine = entities.physics.engine;
    engine.world.gravity.y = 0;
    //engine.world.gravity.x = 0;
    
    // let pusher = entities.pusher.body;
    // touches.filter(t => t.type === "press").forEach(t => {
    //     Matter.Body.applyForce( pusher, pusher.position, {x: 0.00, y: -0.10});
    // });    
    Matter.Engine.update(engine, time.delta);
    return entities;
};

export default Physics;
import Matter from "matter-js";

const Physics = (entities, { touches, time }) => {
    let engine = entities.physics.engine;
    engine.world.gravity.y = 0;
    
    

    // touches.filter(t => t.type === "press").forEach(t => {
    //     Matter.Body.applyForce( bird, bird.position, {x: 0.00, y: -0.10});
    // });


    //engine.world.gravity.x = 0;
    //let obj1 = entities.obj1.body;
    Matter.Engine.update(engine, time.delta);



    return entities;
};

export default Physics;
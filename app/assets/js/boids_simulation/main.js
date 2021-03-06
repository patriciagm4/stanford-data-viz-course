// renderer, camera, scene 

// constants
var scene_width = scene_height = 500;
var viz_canvas_id = "boids_simulation_canvas"; 
var viz_ui_container_id = "boids_simulation_ui_container"; 

// bind renderer (THREE.WebGLRenderer uses the GPU) to canvas, set size, and enable antialiasing
var canvas = document.getElementById(viz_canvas_id);
var renderer = new THREE.WebGLRenderer({ 
    "canvas": canvas, 
    "antialias": true 
});
renderer.setSize(scene_width, scene_height);

// set up a camera and move it to a good viewing place (orbitcontrols overwrites this)
var camera = new THREE.PerspectiveCamera(45, scene_width / scene_height, 1, 10000);
camera.position.set(scene_width, scene_height / 2, 2000);

// scene - where we put our meshes
var scene = new THREE.Scene();

// container object (like a sub-scene) which we use to store meshes
var container = new THREE.Object3D();
scene.add(container);

// --------------------------------------------------------- 
// add each Boid object to an array called "boids"

var n_boids = 400,
    boids = [];

for (var i = 0; i < n_boids; i++) {
    var b = new Boid(scene_width, scene_height);
    b.create_mesh();       // defined in boids_prototypes_for_three.js
    container.add(b.mesh);
    boids.push(b); // add this boid to the array
}

// ------------------------------------------------------------------------------------------------
// helpers

// orbit controls binds mouse events (over the canvas only) to the camera
var controls = new THREE.OrbitControls(camera, canvas); // it is super important to add the second arg, it scopes the events to those fired over the canvas and not the entire doc
controls.addEventListener('change', function(){
    renderer.render(scene, camera);
});

// axes
var axes = new THREE.AxisHelper2(scene_width);
axes.update();
container.add(axes.mesh);

// bounding box
var bounding_box = new THREE.BoundingBoxHelper(container); // can also be tied to scene but since our objects are in the container we tie it here
bounding_box.update(); // render
container.add(bounding_box);

// ------------------------------------------------------------------------------------------------
// lights

var ambient_light = new THREE.AmbientLight(0xffffff);
ambient_light.name = "ambient_light";
scene.add(ambient_light);

var directional_light = new THREE.DirectionalLight(0xffffff)
directional_light.position.set(1,1,1);
directional_light.name = "directional_light";
scene.add(directional_light);

// ------------------------------------------------------------------------------------------------
// user interface

// stats (fps graph)
var stats = new Stats();
document.getElementById(viz_ui_container_id).appendChild(stats.domElement); // add stats to the container
stats.domElement.style.position = "";
stats.domElement.style.float = "right";

// dat.gui
var gui = new dat.GUI({ "width": 400, "height": 400 });
document.getElementById(viz_ui_container_id).appendChild(gui.domElement);

// this is an object that stores the state of the controls
// when you click on the controls, it changes the values therein
// you can reference this later in the program, for example while rendering
var controls_state = {
    "show_axis": true,
    "show_bounding_box": true,
    "ambient_light": true,
    "directional_light": true,
    "ambient_light_intensity": 1,
    "directional_light_intensity": 1,
    "coeff_alignment": 1,
    "coeff_cohesion": 1,
    "coeff_separation": 1,
    "n_boids": n_boids
};

gui.add(controls_state, 'show_axis')
    .onChange(function(on) {
        if (on) { container.add(axes.mesh);    } 
        else    { container.remove(axes.mesh); }
    });

gui.add(controls_state, 'show_bounding_box')
    .onChange(function(on) {
        if (on) { container.add(bounding_box);    } 
        else    { container.remove(bounding_box); }
    });

gui.add(controls_state, 'ambient_light')
    .onChange(function(on) {
        scene.getObjectByName('ambient_light').intensity = 1 * on;
    });

gui.add(controls_state, 'directional_light')
    .onChange(function(on) {
        scene.getObjectByName('directional_light').intensity = 1 * on;
    });

gui.add(controls_state, 'ambient_light_intensity', 0, 1)
    .onChange(function(value) {
        scene.getObjectByName('ambient_light').intensity = value;
    });

gui.add(controls_state, 'directional_light_intensity', 0, 1)
    .onChange(function(value) {
        scene.getObjectByName('directional_light').intensity = value;
    });

gui.add(controls_state, 'coeff_separation', 0, 10)
    .onChange(function(value) {
        for (var i = 0; i < boids.length; i++) {
            boids[i].coeff_separation = value;
        }
    });

gui.add(controls_state, 'coeff_alignment', 0, 10)
    .onChange(function(value) {
        
        for (var i = 0; i < boids.length; i++) {
            boids[i].coeff_alignment = value;
        }
    });

gui.add(controls_state, 'coeff_cohesion', 0, 10)
    .onChange(function(value) {
        
        for (var i = 0; i < boids.length; i++) {
            boids[i].coeff_cohesion = value;
        }
    });

gui.add(controls_state, 'n_boids', 0, 1000)
    .onChange(function(value) {

        n_boids = value;
        
        // grow array
        if(n_boids > boids.length){
            for (var i = 0; i < (n_boids - boids.length); i++) {
                var b = new Boid(scene_width, scene_height);
                b.create_mesh();         // defined in boids_prototypes_for_three.js
                container.add(b.mesh);
                boids.push(b);
            }
        } 

        // shorten array
        else if(boids.length > n_boids){
            // boids = boids.slice(0, n_boids);
            for (var i = (boids.length - 1); i > n_boids; i--) {
                b = boids[i];
                container.remove(b.mesh);
                boids = boids.slice(0, i);
            }
        }
    });

// ------------------------------------------------------------------------------------------------
// animation loop

function animate() {
    // start stats recording
    stats.begin();

    // render boids
    for (var i = 0; i < boids.length; i++) {
        b = boids[i];
        b.run(boids);     // update the position of each boid (data)
        b.update_mesh();  // update the position of the mesh (data --> visual)
    }

    // render scene
    renderer.render(scene, camera);

    // end stats recording
    stats.end();

    // run again
    requestAnimationFrame(animate);
}


// start visualization
requestAnimationFrame(animate);

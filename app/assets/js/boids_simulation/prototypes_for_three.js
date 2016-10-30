console.warn("------------------- boids_simulation/prototypes_for_three.js START -------------------");

// ---------------------------------------------------------
// Boid Render Prototype Methods

Boid.prototype.create_mesh = function() {
    // point our arrow at 1,1,1 to initialize, move the arrow to it's starting position
    this.mesh = new THREE.ArrowHelper(new THREE.Vector3(1,1,1), this.position, 1, 0xffffff);

    // set the arrow thickness
    this.mesh.line.material.linewidth = 2;

    // set the lenght of the stem, length of the arrow head cone, and width of the arrow head cone
    this.mesh.setLength(65,15,10);
}


console.warn("Action Required: In boids_simulation/prototypes_for_three.js line 39, set the position of the arrow mesh to the position of the boid.");


Boid.prototype.update_mesh = function() {

    // direct is a vector computed as new position - last position, normalized
    var position_last = this.mesh.position;
    var position_current = this.position;
    var direction = new THREE.Vector3().subVectors(position_current, position_last).normalize();
    this.mesh.setDirection(direction);

    
    /**
        * Action Required: update the new position of the mesh to the current position of the boid in xyz space
        * This is the most important step; here you bind the data to the visual element.  (data --> visual)
        *   Again, Boid is the data and the mesh is the visual representation, 
        *   and hence you bind the position of the boids (data) to the position of the mesh (visual)
        * hint: this.position.x is the current x location of the boid (data)
        * hint: this.mesh.position.set() takes in 3 parameters: x,y,z. You should probably make these equal to the x,y,z position of the data.
    **/

    this.mesh.position.set(0,0,0); // replace 0,0,0 with something

    /* end action required section */

    
    // calculate net velocity and apply it to the color
    var net_velocity = this.velocity.length() / this.velocity_max;
    this.mesh.cone.material.color.setHSL(net_velocity, 1, .5);
    this.mesh.line.material.color.setHSL(net_velocity, 1, .5);
}

console.warn("------------------- boids_simulation/prototypes_for_three.js END -------------------"); console.log("");
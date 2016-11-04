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


Boid.prototype.update_mesh = function() {

    // direct is a vector computed as new position - last position, normalized
    var position_last = this.mesh.position;
    var position_current = this.position;
    var direction = new THREE.Vector3().subVectors(position_current, position_last).normalize();
    this.mesh.setDirection(direction);
    this.mesh.position.set(this.position.x,this.position.y,this.position.z); // replace 0,0,0 with something

    
    // calculate net velocity and apply it to the color
    var net_velocity = this.velocity.length() / this.velocity_max;
    this.mesh.cone.material.color.setHSL(net_velocity, 1, .5);
    this.mesh.line.material.color.setHSL(net_velocity, 1, .5);
}
// A spherical tree crown.
function SphericalCrown(radius, position) {
	this.radius = radius;
	this.position = position;
	var extent = Math.sqrt(radius*radius+radius*radius+radius*radius);
	this.min = new THREE.Vector3(position.x - extent, position.y - extent, position.z - extent);
	this.extent = new THREE.Vector3(extent*2, extent*2, extent*2);
}

SphericalCrown.prototype.distance = function(x,y,z) {
	x = x - this.position.x;
	y = y - this.position.y;
	z = z - this.position.z;
	return Math.sqrt(x*x+y*y+z*z) - this.radius;
}

SphericalCrown.prototype.createDebugMesh = function() {
	var geometry = new THREE.SphereGeometry( this.radius );
	var material = new THREE.MeshBasicMaterial( { color: 0xFF0000, wireframe: true } );
	var mesh = new THREE.Mesh( geometry, material );
	mesh.position = this.position;
	return mesh;
}
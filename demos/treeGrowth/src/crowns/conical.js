// A conical tree crown.
function ConicalCrown(radius, height, position) {
	this.radius = radius;
	this.height = height;
	this.position = position;
	var extent = Math.sqrt(radius*radius+radius*radius);
	this.min = new THREE.Vector3(position.x - extent, position.y, position.z - extent);
	this.extent = new THREE.Vector3(extent*2, height, extent*2);
}

ConicalCrown.prototype.distance = function(x,y,z) {
	x = x - this.position.x;
	y = y - this.position.y;
	z = z - this.position.z;
	var q = Math.sqrt(x*x+z*z);
	return q - (1.0 - y / this.height) * this.radius;
}

ConicalCrown.prototype.createDebugMesh = function() {
	var geometry = new THREE.CylinderGeometry( 0.0, this.radius, this.height );
	var material = new THREE.MeshBasicMaterial( { color: 0xFF0000, wireframe: true } );
	var mesh = new THREE.Mesh( geometry, material );
	mesh.position = new THREE.Vector3(this.position.x, this.position.y + this.height/2, this.position.z);
	return mesh;
}
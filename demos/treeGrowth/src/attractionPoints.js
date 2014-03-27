// Attraction point	
function AttractionPoint(pos) {
	this.position = pos;
	this.stepUsed = -1;
}

// AttractionPoint.generate
// Generates a set of N attraction points inside of the given crown
AttractionPoint.generate = function(crown, n, distanceLimit) {
	var result = [];
	
	if(distanceLimit) {
		distanceLimit = -distanceLimit;
		for(var i = 0; i < n; ) {
			var x = Math.random() * crown.extent.x + crown.min.x;
			var y = Math.random() * crown.extent.y + crown.min.y;
			var z = Math.random() * crown.extent.z + crown.min.z;
			var dist = crown.distance(x,y,z);
			if(dist <= 0.0 && dist >= distanceLimit) {
				result.push(new AttractionPoint(new THREE.Vector3(x, y, z)));
				++i; 
			}
		}
	} else {
		for(var i = 0; i < n; ) {
			var x = Math.random() * crown.extent.x + crown.min.x;
			var y = Math.random() * crown.extent.y + crown.min.y;
			var z = Math.random() * crown.extent.z + crown.min.z;
			var dist = crown.distance(x,y,z);
			if(dist <= 0.0) {
				result.push(new AttractionPoint(new THREE.Vector3(x, y, z)));
				++i; 
			}
		}	
	}
	return result;
}
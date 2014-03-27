// This is the space colonization algorithm
function spaceColonization(segments, points, step, segmentLength, influenceRadius, killDistance, tropismInfluenceVector) {
	
	// Foreach point find closest segment and record in segment's influence points	
	for(var i = 0; i < points.length; ++i) {
		if(points[i].stepUsed !== -1) continue;
		var mindist = -1;
		var closestSegment = null;
		for(var j = 0; j < segments.length; ++j) {
			var dist = segments[j].end.distanceTo(points[i].position);
			if(dist <= influenceRadius) {
				if(dist < mindist || closestSegment === null) {
					mindist = dist;
					closestSegment = segments[j];
				}
			}
		}
		if(closestSegment)
			closestSegment.influencePoints.push(points[i]);
	}
	
	// Foreach non empty segment's influence set find average direction
	// to its influence points and create a child segment
	var segL = segments.length;
	for(var i = 0; i < segL; ++i) {
		// Skip nodes which aren't influenced by attraction points
		if(segments[i].influencePoints.length === 0)
			continue;
		
		// Compute the averageDirection vector
		var averageDirection = new THREE.Vector3(0,0,0);
		for(var j = 0; j < segments[i].influencePoints.length; ++j) {
			var dir = new THREE.Vector3();
			dir.copy(segments[i].influencePoints[j].position);
			dir.sub(segments[i].end);
			dir.normalize();
			averageDirection.add(dir);
		}
		
		// Apply the bias vector to the averageDirection
		// which accounts for the tropism
		averageDirection.add(tropismInfluenceVector);
		
		// Normalize the averageDirection 
		// and scale it by appropriate distance
		averageDirection.setLength(segmentLength);
		
		// Compute the end point of a new node
		// by adding the length to the end point of the parent node
		averageDirection.add(segments[i].end);
		
		// Create a new tree node
		var seg = new BranchSegment(segments[i].end, averageDirection, step);
		segments[i].children.push(seg);
		segments[i].influencePoints = [];
		segments.push(seg);
	}
	
	// Remove points which are within the killing distance
	for(var i = 0; i < points.length; ++i) {
		if(points[i].stepUsed !== -1) continue;
		for(var j = 0; j < segments.length; ++j) {
			if(segments[j].end.distanceTo(points[i].position) <= killDistance) {
				points[i].stepUsed = step;
				break;
			}
		}
	}
	return segments;
}

// Relocates nodes
// This is a post processing step which reduces the branching angles
function relocateNodes(node, parent) {
	for(var i = 0; i < node.children.length; ++i) {
		relocateNodes(node.children[i], node);
	}
	
	if(parent) {
		var dir = new THREE.Vector3();
		dir.copy(node.start);
		dir.sub(node.end);
		dir.setLength(dir.length()*0.5);
		node.end.add(dir);
		for(var i = 0; i < node.children.length; ++i) {
			node.children[i].start = node.end;
		}
	}
}
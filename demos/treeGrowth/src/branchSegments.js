// Represents a node of a tree
function BranchSegment(start, end, step) {
	this.start = start;
	this.end = end;
	this.influencePoints = [];
	this.children = [];
	this.stepCreated = step;
	this.radius = 0;
	this.distance = 0;
	this.tesselationInfo = null;
	this.foliage = [];
}
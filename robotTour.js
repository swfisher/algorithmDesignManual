// lets say the points are in a 100x100 section of a plane.
// to do: make function to measure length of a tour.
// implement heuristic 2.

const getRandomPointSet = (xMin,xMax,yMin,yMax,size) => {
	let s = new Set();	
	for(i = 0; i < size; i++){
		let xVal = Math.random()*(xMax-xMin) + xMin;	
		let yVal = Math.random()*(yMax-yMin) + yMin;
		s.add({x:xVal,y:yVal});
	};
	return s;
};

const s1 = new Set([{x:50,y:50},{x:15,y:75},{x:20,y:40}]);
const s2 = new Set([{x:0,y:100}]);

let a = getRandomPointSet(0,100,0,100,3);
console.log(a);

//idea: always visit the closest neighbor
//expects a pointSet
//returns a pointArray sorted in the order of the tour. 
//ex: nearestNeighbor(new Set({x:1,y:2}))
const nearestNeighbor = (pointSet,pointArray=[]) => {
	if(pointSet.size === 0){
		return pointArray;
	} else if(pointArray.length === 0){
		let point = Array.from(pointSet)[0]
		pointArray.push(point);	
		pointSet.delete(point);
		return nearestNeighbor(pointSet,pointArray);
	} else {
		//get nearest neighbor to the end element of pointArray and add it. 
		let point = pointArray[pointArray.length-1]; 	
		let minimumDistance = Number.POSITIVE_INFINITY;
		let bestNeighbor;
		for(let neighbor of pointSet.values()){
			let distance = Math.sqrt(
				Math.pow((point.x-neighbor.x),2) +
				Math.pow((point.y-neighbor.y),2)
			); 
			if(distance < minimumDistance){
				minimumDistance = distance;
				bestNeighbor = neighbor;
			}
		}
		pointArray.push(bestNeighbor);
		pointSet.delete(bestNeighbor);
		return nearestNeighbor(pointSet,pointArray);
	}
}

console.log(nearestNeighbor(a));


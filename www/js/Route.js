function Route(start, finish){
	this.start = start;
	this.finish = finish;
	this.stops = [];
}

Route.prototype.addStop = function(stop){
	this.stops.push(stop);
};
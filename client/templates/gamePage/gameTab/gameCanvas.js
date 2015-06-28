Template.gameCanvas.helpers({
});

Template.gameCanvas.events({
});

Template.gameCanvas.onRendered(function(){
		document.getElementById("score").innerHTML = 20;
		var stage = new createjs.Stage("playingField");
		var shape = new createjs.Shape();
		shape.graphics.beginFill("#f00").drawCircle(16,16,32);
		shape.x=50;
		shape.y=50;
		stage.addChild(shape);
	/*	var canvas = document.getElementById("playingField");
		var ctx = canvas.getContext("2d");
		ctx.fillStyle = "#FF0000";
		ctx.fillRect(300, 0, 50, 50);
	*/
});
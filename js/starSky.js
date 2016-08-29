var CANVAS_WIDTH = document.body.clientWidth,
    CANVAS_HEIGHT = document.body.clientHeight,
    starCount = 10,
    stars = [];
const colors = ['#FFFF66','FFCC33','#CC9900'];
window.onload = function() {

	var canvas = document.getElementById("canvas");
	var context = canvas.getContext('2d');

	canvas.width = CANVAS_WIDTH;
	canvas.height = CANVAS_HEIGHT;



	setInterval(function(){
		initDrawStar(context, starCount);
		updata();
	},1000);
	
}
	function updata(){
	 
		for (var i=0;i<stars.length;i++) {
			stars[i].x += stars[i].vx;
			stars[i].y += stars[i].vy;
			stars[i].vy += stars[i].g;
		}
		var cot = 0;
		for (var i=0;i<stars.length;i++) {
			if (stars[i].y<CANVAS_HEIGHT && stars[i].x<CANVAS_WIDTH)
				stars[cot++] = stars[i];

			while (stars.length > cot || stars.length > 100) {
				stars.pop();
			}
		}

		console.log(stars.length);
	}
	function initDrawStar ( context,starCount){
		context.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
		renderBackGround(context);
		drawMoon(context);
		drawMount(context);
		for (var i=0;i<starCount;i++) {
				var aStar = {
					R:Math.random()*10+5,
					x:Math.random()*CANVAS_WIDTH,
					y:Math.random()*CANVAS_HEIGHT*0.6,
					g:Math.random()*0.5,
    				vx:Math.pow(-1,Math.ceil(Math.random()*10))*4,
    				vy:-5,
					rot:Math.random()*360,
					color:colors[Math.floor(Math.random()*colors.length)]
				}
				stars.push(aStar);
			}
		showStars(context);
	}
	function drawMount(cxt){
		cxt.save();
		cxt.fillStyle = '#336633';
		cxt.beginPath();
		cxt.moveTo(0,CANVAS_HEIGHT);
		cxt.lineTo(0,CANVAS_HEIGHT-200);
		cxt.bezierCurveTo(740,800,540,100,CANVAS_WIDTH,CANVAS_HEIGHT-100);
		cxt.lineTo(CANVAS_WIDTH,CANVAS_HEIGHT);
		cxt.closePath();
		cxt.fill();
		cxt.restore();
	}
	function drawMoon(cxt) {
		var circleX = CANVAS_WIDTH/3*2;
		var circleY = CANVAS_HEIGHT/3;
		var r = 100;

		cxt.save();
		cxt.fillStyle = '#ffbb55';
		cxt.beginPath();
		cxt.arc(circleX,circleY,r,Math.PI*0.5,Math.PI*1.5,true);
		cxt.moveTo(circleX,circleY-r);
		cxt.arcTo(circleX+400,circleY,circleX,circleY+r,caculate(circleX,circleY-r,circleX+400,circleY)*r/400);
		cxt.fill();
		cxt.closePath();
		cxt.restore();

	}
	function caculate(x1,y1,x2,y2){
		return Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
	}
	function renderBackGround(context){
		var lineGrad = context.createLinearGradient(0,0,0,CANVAS_HEIGHT);
		lineGrad.addColorStop(0.0,'#000000');
		lineGrad.addColorStop(1.0,'#0000FF');
		context.fillStyle = lineGrad;
		context.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
	}
	function showStars(context ){
		for (var i=0,len=stars.length;i<len;i++) {
			context.fillStyle = stars[i].color;
			context.beginPath();
			drawStar(context,stars[i].R,stars[i].x,stars[i].y,stars[i].rot);
			context.closePath();
			context.fill();
		}
	}
	function drawStar ( context,R ,driftX,driftY,rot) {
		for (var i=0;i<5;i++) {
			context.lineTo(Math.cos((18 + i*72 - rot)/180*Math.PI)*R +driftX,
							-Math.sin((18 +i*72 - rot)/180*Math.PI)*R+driftY);
			context.lineTo(Math.cos((54 + i*72 - rot)/180*Math.PI)*R/2 +driftX,
							-Math.sin((54 + i*72 - rot)/180*Math.PI)*R/2 +driftY);
		}
	}
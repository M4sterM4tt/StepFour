
// Step Four

// NEED TO REFRENCE THIS https://developer.mozilla.org/en-US/docs/Web/API/Detecting_device_orientation
// NEED TO REFRENCE THIS https://mobiforge.com/design-development/html5-mobile-web-canvas
// NEED TO REFRENCE THIS https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model/Managing_screen_orientation


// Canvas Variables 
var canvas; 
var body;


// Image Variables
var level; 
var otherAssets;


// Location Variables
var playerPositionX;
var playerPositionY;
var playerVelocityX;
var playerVelocityY;
var playerAccelerationX;
var playerAccelerationY;


var enemyType;
var enemyPositionX;
var enemyPositionY;
var enemyVelocityX;
var enemyVelocityY;
var enemyAccelerationX;
var enemyAccelerationY;


// Other Variables
var renderTime;
var loop;
var loopTwo;


window.onload = function() {
	
	// Canvas and Graphics context
	canvas = document.getElementById("canvas");
    canvas.width = (9/10)*window.innerWidth;
    canvas.height = (9/10)*window.innerHeight;
	body = canvas.getContext("2d");
	
	
	// Images and variables for Images
	level = document.getElementById("levelBase");
	otherAssets = [document.getElementById("playerGoal"), document.getElementById("playerBall"), document.getElementById("enemyHole"), document.getElementById("enemyBall")];
	
	
	// Location Variables
	playerPositionX = [canvas.width/4,canvas.width/2];
	playerPositionY = [canvas.width/4,canvas.width/2];
	playerVelocityX = 0;
	playerVelocityY = 0;
	playerAccelerationX = 0;
	playerAccelerationY = 0;
	
	
	enemyType = [2,2,3,2,3];
	enemyPositionX = [canvas.width/8,canvas.width/8 + canvas.width/20,canvas.width/2 + 2*canvas.width/20,canvas.width/8 + 2*canvas.width/20,canvas.width/2 + 4*canvas.width/20];
	enemyPositionY = [canvas.width/8,canvas.width/8 + canvas.width/20,canvas.width/8 + 2*canvas.width/20,canvas.width/8 + canvas.width/20,canvas.width/8 + 2*canvas.width/20];
	enemyVelocityX = [0,0,0,0,0];
	enemyVelocityY = [0,0,0,0,0];
	enemyAccelerationX = [0,0,0,0,0];
	enemyAccelerationY = [0,0,0,0,0];

	
	body.beginPath();	
	body.drawImage(level,0,0,canvas.width,canvas.height);
	body.drawImage(otherAssets[0],playerPositionX[0],playerPositionY[0],canvas.width/20,canvas.width/20);	
	body.drawImage(otherAssets[1],playerPositionX[1],playerPositionY[1],canvas.width/20,canvas.width/20);	


	for(loop = 0; loop < enemyType.length; loop+=1) {
		body.beginPath();
		body.drawImage(otherAssets[enemyType[loop]],enemyPositionX[loop],enemyPositionY[loop],canvas.width/20,canvas.width/20);
	}
	
	
	// Setting Intervals
	renderTime = 1;
	window.setInterval(render,renderTime);
	render();
	
}


function render() {
	
	window.ondevicemotion = function(deviceMotionEvent) {
		
		if (playerAccelerationX/playerAccelerationX == deviceMotionEvent.accelerationIncludingGravity/deviceMotionEvent.accelerationIncludingGravity) {
			playerAccelerationX = (1/40)*deviceMotionEvent.accelerationIncludingGravity.y;
		}
		else {
			playerAccelerationX = (1/80)*deviceMotionEvent.accelerationIncludingGravity.y;
		}
	
		if (playerAccelerationY/playerAccelerationY == deviceMotionEvent.accelerationIncludingGravity/deviceMotionEvent.accelerationIncludingGravity) {
			playerAccelerationY = (1/40)*deviceMotionEvent.accelerationIncludingGravity.x;
		}
		else {
			playerAccelerationY = (1/80)*deviceMotionEvent.accelerationIncludingGravity.x;
		}
		
		
		for(loop = 0; loop < enemyType.length; loop+=1) {
			
			if (enemyType[loop] == 3) {
			
				if (enemyAccelerationX[loop]/enemyAccelerationX[loop] == deviceMotionEvent.accelerationIncludingGravity/deviceMotionEvent.accelerationIncludingGravity) {
					enemyAccelerationX[loop] = (1/50)*deviceMotionEvent.accelerationIncludingGravity.y;
				}
				else {
					enemyAccelerationX[loop] = (1/100)*deviceMotionEvent.accelerationIncludingGravity.y;
				}
	
	
				if (enemyAccelerationY[loop]/enemyAccelerationY[loop] == deviceMotionEvent.accelerationIncludingGravity/deviceMotionEvent.accelerationIncludingGravity) {
					enemyAccelerationY[loop] = (1/50)*deviceMotionEvent.accelerationIncludingGravity.x;
				}
				else {
					enemyAccelerationY[loop] = (1/100)*deviceMotionEvent.accelerationIncludingGravity.x;
				}
			
			}
			
		}
		
	}
	
	
	playerVelocityX = playerVelocityX + playerAccelerationX;
	playerVelocityY = playerVelocityY + playerAccelerationY;
	playerPositionX[1] = playerPositionX[1] + (1/4)*playerVelocityX;
	playerPositionY[1] = playerPositionY[1] + (1/4)*playerVelocityY;
	
	
	for(loop = 0; loop < enemyType.length; loop+=1) {
		
		if (enemyType[loop] == 2 || enemyType[loop] == 3) {
			
			
			enemyVelocityX[loop] = enemyVelocityX[loop] + enemyAccelerationX[loop];
			enemyVelocityY[loop] = enemyVelocityY[loop] + enemyAccelerationY[loop];
			enemyPositionX[loop] = enemyPositionX[loop] + (1/5)*enemyVelocityX[loop];
			enemyPositionY[loop] = enemyPositionY[loop] + (1/5)*enemyVelocityY[loop];
		
		
			if ( (playerPositionX[1] <= enemyPositionX[loop] + canvas.width/30 && playerPositionX[1] >= enemyPositionX[loop] - canvas.width/30) && (playerPositionY[1] <= enemyPositionY[loop] + canvas.width/30 && playerPositionY[1] >= enemyPositionY[loop] - canvas.width/30) ) {
				alert ("You are Dead");
				alert ("Enemy Values" + enemyType[0] + " " + enemyType[1] + " " + enemyType[2] + " " + enemyType[3] + " " + enemyType[4]);
				enemyPositionX[loop] = canvas.width - enemyPositionX[loop];
				enemyPositionY[loop] = canvas.height - enemyPositionY[loop];
			}
		
		
			if (enemyPositionX[loop] >  canvas.width - (1/20)*canvas.width) {
				enemyPositionX[loop] =  canvas.width - (1/20)*canvas.width;
				enemyVelocityX[loop] =  (-1/2)*enemyVelocityX[loop];
				enemyVelocityY[loop] =  (-1/2)*enemyVelocityY[loop];
			}
			else if (enemyPositionX[loop] < 0) {
				enemyPositionX[loop] =  0;
				enemyVelocityX[loop] =  (-1/2)*enemyVelocityX[loop];
				enemyVelocityY[loop] =  (-1/2)*enemyVelocityY[loop];
			}
	
	
			if (enemyPositionY[loop] >  canvas.height - (1/10)*canvas.height) {
				enemyPositionY[loop] =  canvas.height - (1/10)*canvas.height;
				enemyVelocityX[loop] =  (-1/2)*enemyVelocityX[loop];
				enemyVelocityY[loop] =  (-1/2)*enemyVelocityY[loop];
			}
			else if (enemyPositionY[loop] < 0) {
				enemyPositionY[loop] =  0;
				enemyVelocityX[loop] =  (-1/2)*enemyVelocityX[loop];
				enemyVelocityY[loop] =  (-1/2)*enemyVelocityY[loop];
			}
	
	
			if (enemyType[loop] == 3) {
			
				for(loopTwo = 0; loopTwo < enemyType.length; loopTwo+=1) {
				
					if ( (enemyPositionX[loop] <= enemyPositionX[loopTwo] + canvas.width/30 && enemyPositionX[loop] >= enemyPositionX[loopTwo] - canvas.width/30) && (enemyPositionY[loop] <= enemyPositionY[loopTwo] + canvas.width/30 && enemyPositionY[loop] >= enemyPositionY[loopTwo] - canvas.width/30) && enemyType[loopTwo] == 2) {
						enemyType[loop] = 4;
						alert ("Enemy Ball has been Killed" + enemyType[0] + " " + enemyType[1] + " " + enemyType[2] + " " + enemyType[3] + " " + enemyType[4]);
					}
			
				}
			
			}
			
		}
		
	}	
	
	
	if ( (playerPositionX[1] <= playerPositionX[0] + canvas.width/40 && playerPositionX[1] >= playerPositionX[0] - canvas.width/40) && (playerPositionY[1] <= playerPositionY[0] + canvas.width/40 && playerPositionY[1] >= playerPositionY[0] - canvas.width/40) ) {
		alert ("GOALLLLLLL!!!!!!!")
		playerPositionX[0] = canvas.width - playerPositionX[0];
		playerPositionY[0] = canvas.height - playerPositionY[0];
	}
	
	
	if (playerPositionX[1] >  canvas.width - (1/20)*canvas.width) {
		playerPositionX[1] =  canvas.width - (1/20)*canvas.width;
		playerVelocityX =  (-1/4)*playerVelocityX;
		playerVelocityY =  (-1/4)*playerVelocityY;
	}
	else if (playerPositionX[1] < 0) {
		playerPositionX[1] =  0;
		playerVelocityX =  (-1/4)*playerVelocityX;
		playerVelocityY =  (-1/4)*playerVelocityY;
	}
	
	
	if (playerPositionY[1] >  canvas.height - (1/10)*canvas.height) {
		playerPositionY[1] =  canvas.height - (1/10)*canvas.height;
		playerVelocityX =  (-1/4)*playerVelocityX;
		playerVelocityY =  (-1/4)*playerVelocityY;
	}
	else if (playerPositionY[1] < 0) {
		playerPositionY[1] =  0;
		playerVelocityX =  (-1/4)*playerVelocityX;
		playerVelocityY =  (-1/4)*playerVelocityY;
	}
	
	
	body.beginPath();
	body.clearRect(0,0,canvas.width,canvas.height);
	body.drawImage(level,0,0,canvas.width,canvas.height);
	body.drawImage(otherAssets[0],playerPositionX[0],playerPositionY[0],canvas.width/20,canvas.width/20);
	body.drawImage(otherAssets[1],playerPositionX[1],playerPositionY[1],canvas.width/20,canvas.width/20);
		
	for(loop = 0; loop < enemyType.length; loop+=1) {
		
		if (enemyType[loop] == 2 || enemyType[loop] == 3) {
	
			body.beginPath();
			body.drawImage(otherAssets[enemyType[loop]],enemyPositionX[loop],enemyPositionY[loop],canvas.width/20,canvas.width/20);
			
		}
	
	}
	
}

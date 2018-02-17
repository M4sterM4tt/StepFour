
// Step Four

// NEED TO REFRENCE THIS https://developer.mozilla.org/en-US/docs/Web/API/Detecting_device_orientation
// NEED TO REFRENCE THIS https://mobiforge.com/design-development/html5-mobile-web-canvas
// NEED TO REFRENCE THIS https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model/Managing_screen_orientation
// NEED TO REFRENCE THIS https://www.w3schools.com/tags/ref_eventattributes.asp
// NEED TO REFRENCE THIS http://bencentra.com/code/2014/12/05/html5-canvas-touch-events.html

// Canvas Variables 
var canvas; 
var body;


// Image Variables
var level; 
var otherAssets;
var wallAssets;


// Player Variables
var playerPositionX;
var playerPositionY;
var playerVelocityX;
var playerVelocityY;
var playerAccelerationX;
var playerAccelerationY;


// Enemy Variables
var enemyType;
var enemyPositionX;
var enemyPositionY;
var enemyVelocityX;
var enemyVelocityY;
var enemyAccelerationX;
var enemyAccelerationY;


// Wall Variables
var wallType;
var wallDefaultType;
var wallPositionX;
var wallPositionY;
var wallVelocityX;
var wallVelocityY;
var wallAccelerationX;
var wallAccelerationY;
var wallAccelerationZ;


// Other Variables
var renderTime;
var limit;
var limitTwo;
var switcher;
var previous;
var previousTwo;
var breaker;
var touch;
var loop;
var loopTwo;
var loopThree;
var loopFour;


window.onload = function() {
	
	
	// Canvas, Body and Graphics context
	canvas = document.getElementById("canvas");
    canvas.width = (9/10)*window.innerWidth;
    canvas.height = (9/10)*window.innerHeight;
	body = canvas.getContext("2d");
	
	
	// Images and Variables for Images
	level = document.getElementById("levelBase");
	otherAssets = [document.getElementById("playerGoal"), document.getElementById("playerBall"), document.getElementById("enemyHole"), document.getElementById("enemyBall")];
	wallAssets = [document.getElementById("wallBase"), document.getElementById("wallArrowShake"), document.getElementById("wallArrowTilt"), document.getElementById("wallArrowTouch"), document.getElementById("wallCloudShake"), document.getElementById("wallCloudTilt"), document.getElementById("wallCloudTouch")];
	
	
	// Player Variables
	playerPositionX = [canvas.width/4,canvas.width/2];
	playerPositionY = [canvas.width/4,canvas.width/2];
	playerVelocityX = 0;
	playerVelocityY = 0;
	playerAccelerationX = 0;
	playerAccelerationY = 0;
	
	
	// Enemy Variables
	enemyType = [2,2,2,2,3];
	enemyPositionX = [canvas.width/8,canvas.width/8 + canvas.width/20,canvas.width/2 + 2*canvas.width/20,canvas.width/8 + 2*canvas.width/20,canvas.width/2 + 4*canvas.width/20];
	enemyPositionY = [canvas.width/8,canvas.width/8 + canvas.width/20,canvas.width/8 + 2*canvas.width/20,canvas.width/8 + canvas.width/20,canvas.width/8 + 2*canvas.width/20];
	enemyVelocityX = [0,0,0,0,0];
	enemyVelocityY = [0,0,0,0,0];
	enemyAccelerationX = [0,0,0,0,0];
	enemyAccelerationY = [0,0,0,0,0];

	
	// Wall Variables
	wallType = [0,1,2,3,4,5,6];
	wallDefaultType = [0,1,2,3,4,5,6];
	wallPositionX = [canvas.width - canvas.width/20,canvas.width - canvas.width/20,canvas.width - canvas.width/20,canvas.width - canvas.width/20,canvas.width - canvas.width/20,canvas.width - canvas.width/20,canvas.width - canvas.width/20];
	wallPositionY = [canvas.width/20,2*canvas.width/20,3*canvas.width/20,4*canvas.width/20,5*canvas.width/20,6*canvas.width/20,7*canvas.width/20];
	wallVelocityX = [0,0,0,0,0,0,0];
	wallVelocityY = [0,0,0,0,0,0,0];
	wallAccelerationX = [0,0,0,0,0,0,0];
	wallAccelerationY = [0,0,0,0,0,0,0];
	wallAccelerationZ = [0,0,0,0,0,0,0];
	limit = 0;
	limitTwo = 0;
	switcher = 1;
	previous = 1;
	previousTwo = 1;
	breaker = 1;
	touch = 0;
	
	
	// Add Base and Player
	body.beginPath();	
	body.drawImage(level,0,0,canvas.width,canvas.height);
	body.drawImage(otherAssets[0],playerPositionX[0],playerPositionY[0],canvas.width/20,canvas.width/20);	
	body.drawImage(otherAssets[1],playerPositionX[1],playerPositionY[1],canvas.width/20,canvas.width/20);
	
	
	// Add Enemies
	for(loop = 0; loop < enemyType.length; loop+=1) {
		body.beginPath();
		body.drawImage(otherAssets[enemyType[loop]],enemyPositionX[loop],enemyPositionY[loop],canvas.width/20,canvas.width/20);
	}
	
	
	// Add Walls
	for(loop = 0; loop < wallType.length; loop+=1) {
		body.beginPath();
		body.drawImage(wallAssets[wallType[loop]],wallPositionX[loop],wallPositionY[loop],canvas.width/20,canvas.width/20);
	}
	
	
	// Setting Intervals
	renderTime = 1;
	window.setInterval(render,renderTime);
	render();
	
	
}



// Main Function
function render() {
	
	
	// Motion Function
	window.ondevicemotion = function(deviceMotionEvent) {
		
		
		// Player Acceleration
		if ( playerAccelerationX/(Math.abs(playerAccelerationX)) == deviceMotionEvent.accelerationIncludingGravity.y/(Math.abs(deviceMotionEvent.accelerationIncludingGravity.y)) ) {
			playerAccelerationX = (1/40)*deviceMotionEvent.accelerationIncludingGravity.y;
		}
		else {
			playerAccelerationX = (1/80)*deviceMotionEvent.accelerationIncludingGravity.y;
		}
		if ( playerAccelerationY/(Math.abs(playerAccelerationY)) == deviceMotionEvent.accelerationIncludingGravity.x/(Math.abs(deviceMotionEvent.accelerationIncludingGravity.x)) ) {
			playerAccelerationY = (1/40)*deviceMotionEvent.accelerationIncludingGravity.x;
		}
		else {
			playerAccelerationY = (1/80)*deviceMotionEvent.accelerationIncludingGravity.x;
		}
		
		
		// Enemy Acceleration
		for(loop = 0; loop < enemyType.length; loop+=1) {
			
			
			// Enemy Ball
			if (enemyType[loop] == 3) {
				if ( enemyAccelerationX[loop]/(Math.abs(enemyAccelerationX[loop])) == deviceMotionEvent.accelerationIncludingGravity.y/(Math.abs(deviceMotionEvent.accelerationIncludingGravity.y)) ) {
					enemyAccelerationX[loop] = (1/40)*deviceMotionEvent.accelerationIncludingGravity.y;
				}
				else {
					enemyAccelerationX[loop] = (1/80)*deviceMotionEvent.accelerationIncludingGravity.y;
				}		
				if ( enemyAccelerationY[loop]/(Math.abs(enemyAccelerationY[loop])) == deviceMotionEvent.accelerationIncludingGravity.x/(Math.abs(deviceMotionEvent.accelerationIncludingGravity.x)) ) {
					enemyAccelerationY[loop] = (1/40)*deviceMotionEvent.accelerationIncludingGravity.x;
				}
				else {
					enemyAccelerationY[loop] = (1/80)*deviceMotionEvent.accelerationIncludingGravity.x;
				}
			}		
		}
		
		
		// Wall Acceleration
		for(loop = 0; loop < wallType.length; loop+=1) {	

		
			// wallArrowShake
			if (wallDefaultType[loop] == 1) {
				if (Math.abs(wallAccelerationZ[loop] - deviceMotionEvent.accelerationIncludingGravity.z) > 3) {
					wallAccelerationX[loop] = -0.1;
				}
				else {
					wallAccelerationX[loop] =  0.01;
				}
				wallAccelerationZ[loop] = deviceMotionEvent.accelerationIncludingGravity.z;
			}
			
			
			// wallArrowTilt
			if (wallDefaultType[loop] == 2) {
				if ( wallAccelerationX[loop]/(Math.abs(wallAccelerationX[loop])) == deviceMotionEvent.accelerationIncludingGravity.y/(Math.abs(deviceMotionEvent.accelerationIncludingGravity.y)) ) {
					wallAccelerationX[loop] = (1/40)*deviceMotionEvent.accelerationIncludingGravity.y;
				}
				else {
					wallAccelerationX[loop] = (1/80)*deviceMotionEvent.accelerationIncludingGravity.y;
				}
			}
		
			
			// wallCloudShake
			if (wallDefaultType[loop] == 4) {
				for(loopTwo = 0; loopTwo < enemyType.length; loopTwo+=1) {
					if (Math.abs(wallAccelerationZ[loop] - deviceMotionEvent.accelerationIncludingGravity.z) < 3) {
						wallType[loop] = 7;
						limit = 1;
					}
					else if (((playerPositionX[1] >= wallPositionX[loop] + canvas.width/20 || playerPositionX[1] <= wallPositionX[loop] - canvas.width/20) && (playerPositionY[1] >= wallPositionY[loop] + canvas.width/20 || playerPositionY[1] <= wallPositionY[loop] - canvas.width/20)) && ((enemyPositionX[loopTwo] >= wallPositionX[loop] + canvas.width/20 || enemyPositionX[loopTwo] <= wallPositionX[loop] - canvas.width/20) && (enemyPositionY[loopTwo] >= wallPositionY[loop] + canvas.width/20 || enemyPositionY[loopTwo] <= wallPositionY[loop] - canvas.width/20))) {
						limit = limit - 0.01;
						if (limit < 0) {
							wallType[loop] = 4;
						}
					}	
				}
			}
			
			
			// wallCloudTilt
			if (wallDefaultType[loop] == 5) {
				for(loopTwo = 0; loopTwo < enemyType.length; loopTwo+=1) {
					if (Math.abs(previous) + Math.abs(previousTwo) < Math.abs(deviceMotionEvent.accelerationIncludingGravity.x) + Math.abs(deviceMotionEvent.accelerationIncludingGravity.y)) {
						switcher = -1*switcher;
						if (switcher == 1) {
							wallType[loop] = 7;
						}
						if (switcher == -1) {
							if (((playerPositionX[1] >= wallPositionX[loop] + canvas.width/20 || playerPositionX[1] <= wallPositionX[loop] - canvas.width/20) && (playerPositionY[1] >= wallPositionY[loop] + canvas.width/20 || playerPositionY[1] <= wallPositionY[loop] - canvas.width/20)) && ((enemyPositionX[loopTwo] >= wallPositionX[loop] + canvas.width/20 || enemyPositionX[loopTwo] <= wallPositionX[loop] - canvas.width/20) && (enemyPositionY[loopTwo] >= wallPositionY[loop] + canvas.width/20 || enemyPositionY[loopTwo] <= wallPositionY[loop] - canvas.width/20))) {
								wallType[loop] = 5;
							}
							else {
								wallType[loop] = 7;
							}
						}
					}
				}
				previous = deviceMotionEvent.accelerationIncludingGravity.x;
				previousTwo = deviceMotionEvent.accelerationIncludingGravity.y;
			}
		}	
	}
	
	
	// Sets Player Velocity and Position
	playerVelocityX = playerVelocityX + playerAccelerationX;
	playerVelocityY = playerVelocityY + playerAccelerationY;
	playerPositionX[1] = playerPositionX[1] + (1/4)*playerVelocityX;
	playerPositionY[1] = playerPositionY[1] + (1/4)*playerVelocityY;
	
	
	// Check to prevent Player from leaving the Canvas
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
	
	
	// Check to see if Player wins
	if ( (playerPositionX[1] < playerPositionX[0] + canvas.width/40 && playerPositionX[1] > playerPositionX[0] - canvas.width/40) && (playerPositionY[1] < playerPositionY[0] + canvas.width/40 && playerPositionY[1] > playerPositionY[0] - canvas.width/40) ) {
		alert ("GOALLLLLLL!!!!!!!");
		playerPositionX[0] = canvas.width - playerPositionX[0];
		playerPositionY[0] = canvas.height - playerPositionY[0];
	}
	
	
	// Enemy Mechanics
	for(loop = 0; loop < enemyType.length; loop+=1) {
		
		
		// The enemy must be alive.
		if (enemyType[loop] == 2 || enemyType[loop] == 3) {
			
			
			// Sets Enemy Velocity and Position.
			enemyVelocityX[loop] = enemyVelocityX[loop] + enemyAccelerationX[loop];
			enemyVelocityY[loop] = enemyVelocityY[loop] + enemyAccelerationY[loop];
			enemyPositionX[loop] = enemyPositionX[loop] + (1/4)*enemyVelocityX[loop];
			enemyPositionY[loop] = enemyPositionY[loop] + (1/4)*enemyVelocityY[loop];
		
		
			// Check to prevent Enemy from leaving the Canvas
			if (enemyPositionX[loop] >  canvas.width - (1/20)*canvas.width) {
				enemyPositionX[loop] =  canvas.width - (1/20)*canvas.width;
				enemyVelocityX[loop] =  (-1/4)*enemyVelocityX[loop];
				enemyVelocityY[loop] =  (-1/4)*enemyVelocityY[loop];
			}
			else if (enemyPositionX[loop] < 0) {
				enemyPositionX[loop] =  0;
				enemyVelocityX[loop] =  (-1/4)*enemyVelocityX[loop];
				enemyVelocityY[loop] =  (-1/4)*enemyVelocityY[loop];
			}
			if (enemyPositionY[loop] >  canvas.height - (1/10)*canvas.height) {
				enemyPositionY[loop] =  canvas.height - (1/10)*canvas.height;
				enemyVelocityX[loop] =  (-1/4)*enemyVelocityX[loop];
				enemyVelocityY[loop] =  (-1/4)*enemyVelocityY[loop];
			}
			else if (enemyPositionY[loop] < 0) {
				enemyPositionY[loop] =  0;
				enemyVelocityX[loop] =  (-1/4)*enemyVelocityX[loop];
				enemyVelocityY[loop] =  (-1/4)*enemyVelocityY[loop];
			}
			

			// IF Enemy hits Player/Goal.
			for(loopTwo = 0; loopTwo < playerPositionX.length; loopTwo+=1) {
				if ( (playerPositionX[loopTwo] < enemyPositionX[loop] + canvas.width/30 && playerPositionX[loopTwo] > enemyPositionX[loop] - canvas.width/30) && (playerPositionY[loopTwo] < enemyPositionY[loop] + canvas.width/30 && playerPositionY[loopTwo] > enemyPositionY[loop] - canvas.width/30) ) {
					enemyPositionX[loop] = canvas.width - enemyPositionX[loop];
					enemyPositionY[loop] = canvas.height - enemyPositionY[loop];	
					if (loopTwo == 1) {
						alert ("You are Dead");
					}
				}
			}
			
			
			// IF Enemy hits Wall.
			for(loopTwo = 0; loopTwo < wallType.length; loopTwo+=1) {
				if ( (enemyPositionX[loop] < wallPositionX[loopTwo] + canvas.width/20 && enemyPositionX[loop] > wallPositionX[loopTwo] - canvas.width/20) && (enemyPositionY[loop] < wallPositionY[loopTwo] + canvas.width/20 && enemyPositionY[loop] > wallPositionY[loopTwo] - canvas.width/20) && wallType[loopTwo] >= 0 && wallType[loopTwo] <= 6 ) {
					enemyPositionX[loop] = enemyPositionX[loop] - (1/2)*enemyVelocityX[loop];
					enemyPositionY[loop] = enemyPositionY[loop] - (1/2)*enemyVelocityY[loop];
					enemyVelocityX[loop] = (-1/2)*enemyVelocityX[loop];
					enemyVelocityY[loop] = (-1/2)*enemyVelocityY[loop];
					wallPositionX[loopTwo] = wallPositionX[loopTwo] - (1/4)*wallVelocityX[loopTwo];
					wallPositionY[loopTwo] = wallPositionY[loopTwo] - (1/4)*wallVelocityY[loopTwo];
					wallVelocityX[loopTwo] = (-1/4)*wallVelocityX[loopTwo];
					wallVelocityY[loopTwo] = (-1/4)*wallVelocityY[loopTwo];
				}
			}
	
	
			// IF Enemy Ball hits Enemy Hole.
			if (enemyType[loop] == 3) {
				for(loopTwo = 0; loopTwo < enemyType.length; loopTwo+=1) {
					if ( (enemyPositionX[loop] < enemyPositionX[loopTwo] + canvas.width/30 && enemyPositionX[loop] > enemyPositionX[loopTwo] - canvas.width/30) && (enemyPositionY[loop] < enemyPositionY[loopTwo] + canvas.width/30 && enemyPositionY[loop] > enemyPositionY[loopTwo] - canvas.width/30) && enemyType[loopTwo] == 2) {
						enemyType[loop] = 4;
						alert ("Enemy Ball has been Killed");
					}
				}
			}	
		}
	}	
	

	// Wall Mechanics
	for(loop = 0; loop < wallType.length; loop+=1) {
		
		
		// The wall must be alive.
		if (wallType[loop] >= 0 && wallType[loop] <= 6) {
			
			
			// Sets Wall Velocity and Position.
			wallVelocityX[loop] = wallVelocityX[loop] + wallAccelerationX[loop];
			wallVelocityY[loop] = wallVelocityY[loop] + wallAccelerationY[loop];
			wallPositionX[loop] = wallPositionX[loop] + (1/5)*wallVelocityX[loop];
			wallPositionY[loop] = wallPositionY[loop] + (1/5)*wallVelocityY[loop];
		
		
			// Check to prevent Wall from leaving the Canvas
			if (wallPositionX[loop] >  canvas.width - (1/20)*canvas.width) {
				wallPositionX[loop] =  canvas.width - (1/20)*canvas.width;
				wallVelocityX[loop] =  (-1/2)*wallVelocityX[loop];
				wallVelocityY[loop] =  (-1/2)*wallVelocityY[loop];
			}
			else if (wallPositionX[loop] < 0) {
				wallPositionX[loop] =  0;
				wallVelocityX[loop] =  (-1/2)*wallVelocityX[loop];
				wallVelocityY[loop] =  (-1/2)*wallVelocityY[loop];
			}
			if (wallPositionY[loop] >  canvas.height - (1/10)*canvas.height) {
				wallPositionY[loop] =  canvas.height - (1/10)*canvas.height;
				wallVelocityX[loop] =  (-1/2)*wallVelocityX[loop];
				wallVelocityY[loop] =  (-1/2)*wallVelocityY[loop];
			}
			else if (wallPositionY[loop] < 0) {
				wallPositionY[loop] =  0;
				wallVelocityX[loop] =  (-1/2)*wallVelocityX[loop];
				wallVelocityY[loop] =  (-1/2)*wallVelocityY[loop];
			}
			
			
			// IF Player/Goal hits Wall.	
			for(loopTwo = 0; loopTwo < playerPositionX.length; loopTwo+=1) {
				if ( (playerPositionX[loopTwo] < wallPositionX[loop] + canvas.width/20 && playerPositionX[loopTwo] > wallPositionX[loop] - canvas.width/20) && (playerPositionY[loopTwo] < wallPositionY[loop] + canvas.width/20 && playerPositionY[loopTwo] > wallPositionY[loop] - canvas.width/20) ) {
					playerPositionX[loopTwo] = playerPositionX[loopTwo] - (1/2)*playerVelocityX;
					playerPositionY[loopTwo] = playerPositionY[loopTwo] - (1/2)*playerVelocityY;
					playerVelocityX = (-1/2)*playerVelocityX;
					playerVelocityY = (-1/2)*playerVelocityY;	
					wallPositionX[loop] = wallPositionX[loop] - (1/2)*wallVelocityX[loop];
					wallPositionY[loop] = wallPositionY[loop] - (1/2)*wallVelocityY[loop];
					wallVelocityX[loop] = (-1/4)*wallVelocityX[loop];
					wallVelocityY[loop] = (-1/4)*wallVelocityY[loop];
				}
			}
		}	
	}	
	
	
	// Add Base and Player
	body.beginPath();
	body.clearRect(0,0,canvas.width,canvas.height);
	body.drawImage(level,0,0,canvas.width,canvas.height);
	body.drawImage(otherAssets[0],playerPositionX[0],playerPositionY[0],canvas.width/20,canvas.width/20);
	body.drawImage(otherAssets[1],playerPositionX[1],playerPositionY[1],canvas.width/20,canvas.width/20);
		
	
	// Add Enemies	
	for(loop = 0; loop < enemyType.length; loop+=1) {
		if (enemyType[loop] == 2 || enemyType[loop] == 3) {
			body.beginPath();
			body.drawImage(otherAssets[enemyType[loop]],enemyPositionX[loop],enemyPositionY[loop],canvas.width/20,canvas.width/20);
		}
	}
	
	
	// Add Walls
	for(loop = 0; loop < wallType.length; loop+=1) {
		if (wallType[loop] >= 0 && wallType[loop] <= 6) {	
			body.beginPath();
			body.drawImage(wallAssets[wallType[loop]],wallPositionX[loop],wallPositionY[loop],canvas.width/20,canvas.width/20);	
		}		
	}	
}




// wallArrowTouch Functions
window.addEventListener("touchstart", function wallArrowTouchStart(event) {
	event.preventDefault();
	touch = event.touches[0];
	breaker = 0;

	for(loopThree = 0; loopThree < wallType.length; loopThree+=1) {		

		// wallCloudTouch
		if (wallDefaultType[loopThree] == 6) {
			if (touch.pageX < wallPositionX[loopThree] + canvas.width/20 && touch.pageX > wallPositionX[loopThree] && touch.pageY < wallPositionY[loopThree] + canvas.width/20 && touch.pageY > wallPositionY[loopThree]) {			
				wallType[loopThree] = 7;			
			}		
		}	
	}		
	
});
window.addEventListener("touchmove", function wallArrowTouchMove(event) {
	event.preventDefault();
	touch = event.touches[0];
	for(loopThree = 0; loopThree < wallType.length; loopThree+=1) {	

		// wallArrowTouch
		if (wallDefaultType[loopThree] == 3 && breaker == 0) {
			if (touch.pageX < wallPositionX[loopThree] + 2*canvas.width/20 && touch.pageX > wallPositionX[loopThree] - canvas.width/20 && touch.pageY < wallPositionY[loopThree] + 2*canvas.width/20 && touch.pageY > wallPositionY[loopThree]  - canvas.width/20) {	
				wallPositionX[loopThree] = touch.pageX;	
			}
			
	
			// IF Player/Goal hits Wall.		
			for(loopFour = 0; loopFour < playerPositionX.length; loopFour+=1) {
				if ( (playerPositionX[loopFour] < wallPositionX[loopThree] + canvas.width/20 && playerPositionX[loopFour] > wallPositionX[loopThree] - canvas.width/20) && (playerPositionY[loopFour] < wallPositionY[loopThree] + canvas.width/20 && playerPositionY[loopFour] > wallPositionY[loopThree] - canvas.width/20) ) {
					playerPositionX[loopFour] = playerPositionX[loopFour] - (1/2)*playerVelocityX;
					playerPositionY[loopFour] = playerPositionY[loopFour] - (1/2)*playerVelocityY;
					playerVelocityX = (-1/2)*playerVelocityX;
					playerVelocityY = (-1/2)*playerVelocityY;	
					wallPositionX[loopThree] = wallPositionX[loopThree] + canvas.width/20*((wallPositionX[loopThree] - playerPositionX[loopFour])/Math.abs(wallPositionX[loopThree] - playerPositionX[loopFour]));
				}		
			}
			
			
			// IF Enemy hits Wall.
			for(loopFour = 0; loopFour < enemyType.length; loopFour+=1) {		
				if ( (enemyPositionX[loopFour] < wallPositionX[loopThree] + canvas.width/20 && enemyPositionX[loopFour] > wallPositionX[loopThree] - canvas.width/20) && (enemyPositionY[loopFour] < wallPositionY[loopThree] + canvas.width/20 && enemyPositionY[loopFour] > wallPositionY[loopThree] - canvas.width/20) && (enemyType[loopFour] == 2 || enemyType[loopFour] == 3)) {
					enemyPositionX[loopFour] = enemyPositionX[loopFour] - (1/2)*enemyVelocityX[loopFour];
					enemyPositionY[loopFour] = enemyPositionY[loopFour] - (1/2)*enemyVelocityY[loopFour];
					enemyVelocityX[loopFour] = (-1/2)*enemyVelocityX[loopFour];
					enemyVelocityY[loopFour] = (-1/2)*enemyVelocityY[loopFour];
					wallPositionX[loopThree] = wallPositionX[loopThree] + canvas.width/20*((wallPositionX[loopThree] - enemyPositionX[loopFour])/Math.abs(wallPositionX[loopThree] - enemyPositionX[loopFour]));	
				}		
			}
		}	
	}
});
window.addEventListener("touchend", function wallArrowTouchEnd(event) {
	event.preventDefault();
	breaker = 1;
});
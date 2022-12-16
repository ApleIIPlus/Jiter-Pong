//Made by Mohammad Kherfan, HosharProductions
//For questions, email mdkhaireden@gmail.com

let
	ballSize,
	ballX,
	ballY,
	force,
	xSpeed,
	ySpeed,
	gameStatus,
	loser,
	winner,
	blueY,
	redY,
	middle,
	score,
	highScore,
	keyFlag,
	jitter;

function setup() {
	createCanvas(windowWidth - 20, windowHeight - 80);
	background(0);
	middle = width / 2;
	//
	jitter = 5;
	//
	gameStatus = 0;

	ballX = width / 2;
	ballY = height / 2;
	ballSize = 30;
	force = 8;
	xSpeed = force;
	ySpeed = force * -1;

	blueY = length / 2;
	redY = ballY;
	score = 0
	highScore = score;
}

function draw() {
	if (gameStatus === 0) {
		//Formatting
		background(0);
		textSize(50);
		stroke(255);
		strokeWeight(5);

		//Drawing
		text("Jiter Pong", middle - 120, 100); // Title
		rect(middle - 80, 250, 160, 60); //Button
		fill(0);
		text("START", middle - 80, 300);
		if (
			mouseX > middle - 80 &&
			mouseY > 250 &&
			mouseX < middle + 80 &&
			mouseY < 310
		) {
			fill(255);
			if (mouseIsPressed) {
				gameStatus = 1;
				score = 0;
				keyflag = true;
			}
		}
	} //ends code for gameStatus 0

	if (gameStatus === 1) {
		//Drawing
		background(0);
		fill(0);

		text(score, middle - 10, 45)

		stroke(0, 0, 255); //adjusts the outline to blue
		rect(15, blueY, 10, 70); //blue player, human

		stroke(255, 0, 0); //adjusts the outline to red
		fill(255, 0, 0);
		rect(width - 30, 0, 50, height); //red wall

		//MOVEMENT
		//
		if (keyIsPressed && keyCode === 38) {
			blueY -= 10;
		}
		if (keyIsPressed && keyCode === 40) {
			blueY += 10;
		}
		//
		//blueY = mouseY - 35;

		//JITTERING
		ballX = ballX + random(-jitter, jitter);
		ballY = ballY + random(-jitter, jitter);

		//BLUE RESTRICTORS
		if (blueY + 70 > height) {
			blueY = height - 70;
		} //bottom restricter for blue paddle

		if (blueY < 0) {
			blueY = 0;
		} //top restricter for blue paddle

		//BALL PHYSICS
		stroke(255);
		fill(0);
		circle(ballX, ballY, ballSize)
		ballX += xSpeed;
		ballY += ySpeed;

		//collision
		if (ballY + ballSize / 2 > height) {
			ballY = height - ballSize / 2;
			ySpeed *= -1;
		}

		if (ballY - ballSize / 2 < 0) {
			ballY = 0 + ballSize / 2;
			ySpeed *= -1;
		}

		//COLLISION OF PADDLE AND WALL
		if (ballX + ballSize / 2 > width - 30) { //collision of wall
			ballX = width - ballSize / 2 - 30;
			xSpeed = -1 * force;
		}

		if (ballX - ballSize < 15 && blueY < ballY && ballY < blueY + 70) {
			ballX = 30 + ballSize / 2;
			xSpeed = force;
			score++;
		}

		if (ballX < 0) {
			ballY = height / 2;
			ballX = width / 2;
			gameStatus = 2;
			if (score > highScore) {
				highScore = score;
			}
		}

	} //ends code for gameStatus 1

	if (gameStatus === 2) {
		background(0);
		textSize(50);
		text("You Lost", middle - 100, 70)
		textSize(20);
		text(
			"Score: " + score + "     " + "High Score: " + highScore,
			middle - 100,
			130
		);
		if (
			mouseX > middle - 80 &&
			mouseY > 250 &&
			mouseX < middle + 80 &&
			mouseY < 310
		) {
			fill(255);
			if (mouseIsPressed) {
				gameStatus = 0;
			}
		}
		textSize(50);
		rect(middle - 80, 250, 170, 60); //Button
		fill(0);
		text("RETRY", middle - 80, 300);

	}//closes gameStatus 2 code

} //closes function

var triviaQuestions = [{
	question: "Who was the director of the CIA from 1976-81?",
	answerList: ["George Bush", "Roscoe H. Hillenkoetter", "Sidney Souers", "CIA wasn't founded yet"],
	answer: 0
},{
	question: "In which country did General Jaruzelski impose marital law in 1981?",
	answerList: ["Germany", "Poland", "Spain", "France"],
	answer: 1
},{
	question: "Hellenikon international airport is in which country?",
	answerList: ["Netherlands", "Russia", "Greece", "Germany"],
	answer: 2
},{
	question: "In which year was the FOX network founded?",
	answerList: ["1988", "1986", "1981", "1987"],
	answer: 1
},{
	question: "Who was the target of the failed 'Bomb Plot' of 1944?",
	answerList: ["Joseph Stalin", "Kim Il-Sung", "Vietnam", "Hitler"],
	answer: 3
},{
	question: "Which Chinese year follows the year of the sheep?",
	answerList: ["Monkey", "Dog", "Dragon", "Tiger"],
	answer: 0
},{
	question: "Vehicles from which country use the international registration letter C?",
	answerList: ["Canada", "Cuba", "Camaroon", "Cambodia"],
	answer: 1
},{
	question: "Which American wrote The Game of Chess in 1959?",
	answerList: ["Tal", "Spassky", "Karpov", "Fischer"],
	answer: 3
},{
	question: "Which leader did Hitler meet in the Brenner Pass in WWII?",
	answerList: ["Mussolini", "Stalin", "Tojo", "Churchill"],
	answer: 0
},{
	question: "In what year was the 'FBI' established?",
	answerList: ["1901", "1910", "1908", "1919"],
	answer: 2
}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10'];
var wrongGifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Yes, that's right!",
	incorrect: "No, that's not it. But good try!",
	endTime: "Out of time, really? You had 15 seconds!",
	finished: "Alright! Let's see how well you did."
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty().hide();
	$('#correctAnswers').empty().hide();
	$('#incorrectAnswers').empty().hide();
	$('#unanswered').empty().hide();
	$('#instructions').remove().hide();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty().hide();
	$('#correctedAnswer').empty().hide();
	$('#gif').empty().hide();
	answered = true;
	
	//sets up new questions & answers
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length).fadeIn("slow");
	$('.question').html('<h2 class="questionText">' + triviaQuestions[currentQuestion].question + '</h2>').fadeIn("slow");
	for(var i = 0; i < 4; i++){
		var choices = $('<div>').hide();
		choices.text(triviaQuestions[currentQuestion].answerList[i]).fadeIn();
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 20;
	$('#timeLeft').hide().html('<h3 class="timeText">Time Remaining: <b id="secondsText">' + seconds + '</b></h3>').fadeIn();
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1500);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3 class="timeText">Time Remaining: <b id="secondsText">' + seconds + '</b></h3>');
	if(seconds <8){
		$('#secondsText').css('color', 'red');
	}
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty().hide();//Clears previous question page
	$('.thisChoice').remove(); //Removes previous answerList
	$('.question').empty().hide();//Clears previous question
	$('#timeLeft').empty().hide();//Clears previous time left page

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct).fadeIn("slow");
		$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">').fadeIn("slow");
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect).fadeIn("slow");
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText).fadeIn();
		$('#gif').html('<img src = "assets/images/wrong/'+ wrongGifArray[currentQuestion] +'.gif" width = "400px">').fadeIn("slow");
	} else{
		unanswered++;
		$('#message').html(messages.endTime).fadeIn("slow");
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText).fadeIn("slow");
		$('#gif').html('<img src = "assets/images/notime.gif" width = "400px">').fadeIn("slow");
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5500)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5500);
	}	
}

function scoreboard(){
	$('#timeLeft').hide();
	$('#message').hide();
	$('#correctedAnswer').hide();
	$('#gif').hide();

	$('#finalMessage').hide().html(messages.finished).fadeIn('fast');
	$('#correctAnswers').hide().html("Correct Answers: " + correctAnswer).delay('1000').fadeIn('slow');
	$('#incorrectAnswers').hide().html("Incorrect Answers: " + incorrectAnswer).delay('1500').fadeIn('slow');
	$('#unanswered').hide().html("Unanswered: " + unanswered).delay('1800').fadeIn('slow');
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').delay('3000').fadeIn();
	$('#startOverBtn').html('Start Over?');
}

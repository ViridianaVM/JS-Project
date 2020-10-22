const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p");
const resetButton = document.querySelector("#reset");
const newTextButton = document.querySelector("#newText");
const theTimer = document.querySelector(".timer");

var timer = [0,0,0,0];

var interval;
var timerRunning = false;

var testingTexts = ["","","","",""];
testingTexts[0] = "The young man wanted a role model. He looked long and hard in his youth, but that role model never materialized. His only choice was to embrace all the people in his life he didn't want to be like.";
testingTexts[1] = "There are only 3 ways to make this work. The first is to let me take care of everything. The second is for you to take care of everything. The third is to split everything 50 / 50. I think the last option is the most preferable, but I'm afraid it would also mean the end of our marriage.";
testingTexts[2] = "I haven't failed on writing. Look, I'm generating a random paragraph at this very moment in an attempt to get my writing back on track. I am making an effort. I will start writing consistently again!";
testingTexts[3] = "You can decide what you want to do in life, but I suggest doing something that creates. Something that leaves a tangible thing once you're done. That way even after you're gone, you will still live on in the things you created.";
testingTexts[4] = "It's always good to bring a slower friend with you on a hike. If you happen to come across bears, the whole group doesn't have to worry. Only the slowest in the group do. That was the lesson they were about to learn that day.";
var textIndex = 0;
originText.innerHTML = testingTexts[textIndex];


// Add leading zero to numbers 9 or below (purely for aesthetics):
//This function is to add extra zeros when needed and have format 00:00:00 in the timer
function leadingZero (time){
    if (time<=9){
        time = "0" + time;
    }
    return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer(){
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;
    //To give the correct format to the timer counter
    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor((timer[3]/100) - timer[0]*60);
    timer[2] = Math.floor(timer[3] - (timer[1]*100) - (timer[0]*6000));
}

// Match the text entered with the provided text on the page:
function spellCheck(){
    let textEntered = testArea.value;
    let textToCheck = originText.innerHTML;
    let originTextMatch = textToCheck.substring(0,textEntered.length); //Substring gives the amount of chars typed by the user and compare them with the original Text.
    

    if (textEntered == textToCheck){
        //When it is equal to the text, I clean the intervals so the clock stops
        clearInterval(interval);
        testWrapper.style.borderColor = "#47B881"; //green
    } else {
        if (textEntered == originTextMatch){
            testWrapper.style.borderColor = "#8FCACA"; //blue
        }
        else{
            testWrapper.style.borderColor = "#CD5C5C"; //red
        }
    }
}

// Start the timer:
//I want to detect the very first keypress. 
function start(){
    let textEnteredLength = testArea.value.length;
    if (textEnteredLength === 0 && !timerRunning){
        timerRunning = true;
        interval = setInterval(runTimer,10);
    }
    console.log(textEnteredLength);
}

// Reset everything:
function reset(){
    //To ensure the browser is not running intervals in the background bc that would waste resources.
    clearInterval(interval);
    interval = null;
    timer = [0,0,0,0];
    timerRunning = false //This will run the interval again in the start function
    //Clear the text area
    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "gray";
}

// New text:
function newText(){
    reset();
    textIndex++;
    if (textIndex==5){
        textIndex=0;
    }
    originText.innerHTML = testingTexts[textIndex];
}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);
newTextButton.addEventListener("click", newText, false);

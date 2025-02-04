let seconds = document.getElementById('seconds');
let minutes = document.getElementById('minutes');
let sec_dot = document.querySelector('.time_dots');
let ss = document.getElementById('ss')
let alarmSound = document.getElementById('alarmSound')


let userMinutes = 25
let secondsCount = 0;
let minutesCount = userMinutes;
let timerBase = userMinutes * 60

let interval

let isPaused = false;


//input start
let focusInput = document.getElementById('focus-input')
let aimInput = document.getElementById('aim-input')
let submitBtn = document.getElementById('input-submit')
let InputAlert = document.getElementById('Input-alert')

submitBtn.addEventListener('click' , ()=>{
    // Convert input values to numbers
    let focusValue = Number(focusInput.value);
    let aimValue = Number(aimInput.value);
    
    // Check if the values are integers
    if (!Number.isInteger(focusValue) || !Number.isInteger(aimValue)) {
        InputAlert.classList.remove("d-none")
        setTimeout(() => {
            InputAlert.classList.add("d-none")
        }, 3000)
        return;
    }
    userMinutes = focusInput.value ? focusInput.value : 25
    minutesCount = userMinutes
    secondsCount = 0
    timerBase = userMinutes * 60

    aimTime = aimInput.value ? aimInput.value : 8
    clearInput()
    updateDisplay()
})

function clearInput(){
    focusInput.value = ''
    aimInput.value = ''
}
//input end




//aim start
let aimTime = 8
let aimTimePassed = 0
let aimMinutsPassed = 0
let aimHourPassed = 0
let aim_dots = document.querySelector('.aim_dots')
let aa = document.getElementById('aa')
let aim = document.getElementById('aim')
let aimHours = document.getElementById('aim-hours')
let aimMinutes = document.getElementById('aim-minutes')
//aim end

function timerFunction() {
    // Update the display initially
    updateDisplay();

    interval = setInterval(() => {
        if (secondsCount === 0) {
            if (minutesCount === 0) {
                clearInterval(interval); // Stop the timer when it reaches 0
                alarmSound.play();
                return;
            }
            minutesCount--; // Decrement minutes
            aimTimePassed++
            secondsCount = 59; // Reset seconds to 59
        } else {
            secondsCount--; // Decrement seconds
        }
        updateDisplay();
    }, 1000); // Update every second
}

function updateDisplay() {
    seconds.innerHTML = secondsCount < 10 ? '0' + secondsCount : secondsCount;
    minutes.innerHTML = minutesCount < 10 ? '0' + minutesCount : minutesCount;

    //aim start
    aimHourPassed = Math.floor(aimTimePassed/60) 
    aimMinutsPassed = aimTimePassed%60
    console.log(aimHourPassed , aimMinutsPassed)
    // aim.innerHTML = aimMinutsPassed
    aimHours.innerHTML = aimHourPassed < 10 ? '0' + aimHourPassed : aimHourPassed ;
    aimMinutes.innerHTML = aimMinutsPassed < 10 ? '0' + aimMinutsPassed : aimMinutsPassed ;
    //aim end

    let timeAsSeconds = (minutesCount * 60) + secondsCount
    ss.style.strokeDashoffset = 440 - (440 * timeAsSeconds) / timerBase

    //aim start 
    let aimTimeAsMinuts = aimTime*60
    // console.log(aimTimePassed / aimTimeAsMinuts , aimTimeAsMinuts)
    aa.style.strokeDashoffset = 440 -  (440 * aimTimePassed) / aimTimeAsMinuts
    //aim end


    let degAsSeconds = 360 / timerBase
    sec_dot.style.transform = `rotateZ(${timeAsSeconds * degAsSeconds}deg)`

    //aim start
    let aimDeg = 360 /  aimTimeAsMinuts

    aim_dots.style.transform = `rotateZ(${aimTimePassed * aimDeg}deg)`
    //aim end

}

/// buttons 

let ResetBtn = document.getElementById('ResetButton')

// Start button functionality
let startBtn = document.getElementById('startButton')

startBtn.addEventListener('click', () => {
    if (!isPaused) {
        secondsCount = 0; // Reset seconds
        minutesCount = userMinutes; // Reset minutes
        updateDisplay();
    }
    timerFunction();
    startBtn.disabled = true
    stopBtn.disabled = false
    ResetBtn.disabled = true
    // resumeBtn.disabled = true; // Disable resume button
});

// Stop button functionality
let stopBtn = document.getElementById('stopButton')
stopBtn.addEventListener('click', () => {
    clearInterval(interval); // Clear the interval to pause the timer
    isPaused = true; // Set paused state
    stopBtn.disabled = true
    startBtn.disabled = false
    ResetBtn.disabled = false;
});

// Reset button functionality
ResetBtn.addEventListener('click', () => {
    //timerFunction(); // Resume the timer
    isPaused = false; // Reset paused state
    startBtn.disabled = false
    secondsCount = 0; // Reset seconds
    minutesCount = userMinutes; // Reset minutes
    updateDisplay();
});


////////////////////////////////////////////// maby lather ?!
// when rest :
// 	chang color
// 	an other clock
// 	display / none

// skip rest btn




const Header = document.querySelector('.main-container header');
const timeOptions = Array.from(Header.querySelectorAll('ul li'));
const timeContainer = document.querySelector('.timecontainer');
const controlTime = document.querySelector('.control-time');
const Time = Array.from(timeContainer.querySelectorAll('.time p'));
const Description = timeContainer.querySelector('.description');
const Controls = Array.from(document.querySelectorAll('.controls ul li'));
const deleteTime = controlTime.querySelector('.delete-time');
const controlInputSpan = Array.from(controlTime.querySelectorAll('.control-input p span'));
const keyNumbers = Array.from(controlTime.querySelectorAll('.control-numbers li'));
const play = Controls[1].childNodes[1];
const pause = Controls[1].childNodes[3];

let enteredNumbers = 0;
let isSettingTime = false;
let timerCountDown;

timeOptions.forEach(item => addEventListener('click', setTime));
Controls[0].addEventListener('click', addCustomTime);
keyNumbers.forEach(item => addEventListener('click', setNumber));
deleteTime.addEventListener('click', timeDelete);
Controls[2].addEventListener('click', deleteCountDown);
play.addEventListener('click', startCountDown);
pause.addEventListener('click', pauseCountDown);

function startCountDown() {
    if (isSettingTime) {
        if (controlInputSpan[0].innerText != '0' || controlInputSpan[1].innerText != '00' | controlInputSpan[2].innerText != '00') {
            isSettingTime = false;

            const totalHour = ((Number(controlInputSpan[0].innerText) * 3600) + (Number(controlInputSpan[1].innerText) * 60) + Number(controlInputSpan[2].innerText)) / (60 * 60);
            const wholeHour = Number(totalHour.toString().substring(0, findIndex(totalHour))) == 0 ? totalHour : Number(totalHour.toString().substring(0, findIndex(totalHour)));
            const remainderHour = Number(totalHour.toString().substring(findIndex(totalHour))) == wholeHour ? 0 : Number(totalHour.toString().substring(findIndex(totalHour)));
            const totalMinute = 60 * remainderHour;

            const inputHour = Number(controlInputSpan[0].innerText) * 3600;
            const inputMinute = Number(controlInputSpan[1].innerText) * 60;
            const inputSecond = Number(controlInputSpan[2].innerText);

            let totalInputTime = inputHour + inputSecond + inputMinute;
            let totalInputHour;
            let totalInputMinute;
            let totalInputSecond;
            let decimalMinute;

            if (totalInputTime <= 59) {
                totalInputTime = totalInputTime.toString().length > 1 ? totalInputTime : `0${totalInputTime}`;
                Time[0].innerText = '0';
                Time[2].innerText = '00';
                Time[4].innerText = totalInputTime;
            }
            else if (totalInputTime < 3600 && totalInputTime > 59) {
                totalInputTime = totalInputTime / 60;

                if (totalInputTime.toString().includes('.')) {
                    totalInputMinute = Number(totalInputTime.toString().substring(0, findIndex(totalInputTime)));
                    totalInputSecond = Math.round(Number(totalInputTime.toString().substring(findIndex(totalInputTime))) * 60);
                }
                else {
                    totalInputMinute = totalInputTime;
                    totalInputSecond = 0;
                }

                totalInputMinute = totalInputMinute.toString().length > 1 ? totalInputMinute : `0${totalInputMinute}`;
                totalInputSecond = totalInputSecond.toString().length > 1 ? totalInputSecond : `0${totalInputSecond}`;

                Time[0].innerText = '0';
                Time[2].innerText = totalInputMinute;
                Time[4].innerText = totalInputSecond;
            }
            else {
                totalInputTime = totalInputTime / 3600;
                if (totalInputTime.toString().includes('.')) {
                    totalInputHour = Number(totalInputTime.toString().substring(0, findIndex(totalInputTime)))
                    decimalMinute = Number(totalInputTime.toString().substring(findIndex(totalInputTime))) * 60
                }
                else {
                    totalInputHour = totalInputTime;
                    decimalMinute = 0;
                }

                if (decimalMinute.toString().includes('.')) {
                    if (decimalMinute.toFixed(2) == 1) {
                        totalInputMinute = 1;
                        totalInputSecond = 0;
                    }
                    else {
                        totalInputMinute = decimalMinute.toString().substring(0, findIndex(decimalMinute));
                        totalInputSecond = Math.round(Number(decimalMinute.toString().substring(findIndex(decimalMinute))) * 60);
                    }
                }
                else {
                    if (decimalMinute > 0) {
                        totalInputMinute = decimalMinute;
                        totalInputSecond = 0;
                    }
                    else {
                        totalInputMinute = 0;
                        totalInputSecond = 0;
                    }
                }

                Time[0].innerText = totalInputHour;
                Time[2].innerText = totalInputMinute.toString().length > 1 ? totalInputMinute : `0${totalInputMinute}`;
                Time[4].innerText = totalInputSecond.toString().length > 1 ? totalInputSecond : `0${totalInputSecond}`;
            }
            const hourNow = new Date().getHours();
            const minuteNow = new Date().getMinutes();
            const secondNow = new Date().getSeconds();

            const totalSecondNow = (secondNow + totalInputSecond) / 60;
            let remainderSecondNow;
            totalSecondNow.toString().includes('.') ? remainderSecondNow = Number(totalSecondNow.toString().substring(0, findIndex(totalSecondNow))) : remainderSecondNow = totalSecondNow;

            const totalMinuteNow = (Number(minuteNow) + Number(totalInputMinute) + Number(remainderSecondNow)) / 60;
            let wholeMinuteNow;
            let remainderMinuteNow;
            if (totalMinuteNow.toString().includes('.')) {
                wholeMinuteNow = Math.round(60 * Number(totalMinuteNow.toString().substring(findIndex(totalMinuteNow))));
                remainderMinuteNow = Number(totalMinuteNow.toString().substring(0, findIndex(totalMinuteNow)));
            }
            else {
                wholeMinuteNow = 0;
                remainderMinuteNow = totalMinuteNow;
            }
            let wholeHourNow = Number(hourNow) + Number(totalInputHour) + Number(remainderMinuteNow);
            wholeMinuteNow = wholeMinuteNow.toString().length != 2 ? `0${wholeMinuteNow}` : wholeMinuteNow;

            if (wholeHourNow < 12) {
                Description.innerText = `Be back later at ${wholeHourNow}:${wholeMinuteNow} AM`;
            }
            else if (wholeHourNow >= 12 && wholeHourNow < 24) {
                wholeHourNow = wholeHourNow > 12 ? wholeHourNow = wholeHourNow - 12 : wholeHourNow = 12;
                Description.innerText = `Be back later at ${wholeHourNow}:${wholeMinuteNow} PM`;
            }
            else if (wholeHourNow >= 24) {
                wholeHourNow = wholeHourNow > 24 ? wholeHourNow = wholeHourNow - 24 : wholeHourNow = 12;
                Description.innerText = `Be back tomorrow at ${wholeHourNow}:${wholeMinuteNow} AM`;
            }
            Controls[0].style.transform = 'translateX(0)';
            Controls[2].style.transform = 'translateX(0)';
            Header.style.transform = 'translateX(0)';
            timeContainer.style.left = '0';
            controlTime.style.left = '105%';
            pause.style.transform = 'translate(-50%, 0%)';
            play.style.transform = 'translate(50%, 150%)';

            timerCountDown = setInterval(countDownTimer, 1000)
        }
    }
    else {
        if ((Number(Time[0].innerText) + Number(Time[2].innerText) + Number(Time[4].innerText)) > 0) {
            timerCountDown = setInterval(countDownTimer, 1000)
            pause.style.transform = 'translate(-50%, 0%)';
            play.style.transform = 'translate(50%, 150%)';
        }
    }
}

function pauseCountDown() {
    clearInterval(timerCountDown);
    play.style.transform = 'translate(50%, 0%)';
    pause.style.transform = 'translate(-50%, 150%)';
}

function deleteCountDown() {
    clearInterval(timerCountDown);
    play.style.transform = 'translate(50%, 0%)';
    pause.style.transform = 'translate(-50%, 150%)';
    Time[0].innerText = '0';
    Time[2].innerText = '00';
    Time[4].innerText = '00';
    Description.innerText = '';
    timeDelete();
}

function timeDelete() {
    enteredNumbers = 0;
    controlInputSpan.forEach((item, index) => index === 0 ? item.innerText = '0' : item.innerText = '00');
}

function setNumber(e) {
    if (e.target.tagName != 'LI' || e.target.innerText == '+') {
        return;
    }
    enteredNumbers++;
    switch (enteredNumbers) {
        case 1:
            e.target.innerText == '0' ? enteredNumbers = 0 : controlInputSpan[2].innerText = controlInputSpan[2].innerText.substring(0, 1) + e.target.innerText;
            break;

        case 2:
            controlInputSpan[2].innerText = controlInputSpan[2].innerText.substring(1, 2) + e.target.innerText;
            break;

        case 3:
            controlInputSpan[1].innerText = controlInputSpan[1].innerText.substring(0, 1) + controlInputSpan[2].innerText.substring(0, 1);
            controlInputSpan[2].innerText = controlInputSpan[2].innerText.substring(1, 2) + e.target.innerText;
            break;

        case 4:
            controlInputSpan[1].innerText = controlInputSpan[1].innerText.substring(1, 2) + controlInputSpan[2].innerText.substring(0, 1);
            controlInputSpan[2].innerText = controlInputSpan[2].innerText.substring(1, 2) + e.target.innerText;
            break;

        case 5:
            controlInputSpan[0].innerText = controlInputSpan[1].innerText.substring(0, 1);
            controlInputSpan[1].innerText = controlInputSpan[1].innerText.substring(1, 2) + controlInputSpan[2].innerText.substring(0, 1);
            controlInputSpan[2].innerText = controlInputSpan[2].innerText.substring(1, 2) + e.target.innerText;
            break;
    }
}

function addCustomTime() {
    pauseCountDown();
    controlInputSpan[0].innerText = Time[0].innerText;
    controlInputSpan[1].innerText = Time[2].innerText;
    controlInputSpan[2].innerText = Time[4].innerText;
    Controls[0].style.transform = 'translateX(-4em)';
    Controls[2].style.transform = 'translateX(4em)';
    Header.style.transform = 'translateX(-105%)';
    timeContainer.style.left = '-105%';
    controlTime.style.left = '0';
    isSettingTime = true;
}

function setTime(e) {
    switch (e.target.innerText) {
        case '20 SEC':
            Time[0].innerText = '0';
            Time[2].innerText = '00';
            Time[4].innerText = '20';
            Description.innerText = '';
            pauseCountDown();
            break;

        case '5 MIN':
            Time[0].innerText = '0';
            Time[2].innerText = '05';
            Time[4].innerText = '00';
            Description.innerText = '';
            pauseCountDown();
            break;

        case '15 MIN':
            Time[0].innerText = '0';
            Time[2].innerText = '15';
            Time[4].innerText = '00';
            Description.innerText = '';
            pauseCountDown();
            break;

        case '20 MIN':
            Time[0].innerText = '0';
            Time[2].innerText = '20';
            Time[4].innerText = '00';
            Description.innerText = '';
            pauseCountDown();
            break;

        case '30 MIN':
            Time[0].innerText = '0';
            Time[2].innerText = '30';
            Time[4].innerText = '00';
            Description.innerText = '';
            pauseCountDown();
            break
    }
}

const findIndex = number => number.toString().indexOf('.');

function countDownTimer() {
    let numberHour = Number(Time[0].innerText);
    let numberMinute = Number(Time[2].innerText);
    let numberSecond = Number(Time[4].innerText);
    numberSecond--;
    if (numberSecond == 0 && numberMinute == 0 && numberHour == 0) {
        clearInterval(timerCountDown);
        play.style.transform = 'translate(50%, 0%)';
        pause.style.transform = 'translate(-50%, 150%)';
    }
    else if (numberSecond < 0 && numberMinute > 0) {
        numberMinute--;
        numberSecond = 59;
    }
    else if (numberSecond < 0 && numberMinute == 0 && numberHour > 0) {
        numberHour--;
        numberMinute = 59;
        numberSecond = 59;
    }
    const Hours = numberHour;
    const Minutes = numberMinute.toString().length > 1 ? numberMinute : `0${numberMinute}`;
    const Seconds = numberSecond.toString().length > 1 ? numberSecond : `0${numberSecond}`;

    Time[4].innerText = Seconds;
    Time[2].innerText = Minutes;
    Time[0].innerText = Hours;
}
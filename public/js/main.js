$(function () {
  console.log('the countdown begun le');

  $('#myTab a').click(function (e) {
    e.preventDefault()
    $(this).tab('show')
  })

});

var player = new Object();
player.dailySleepingTime = 8;
player.dailyEatingTime = 1.167;
player.dailyToiletTime = 0.5;
var currentAgeDate;
var deathDate;


$( "#submitDate" ).submit(function( event ) {
  event.preventDefault();
  $("#currentAge").empty()
  $("#processedDate").empty()
  console.log($(this.currentAgeYear).val())
  console.log($(this.inputDate).val())

  player.currentAgeDate = $(this.currentAgeYear).val()
  player.deathDate = $(this.inputDate).val().match(/\d+/g)

  // calculate years left
  calcYearsLeft(player.currentAgeDate, player.deathDate)

  $("#processedDate").append(deathDate)

  // clear the input box
  $(this.currentAge).val("")
  $(this.inputDate).val("")

  // append to balance sheet
  $("#secondsStart").append(player.secondsLeft)

  var multiplyTotalDaysThenToSeconds = player.daysLeft * 60 * 60

  // append liabilities
  $("#sleepingHours").append(Math.floor(player.dailySleepingTime * multiplyTotalDaysThenToSeconds))
  $("#eatingHours").append(Math.floor(player.dailyEatingTime * multiplyTotalDaysThenToSeconds))
  $("#toiletHours").append(Math.floor(player.dailyToiletTime * multiplyTotalDaysThenToSeconds))

  var deadLine = new Date(Date.parse(new Date()) + player.daysLeft * 24 * 60 * 60 * 1000);

  initializeClock('clockdiv', deadLine);
  initializeInTimeClock('inTimeClockDiv', deadLine);

  console.log('hey im done');

});

$("#settingsForm").submit(function(event) {
  event.preventDefault();
  player.dailySleepingTime = $(this.sleepingHours).val() ;
  player.dailyEatingTime = $(this.eatingHours).val() ;
  player.dailyToiletTime = $(this.toiletHours).val() ;
})

function calcYearsLeft(current, last) {
  var yL = last - current
  player.yearsLeft = yL
  calcMonthsLeft(yL)
  calcWeeksLeft(yL)
  calcDaysLeft(yL)
  return yL
}

function calcMonthsLeft(years_left) {
  var mL = years_left * 12
  player.monthsLeft = mL
  return mL
}

function calcWeeksLeft(years_left) {
  var wL = years_left * 52.1429
  player.weeksLeft = wL
  return wL
}

function calcDaysLeft(years_left) {
  var dL = years_left * 365.25
  player.daysLeft = dL
  calcHoursLeft(dL)
  return dL
}

function calcHoursLeft(days_left) {
  var hL = days_left * 24
  player.hoursLeft = hL
  calcMinutesLeft(hL)
  return hL
}

function calcMinutesLeft(hours_left) {
  var mL = hours_left * 60
  player.minutesLeft = mL
  calcSecondsLeft(mL)
  return mL
}

function calcSecondsLeft(hours_left) {
  var sL = hours_left * 60
  player.secondsLeft = sL
  return sL
}

// COUNTDOWN TIMER
function getTimeRemaining(endtime) {
  // console.log("this is the end time: ", endtime)
  var milliseconds = new Date().getMilliseconds();
  var t = Date.parse(endtime) - (Date.parse(new Date()) + milliseconds);

  // console.log("this is end time", Date.parse(endtime) + milliseconds)
  // console.log("this is new time", Date.parse(new Date()) + milliseconds2);
  var seconds = Math.floor((t / 1000) % 60);
  var minutes = Math.floor((t / 1000 / 60) % 60);
  var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  var days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(id, endtime) {
  var clock = document.getElementById(id);
  var daysSpan = clock.querySelector('.days');
  var hoursSpan = clock.querySelector('.hours');
  var minutesSpan = clock.querySelector('.minutes');
  var secondsSpan = clock.querySelector('.seconds');

  function updateClock() {
    var t = getTimeRemaining(endtime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1000);
}


function initializeInTimeClock(id, endtime) {
  var clock = document.getElementById(id);
  var secondsSpan = clock.querySelector('.iTSeconds');

  function updateClock() {
    var t = getTimeRemaining(endtime);
    console.log(t)

    secondsSpan.innerHTML = t.total.toLocaleString()

    if (t.total <= 0) {
      console.log('im in here:');
      clearInterval(timeinterval);
    }
  }

  updateClock();
  var timeinterval = setInterval(updateClock, 1);
}

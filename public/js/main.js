$(function () {
  console.log('the countdown begun le');

});

var player = new Object();
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
});

function calcYearsLeft(current, last) {
  var yL = last - current
  player.yearsLeft = yL
  calcMonthsLeft(yL)
  calcDaysLeft(yL)
  return yL
}

function calcMonthsLeft(years_left) {
  var mL = years_left * 12
  player.monthsLeft = mL
  return mL
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

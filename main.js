let dayInput = document.getElementById("day");
let monthInput = document.getElementById("month");
let yearInput = document.getElementById("year");
let inputs = document.querySelectorAll("input");
let start = document.querySelector("button");
let dayResult = document.querySelector("span.day-result");
let monthResult = document.querySelector("span.month-result");
let yearResult = document.querySelector("span.year-result");
let errorsLabels = document.querySelectorAll(".error");

let requiredError = "This field is required";
let dayError = "Must be a valid day";
let monthError = "Must be a valid Month";
let yearError = "Must be in the past";
let yearErrorlow = "Must be after 1900";

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth() + 1;
const currentDay = currentDate.getDate();
let years, months, days;

start.addEventListener("click", (e) => {
	checkEmpty();
	limitsCheck();
	clacuate();

	let redFlagStatus = document.querySelectorAll(".red-flag");
	if (redFlagStatus.length == 0) {
		showResult();
	} else {
		reset();
	}
});

function checkEmpty() {
	inputs.forEach((input, i) => {
		if (input.value == "") {
			redFlagActivate(i, requiredError);
		} else {
			redFlagDeactivate(i);
		}
	});
}

function limitsCheck() {
	const daysInMonth = getDaysInMonth(yearInput.value, monthInput.value - 1);

	parseInt(dayInput.value) < 1 || parseInt(dayInput.value) > daysInMonth
		? redFlagActivate(0, dayError)
		: true;

	parseInt(monthInput.value) < 1 || parseInt(monthInput.value) > 12
		? redFlagActivate(1, monthError)
		: true;

	parseInt(yearInput.value) >= currentYear
		? redFlagActivate(2, yearError)
		: true;

	parseInt(yearInput.value) < 1900 ? redFlagActivate(2, yearErrorlow) : true;
}

function getDaysInMonth(year, month) {
	// console.log(month);
	const firstDayOfMonth = new Date(year, month, 1);
	// console.log(firstDayOfMonth);
	const lastDayOfMonth = new Date(year, month + 1, 0);
	// console.log(lastDayOfMonth);
	return lastDayOfMonth.getDate() - firstDayOfMonth.getDate() + 1;
}

function redFlagActivate(inputIndex, errorMessage) {
	inputs[inputIndex].parentElement.classList.add("red-flag");
	errorsLabels[inputIndex].classList.remove("hidden");
	errorsLabels[inputIndex].innerHTML = errorMessage;
}

function redFlagDeactivate(inputIndex) {
	inputs[inputIndex].parentElement.classList.remove("red-flag");
	errorsLabels[inputIndex].classList.add("hidden");
}

function clacuate() {
	if (currentMonth > monthInput.value) {
		years = currentYear - yearInput.value;

		if (dayInput.value == currentDay) {
			months = currentMonth - monthInput.value;
		}

		if (dayInput.value > currentDay) {
			months = currentMonth - monthInput.value - 1;
		}

		if (dayInput.value < currentDay) {
			months = currentMonth - monthInput.value;
		}
	}

	if (currentMonth == monthInput.value) {
		if (dayInput.value == currentDay) {
			years = currentYear - yearInput.value;
			months = currentMonth - monthInput.value;
		}

		if (dayInput.value > currentDay) {
			years = currentYear - yearInput.value - 1;
			months = 12 + (currentMonth - monthInput.value) - 1;
		}

		if (dayInput.value < currentDay) {
			years = currentYear - yearInput.value;
			months = currentMonth - monthInput.value;
		}
	}

	if (currentMonth < monthInput.value) {
		years = currentYear - yearInput.value - 1;

		if (dayInput.value == currentDay) {
			months = 12 + (currentMonth - monthInput.value);
		}
		if (dayInput.value > currentDay) {
			months = 12 + (currentMonth - monthInput.value) - 1;
		}
		if (dayInput.value < currentDay) {
			months = 12 + (currentMonth - monthInput.value);
		}
	}

	const daysInMonth = getDaysInMonth(yearInput.value, currentMonth - 2);
	days =
		daysInMonth + (currentDay - dayInput.value) >= daysInMonth
			? daysInMonth + (currentDay - dayInput.value) - daysInMonth
			: daysInMonth + (currentDay - dayInput.value);

	console.log(years, months, days);
}


function showResult() {
	fillNumbers(dayResult, days);
	fillNumbers(monthResult, months);
	fillNumbers(yearResult, years);
}

function fillNumbers(e, goal) {
  let i = 0
	let up = setInterval(() => {
		if (i < parseInt(goal)) {
      i++
      e.innerHTML = i
      // i < 10 ? e.innerHTML=`0${i}` : e.innerHTML = i
		}
		if (i == parseInt(goal)) {
			e.innerHTML = i
			clearInterval(up);
		}
	}, 1000 / goal);
}

function reset() {
	dayResult.innerHTML = "--";
	monthResult.innerHTML = "--";
	yearResult.innerHTML = "--";
}

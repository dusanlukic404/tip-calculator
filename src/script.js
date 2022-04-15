"use strict";

const inputs = document.querySelectorAll(".number-input");
const inputBill = document.querySelector(".number-input--bill");
const inputTip = document.querySelector(".number-input--custom");
const inputPeople = document.querySelector(".number-input--people");
const tipContainer = document.querySelector(".tip-container");
const procents = document.querySelectorAll(".procent");
const resetBtn = document.querySelector(".reset-btn");
const priceAmount = document.querySelector(".price--tip-amount");
const priceTotal = document.querySelector(".price--total");
const errorMessage = document.querySelector(".message");
let bill, tipProcent, peopleNumber;

const initCalc = function () {
  inputBill.value = "";
  inputPeople.value = "";
  inputTip.value = "";
  procents.forEach((tip) => tip.classList.remove("procent--active"));
  bill = 0;
  tipProcent = 0;
  peopleNumber = 0;
  errorMessage.classList.remove("message--error");
  inputPeople.style.outline = "none";
  priceAmount.textContent = `$0.00`;
  priceTotal.textContent = `$0.00`;
};

const calculateTip = function () {
  if (peopleNumber >= 1) {
    let tipAmount = (bill * tipProcent) / peopleNumber;
    let total = (bill * (tipProcent + 1)) / peopleNumber;
    priceAmount.textContent = "$" + tipAmount.toFixed(2);
    priceTotal.textContent = "$" + total.toFixed(2);
  }
};

const displayError = function () {
  if (peopleNumber === 0 && bill > 0 && tipProcent > 0) {
    errorMessage.classList.add("message--error");
    inputPeople.style.outline = "2px solid hsl(10, 73%, 59%)";
  } else {
    errorMessage.classList.remove("message--error");
    inputPeople.style.outline = "none";
  }
};

// Get procent of tip
tipContainer.addEventListener("click", function (e) {
  if (
    !e.target.classList.contains("number-input--custom") &&
    !e.target.classList.contains("procent")
  )
    return;

  procents.forEach((tip) => tip.classList.remove("procent--active"));

  if (!e.target.classList.contains("number-input--custom")) {
    e.target.classList.add("procent--active");
    tipProcent = +e.target.dataset.tip / 100;
  } else {
    procents.forEach((tip) => tip.classList.remove("procent--active"));
  }

  if (e.target.classList.contains("procent")) {
    inputTip.value = "";
  } else return;
});

inputBill.addEventListener("change", function () {
  bill = +inputBill.value;
  calculateTip();
});

inputPeople.addEventListener("change", function () {
  peopleNumber = +inputPeople.value;
  calculateTip();
});

inputTip.addEventListener("change", function () {
  tipProcent = +inputTip.value / 100;
  calculateTip();
});

// Add reset functionality if inputs have values
inputs.forEach((input) => {
  input.addEventListener("input", function (e) {
    resetBtn.classList.add("reset-btn--active");

    if (resetBtn.classList.contains("reset-btn--active")) {
      resetBtn.addEventListener("click", initCalc);
    }
  });
});

inputs.forEach((input) => {
  input.addEventListener("change", function () {
    if (peopleNumber === 0 && bill > 0 && tipProcent > 0) {
      errorMessage.classList.add("message--error");
      inputPeople.style.outline = "2px solid hsl(10, 73%, 59%)";
    } else {
      errorMessage.classList.remove("message--error");
      inputPeople.style.outline = "none";
    }
  });
});

resetBtn.addEventListener("click", function () {
  initCalc();
  resetBtn.classList.remove("reset-btn--active");
});

// Clear input fields on refresh
window.onload = function () {
  initCalc();
};

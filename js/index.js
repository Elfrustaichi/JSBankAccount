//header section start
let totalBalance = 100;

const userBalance = document.querySelector("#balance p");
userBalance.innerHTML = totalBalance + "$";
const depositButton = document.querySelector("#deposit button");
const withdrawButton = document.querySelector("#withdraw button");
const depositInput = document.querySelector("#deposit input");
const withdrawInput = document.querySelector("#withdraw input");

depositButton.addEventListener("click", (e) => {
  e.preventDefault();

  if (Number(depositInput.value) < 1 || Number(depositInput.value) > 10000) {
    alert("You can only deposit greater than 1 and lower than 10000.");
    return (depositInput.value = "");
  } else {
    totalBalance += Number(depositInput.value);
    userBalance.innerHTML = totalBalance + "$";
    createHistoryElement("Deposit", depositInput.value);
    return (depositInput.value = "");
  }
});

withdrawButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (Number(withdrawInput.value) > totalBalance) {
    alert("You dont have enough money.");
    return (withdrawInput.value = "");
  } else {
    if (
      Number(withdrawInput.value) < 1 ||
      Number(withdrawInput.value) > 10000
    ) {
      alert("You cant withdraw greater than 10000 lower than 1.");
      return (withdrawInput.value = "");
    } else {
      totalBalance -= Number(withdrawInput.value);
      userBalance.innerHTML = totalBalance + "$";
      createHistoryElement("Withdraw",withdrawInput.value);
      withdrawInput.value = "";
    }
  }
});
//header section end

//main section payment methods start
const paymentMethods = document.querySelectorAll(".payments div");
const paymentForm = document.querySelector(".payment-form");
let paymentFormHeader = document.querySelector(".payment-form p");
let chosenMethodName;
paymentMethods.forEach((element) => {
  element.addEventListener("click", () => {
    if (paymentForm.style.display == "flex") {
      paymentForm.style.display = "none";
    } else {
      paymentForm.style.display = "flex";
      chosenMethodName = element.querySelector("h1").innerHTML;
      paymentFormHeader.innerHTML = chosenMethodName + " " + "payment";
    }
  });
});
//main section payment methods end

//main section payment form start

const paymentInput = document.querySelector(".payment-form input");
const paymentButton = document.querySelector(".payment-form button");
let history = document.querySelector("#history");

paymentButton.addEventListener("click", (e) => {
  e.preventDefault();
  if (Number(paymentInput.value) > totalBalance) {
    alert("You dont have enough money.");
    return (paymentInput.value = "");
  } else {
    totalBalance -= Number(paymentInput.value);
    userBalance.innerHTML = totalBalance + "$";
    paymentForm.style.display = "none";
    createHistoryElement(chosenMethodName, paymentInput.value);
    paymentInput.value = "";
  }
});

//main section payment form end

// main section history section start

function createHistoryElement(method, value) {
  let paymentHistory = document.createElement("div");
  paymentHistory.className = "payment";
  let paymentMethod = document.createElement("p");
  paymentMethod.className = "method";
  let paymentValue = document.createElement("p");
  paymentValue.className = "payment-value";
  paymentHistory.appendChild(paymentMethod);
  paymentHistory.appendChild(paymentValue);
  history.appendChild(paymentHistory);
  if (method == "Deposit") {
    paymentMethod.innerText += method;
    paymentValue.innerText += `+${value}$`;
    paymentValue.style.color = "green";
  } else {
    paymentMethod.innerText += method;
    paymentValue.innerText += `-${value}$`;
  }
}
//h main section history section end

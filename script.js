
let tl = gsap.timeline();

tl.from("#container", {
    y: 1000,
    opacity: 0,
    delay: 1,
    duration: 2,
    ease: "power3.out",
    scale: 0,
});

tl.from("#label", {
    y: 1000,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scale: 0,
})

tl.from("#from-to-container", {
    scale: 3,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scale: 2,
})

tl.from("#msgCont", {
    scale: 3,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scale: 2,
})

tl.from("#btn-div", {
    opacity: 0,
    duration: 2,
    ease: "power3.out",
    scale: 2,
    rotate: 360,
})

const Base_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/";


const dropdowns = document.querySelectorAll(".dropdown");

for (let select of dropdowns) {
    for (let currency in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currency;
        newOption.value = currency;
        select.append(newOption);
        if (select.name === "fromlist" && currency === "INR") {
            newOption.selected = true
        } else if (select.name === "tolist" && currency === "USD") {
            newOption.selected = true;
        }
    }
    select.addEventListener("change", (e) => {
        let currSelect = e.target;
        let currencyCode = currSelect.value;
        let countryCode = countryList[currencyCode];
        let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
        let parentOfSelect = currSelect.parentElement;
        let img = parentOfSelect.querySelector("img");
        img.src = newSrc;
    });
}

// Getting current rate prizes of clicking button

let btn = document.querySelector("#xchange-btn");

btn.addEventListener("click", async (e) => {
    e.preventDefault();

    let EnteredAmt = Number(document.querySelector("#label").value);

    if (!EnteredAmt || EnteredAmt <= 0) {
        alert("Please enter a valid amount");
    }

    // Get latest selected values HERE
    const fromCurrency = document.getElementById("fromselect").value;
    const toCurrency = document.getElementById("toselect").value;

    let curConversionURL = `${Base_URL}currencies/${fromCurrency.toLowerCase()}.json`;

    const response = await fetch(curConversionURL);
    const data = await response.json();
    console.log(data);

    const ratePerCurr = data[fromCurrency.toLowerCase()][toCurrency.toLowerCase()];
    console.log(ratePerCurr);
    const xchangegeRate = EnteredAmt * Number(ratePerCurr);

    let rateMsg = document.getElementById("msgpara");
    rateMsg.innerHTML = `1 ${fromCurrency} = ${ratePerCurr} ${toCurrency}`;

    let finalMsg = document.getElementById("xchange-msg");
    finalMsg.innerHTML = `${EnteredAmt} ${fromCurrency} = ${xchangegeRate.toFixed(2)} ${toCurrency}`;
});


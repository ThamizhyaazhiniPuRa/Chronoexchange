let coins = 0;
let history = [];

// Load saved data
window.onload = function () {
    const savedCoins = localStorage.getItem("coins");
    const savedHistory = localStorage.getItem("history");

    if (savedCoins) coins = parseInt(savedCoins);
    if (savedHistory) history = JSON.parse(savedHistory);

    updateUI();
};

// Save data
function saveData() {
    localStorage.setItem("coins", coins);
    localStorage.setItem("history", JSON.stringify(history));
}

// Update UI
function updateUI() {
    document.getElementById("coins").innerText = coins;

    const list = document.getElementById("history");
    list.innerHTML = "";

    history.forEach(item => {
        let li = document.createElement("li");
        li.innerText = item;
        list.appendChild(li);
    });
}

// Earn Coins
function earnCoins() {
    let service = document.getElementById("offerService").value;
    let hours = parseInt(document.getElementById("offerHours").value);

    if (!service || isNaN(hours) || hours <= 0) {
        alert("Enter valid service and hours");
        return;
    }

    let earned = hours * 10;
    coins += earned;

    history.push(`+${earned} coins for ${service}`);

    saveData();
    updateUI();
}

// Spend Coins
function spendCoins() {
    let service = document.getElementById("requestService").value;
    let hours = parseInt(document.getElementById("requestHours").value);

    if (!service || isNaN(hours) || hours <= 0) {
        alert("Enter valid service and hours");
        return;
    }

    let cost = hours * 10;

    if (coins >= cost) {
        coins -= cost;
        history.push(`-${cost} coins for ${service}`);
    } else {
        alert("Not enough coins!");
        return;
    }

    saveData();
    updateUI();
}

// Reset App
function resetApp() {
    if (confirm("Are you sure?")) {
        coins = 0;
        history = [];
        saveData();
        updateUI();
    }
}
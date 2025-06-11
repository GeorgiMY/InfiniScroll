// Generate 100 numbers at the start
for (let i = 0; i <= 100; i++) {
    const newNumber = document.createElement("p");
    newNumber.textContent = i.toString();

    const zeros = document.createElement("span");
    zeros.textContent = "0".repeat(10 - i.toString().length);
    zeros.style.color = "gray";
    newNumber.insertBefore(zeros, newNumber.firstChild);


    document.querySelector(".container").appendChild(newNumber);
}

// Generate numbers with each scroll

let scrollingDownNumber = 100;
let scrollingUpNumber = 1;
// int limit 2147483647 - 10 zeros

// Every 10ms, add the amount of lines generated in those 10ms to an array
// That means in a second there will be 100 entries in the array
// Every 100 lines (1 second), we remove the first element of the array
// Then we add the new lines generated in the last 10ms
let linesPerSeconds = [];
let newLines = 0;
function updateStats() {
    if (linesPerSeconds.length < 100) {
        linesPerSeconds.push(newLines);

        let sum = linesPerSeconds.reduce((a, b) => a + b, 0);

        document.getElementById('linesPerSecond').textContent = sum;
        newLines = 0;
    }
    else {
        linesPerSeconds.shift();
    }

    document.getElementById('totalLines').textContent = scrollingDownNumber + scrollingUpNumber;
}

window.addEventListener("wheel", (event) => {
    const newNumber = document.createElement("p");

    if (event.deltaY > 0) {
        newNumber.textContent = scrollingDownNumber.toString();

        const zeros = document.createElement("span");
        zeros.textContent = "0".repeat(10 - scrollingDownNumber.toString().length);
        zeros.style.color = "gray";
        newNumber.insertBefore(zeros, newNumber.firstChild);

        document.querySelector(".container").appendChild(newNumber);
        scrollingDownNumber++;
    } else if (event.deltaY < 0) {
        // upscroll code
        newNumber.textContent = scrollingUpNumber.toString();

        const zeros = document.createElement("span");
        zeros.textContent = "-" + "0".repeat(10 - scrollingUpNumber.toString().length);
        zeros.style.color = "gray";
        newNumber.insertBefore(zeros, newNumber.firstChild);

        document.querySelector(".container").insertBefore(newNumber, document.querySelector(".container").firstChild);
        scrollingUpNumber++;
    }

    newLines++;
});

setInterval(updateStats, 10);
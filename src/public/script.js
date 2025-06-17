let scrollingDownNumber = 101;
let scrollingUpNumber = 1;
let linesPerSeconds = [];
let newLines = 0;
let i = 0;
let y = 0;
let z = 0;
let reversei = 0;
let reversey = 0;
let reversez = 0;
let isNumberMode = true;
let currentWheelHandler = null;

// Initial wheel handler for number mode
const numberWheelHandler = (event) => {
    const newNumber = document.createElement("p");

    if (event.deltaY > 0) {
        // downscroll code
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
};

// Color mode wheel handler
const colorWheelHandler = (event) => {
    if (event.deltaY > 0) {
        // downscroll code
        for (let temp = 0; temp < 3; temp++) {
            const newDiv = document.createElement("div");
            newDiv.style.backgroundColor = "rgb(" + i + "," + y + "," + z + ")";
            newDiv.classList.add("color-div");
            document.querySelector(".container").appendChild(newDiv);

            i++;
            if (i === 255) {
                y++;
                i = 0;
            }
            if (y === 255) {
                z++;
                y = 0;
            }
        }

        scrollingDownNumber++;
    } else if (event.deltaY < 0) {
        // upscroll code
        for (let temp = 0; temp < 3; temp++) {
            const newDiv = document.createElement("div");
            newDiv.style.backgroundColor = "rgb(" + reversei + "," + reversey + "," + reversez + ")";
            newDiv.classList.add("color-div");
            document.querySelector(".container").insertBefore(newDiv, document.querySelector(".container").firstChild);

            reversei++;
            if (reversei === 255) {
                reversey++;
                reversei = 0;
            }
            if (reversey === 255) {
                reversez++;
                reversey = 0;
            }
        }
        scrollingUpNumber++;
    }

    newLines++;
};

// Puts the code in a starter position
const reset = () => {
    // Clear the container
    const container = document.querySelector('.container');
    container.innerHTML = '';

    // Reset counters
    scrollingDownNumber = 101;
    scrollingUpNumber = 1;
    i = 0;
    y = 0;
    z = 0;
    reversei = 0;
    reversey = 0;
    reversez = 0;
    linesPerSeconds = [];
    newLines = 0;

    // Update stats display
    document.getElementById('linesPerSecond').textContent = '0';
    document.getElementById('totalLines').textContent = '0';

    if (isNumberMode) {
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
    }
}

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

// Mode switch functionality
document.getElementById('modeSwitch').addEventListener('change', (event) => {
    isNumberMode = event.target.checked;

    // Remove current wheel handler
    window.removeEventListener("wheel", currentWheelHandler);

    // Set new wheel handler based on mode
    currentWheelHandler = isNumberMode ? numberWheelHandler : colorWheelHandler;
    window.addEventListener("wheel", currentWheelHandler);

    reset();
});

setInterval(updateStats, 10);

document.getElementById('resetButton').addEventListener('click', reset);

// Initialize the app with number mode
currentWheelHandler = numberWheelHandler;
window.addEventListener("wheel", currentWheelHandler);
reset();

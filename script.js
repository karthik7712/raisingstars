const operations = [
  { name: "Addition", symbol: "+", type: "add" },
  { name: "Subtraction", symbol: "-", type: "sub" },
  { name: "Multiplication", symbol: "×", type: "mul" },
  { name: "Division", symbol: "÷", type: "div" }
];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateNumbersForOperation(opType, index) {
  let nums = [];

    if (opType === "add") {
    let count = getRandomInt(3, 5); // min 3, max 5 numbers
    let digitPools = [];

    if (count >= 3) {
        digitPools.push([10000, 99999]); // 5-digit
        digitPools.push([1000, 9999]);   // 4-digit
        digitPools.push([10, 99]);       // 2-digit
    }
    if (count >= 4) {
        digitPools.push([100, 999]);     // 3-digit
    }
    if (count === 5) {
        digitPools.push([1, 9]);         // 1-digit
    }

    // Randomize the order so the positions vary
    digitPools.sort(() => Math.random() - 0.5);

    digitPools.forEach(([min, max]) => {
        nums.push(getRandomInt(min, max));
    });
    }

    if (opType === "sub") {
    let a = getRandomInt(1, 100000);
    let b = getRandomInt(1, 100000);

    // Ensure a is greater than b
    if (b > a) {
        [a, b] = [b, a];
    }

    nums = [a, b];
    }



  if (opType === "mul") {
    let a = getRandomInt(1, 100000);
    let b;
    if (index < 8) {
      b = getRandomInt(2, 20);
    } else {
      b = getRandomInt(10, 99);
    }
    nums = [a, b];
  }

  if (opType === "div") {
    let dividend = getRandomInt(100, 999999); // 3–6 digits
    // let divisor = getRandomInt(20, 99); // 2–3 digits
    if (index < 5) {
      divisor = getRandomInt(2, 10);
    } 
    else if (index > 8){
      divisor = getRandomInt(21, 99);
    }
    else{
        divisor = getRandomInt(11,20);
    }

    nums = [dividend, divisor];
  }

  return nums;
}

function calculateAnswer(nums, opType) {
  if (opType === "add") {
    return nums.reduce((a, b) => a + b);
  } 
  else if (opType === "sub") {
    return nums.reduce((a, b) => a - b);
  } 
  else if (opType === "mul") {
    return nums.reduce((a, b) => a * b);
  } 
  else if (opType === "div") {
    let quotient = Math.floor(nums[0] / nums[1]);
    let remainder = nums[0] % nums[1];
    return { Quotient: quotient, Remainder: remainder };
  }
}

function generateProblems() {
  const main = document.getElementById("main-content");
  main.innerHTML = "";

  operations.forEach(op => {
    const section = document.createElement("section");
    const heading = document.createElement("h2");
    heading.textContent = op.name;
    section.appendChild(heading);

    const problemsContainer = document.createElement("div");
    problemsContainer.className = "problems-container";
    section.appendChild(problemsContainer);

    function renderOperationProblems() {
      problemsContainer.innerHTML = "";
      for (let i = 0; i < 10; i++) {
        const nums = generateNumbersForOperation(op.type, i);
        let ans = calculateAnswer(nums, op.type);

        // Format answer for display
        let ansHTML;
        if (typeof ans === "object" && ans !== null) {
          ansHTML = `Q: ${ans.Quotient}, R: ${ans.Remainder}`;
        } else {
          ansHTML = ans;
        }

        const problem = document.createElement("div");
        problem.className = "problem";
        problem.innerHTML = `${i + 1}) ${nums.join(` ${op.symbol} `)} = <span class="answer" style="display:none">${ansHTML}</span>`;
        problemsContainer.appendChild(problem);
      }
    }

    renderOperationProblems();

    const btnContainer = document.createElement("div");
    btnContainer.style.marginTop = "10px";

    const showBtn = document.createElement("button");
    showBtn.textContent = "Show Answers";
    showBtn.className = "show-answers-btn";
    showBtn.addEventListener("click", () => {
      problemsContainer.querySelectorAll(".answer").forEach(ans => ans.style.display = "inline");
      showBtn.style.display = "none";
    });
    btnContainer.appendChild(showBtn);

    const refreshBtn = document.createElement("button");
    refreshBtn.textContent = "Refresh Problems";
    refreshBtn.className = "show-answers-btn refresh";
    refreshBtn.style.backgroundColor = "#28a745";
    refreshBtn.style.marginLeft = "10px";
    refreshBtn.addEventListener("click", () => {
      renderOperationProblems();
      showBtn.style.display = "inline";
    });
    btnContainer.appendChild(refreshBtn);

    section.appendChild(btnContainer);
    main.appendChild(section);
  });
}

generateProblems();


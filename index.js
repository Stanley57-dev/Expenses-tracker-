// Select elements
const form = document.getElementById("expense-form");
const descInput = document.getElementById("desc");
const amountInput = document.getElementById("amount");
const expenseList = document.getElementById("expense-list");
const totalEl = document.getElementById("total");

let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Function to render expenses
function renderExpenses() {
  expenseList.innerHTML = "";
  let total = 0;

  expenses.forEach((expense, index) => {
    total += expense.amount;

    const li = document.createElement("li");
    li.innerHTML = `
      <span>${expense.desc} - $${expense.amount}</span>
      <button onclick="deleteExpense(${index})">X</button>
    `;
    expenseList.appendChild(li);
  });

  totalEl.textContent = total;

  // Save to localStorage
  localStorage.setItem("expenses", JSON.stringify(expenses));
}

// Function to add expense
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const desc = descInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (desc && amount > 0) {
    expenses.push({ desc, amount });
    renderExpenses();

    descInput.value = "";
    amountInput.value = "";
  }
});

// Function to delete expense
function deleteExpense(index) {
  expenses.splice(index, 1);
  renderExpenses();
}

// Initial render
renderExpenses();
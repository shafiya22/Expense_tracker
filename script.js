let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

const form = document.getElementById("transaction-form");
const tableBody = document.querySelector("#transaction-table tbody");
const totalIncome = document.getElementById("total-income");
const totalExpense = document.getElementById("total-expense");
const netBalance = document.getElementById("net-balance");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const date = document.getElementById("date").value;
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.getElementById("type").value;

  if (!date || !description || !category || isNaN(amount)) {
    alert("Please fill out all fields correctly.");
    return;
  }

  const transaction = { id: Date.now(), date, description, category, amount, type };
  transactions.push(transaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  form.reset();
  renderTable();
});

function renderTable() {
  tableBody.innerHTML = "";
  let income = 0;
  let expense = 0;

  transactions.forEach((tx) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${tx.date}</td>
      <td>${tx.description}</td>
      <td>${tx.category}</td>
      <td>₹${tx.amount.toFixed(2)}</td>
      <td>${tx.type}</td>
      <td><button onclick="deleteTransaction(${tx.id})">Delete</button></td>
    `;

    tableBody.appendChild(row);

    if (tx.type === "income") income += tx.amount;
    else expense += tx.amount;
  });

  totalIncome.textContent = income.toFixed(2);
  totalExpense.textContent = expense.toFixed(2);
  netBalance.textContent = (income - expense).toFixed(2);
}

function deleteTransaction(id) {
  transactions = transactions.filter((tx) => tx.id !== id);
  localStorage.setItem("transactions", JSON.stringify(transactions));
  renderTable();
}

renderTable();

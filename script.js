// constructor
class PCPart {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}

// array
const pcParts = [];

// form DOM
const form = document.getElementById("priceListForm");
const partTable = document.getElementById("partTable");
const partList = document.getElementById("partList");
const totalCost = document.getElementById("totalCost");

// event listener submit
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // input value
  const partNameInput = document.getElementById("partName");
  const partPriceInput = document.getElementById("partPrice");
  const partName = partNameInput.value;
  const partPrice = parseFloat(partPriceInput.value);

  // new instance
  const newPart = new PCPart(partName, partPrice);

  // push to array
  pcParts.push(newPart);

  //  clear input fields
  partNameInput.value = "";
  partPriceInput.value = "";

  updatePartList();
  updateTotalCost();
});

// DOM Table

function updatePartList() {
  partList.innerHTML = "";

  pcParts.forEach((part, index) => {
    const row = document.createElement("tr");

    // No
    const listNumberCell = document.createElement("td");
    listNumberCell.textContent = index + 1;
    row.appendChild(listNumberCell);

    // name
    const nameCell = document.createElement("td");
    nameCell.textContent = part.name;
    row.appendChild(nameCell);

    // price
    const priceCell = document.createElement("td");
    priceCell.textContent = `$${part.price.toFixed(2)}`;
    row.appendChild(priceCell);

    // delete
    const deleteCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML =
      '<span class="material-symbols-outlined">delete</span>';
    deleteButton.style.fontSize = "24px";
    deleteButton.style.border = "0";
    deleteButton.style.color = "#ffb317";
    deleteButton.style.backgroundColor = "transparent";
    deleteButton.style.height = "24px";
    deleteButton.addEventListener("click", () => {
      pcParts.splice(index, 1);
      updatePartList();
      updateTotalCost();
    });

    deleteCell.appendChild(deleteButton);
    row.appendChild(deleteCell);

    partList.appendChild(row);
  });
}

// total price

function updateTotalCost() {
  const total = pcParts.reduce((sum, part) => sum + part.price, 0);
  totalCost.textContent = `$${total.toFixed(2)}`;
}


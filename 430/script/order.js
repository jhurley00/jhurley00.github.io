const items = {
    "Sofa": 450,
    "Dining Table": 600,
    "Bed Frame": 550,
    "Bookshelf": 120,
    "Desk": 200,
    "TV Stand": 180,
    "Coffee Table": 130,
    "Armchair": 250,
    "Wardrobe": 400,
    "Nightstand": 80
  };
  
  const table = document.getElementById("furnitureTable");
  for (const [name, price] of Object.entries(items)) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${name}</td>
      <td>$${price}</td>
      <td><input type="number" name="${name}" min="0" value="0"></td>
    `;
    table.appendChild(row);
  }
  
  document.getElementById("orderForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const order = [];
  
    for (const [item, price] of Object.entries(items)) {
      const qty = parseInt(formData.get(item)) || 0;
      if (qty > 0) {
        order.push({
          name: item,
          price: price,
          quantity: qty,
          total: price * qty
        });
      }
    }
  
    localStorage.setItem("furniOrder", JSON.stringify(order));
    window.location.href = "checkout.html";
  });
  
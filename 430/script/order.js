const items = {
    "Oak Dining Table": 300,
    "Leather Sofa": 900,
    "Wooden Coffee Table": 150,
    "Metal Bookshelf": 100,
    "Queen-sized Bed Frame": 400,
    "Office Chair": 95,
    "Glass TV Stand": 250,
    "Rustic Nightstand": 200,
    "Leather Accent Chair": 450,
    "Modern Wardrobe": 300
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
  
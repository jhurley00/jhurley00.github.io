const order = JSON.parse(localStorage.getItem("furniOrder") || "[]");
const summaryDiv = document.getElementById("checkoutSummary");

if (order.length === 0) {
  summaryDiv.innerHTML = "<p><strong>No items ordered.</strong></p>";
} else {
  let total = 0;
  let list = "<ul>";

  order.forEach(item => {
    list += `<li>${item.quantity} x ${item.name} at $${item.price} = $${item.total}</li>`;
    total += item.total;
  });

  list += "</ul>";
  list += `<h3>Total: $${total}</h3>`;
  summaryDiv.innerHTML = list;
}

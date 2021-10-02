let productList = [];


function loadProductList() {
  fetch("products.json")
    .then((r) => r.json())
    .then((products) => {
      productList = products;
      displayProductList(products);
    });
}

function displayProductList(p) {
  const html = p.map(prod => {
      return `<tr>
        <td>${prod.product}</td>
        <td>${prod.expiration}</td>
        <td>${prod.weight} g</td>
        <td>${prod.price} RON</td>
        <td></td>
      </tr>`
    });
  document.querySelector('tbody').innerHTML = html;
};

loadProductList();

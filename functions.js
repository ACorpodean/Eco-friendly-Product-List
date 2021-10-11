let productList = [];

function loadProductList() {
  fetch("data/products.json")
    .then((r) => r.json())
    .then((products) => {
      productList = products;
      displayProductList(products);
    });
}

function displayProductList(products) {
  const html = products
    .map((prod) => {
      console.info(typeof prod.expiration);
      console.warn(typeof prod.weight);
      console.error(typeof prod.price);
      return `<tr>
        <td>${prod.name}</td>
        <td>${prod.expiration}</td>
        <td>${prod.weight} g</td>
        <td>${prod.price} RON</td>
        <td>..</td>
      </tr>`;
    })
    .join(" ");
  document.querySelector("tbody").innerHTML = html;
}

function getProductValuesAsJson() {
  const name = document.querySelector('[name=name]').value;
  const expiration = document.querySelector('[name=exp-date]').value;
  const weight = document.querySelector('[name=weight]').value;
  const price = document.querySelector('[name=price]').value;

  return {
    name: name,
    expiration: expiration,
    weight: weight,
    price: price
  };
}

function saveProduct(product) {
  fetch("data/add-product.json", {
    method: "POST",
    body: JSON.stringify(product)
  })
  .then(r=> r.json())
  .then(status => {
    console.warn("status", status);
  })
}

function submitProduct() {
  const product = getProductValuesAsJson();
  console.warn(JSON.stringify(product));
  saveProduct(product);
}


loadProductList();

function searchProductNames() {
  const input = document.getElementById("searchinput");
  const inputvalue = input.value;
  console.log(input, inputvalue);
  const filtered = productList.filter((product) => {
    return product.name.toLowerCase().includes(inputvalue);
  });
  displayProductList(filtered);
}
document.getElementById("searchbutton").addEventListener("click", (e) => {
  searchProductNames();
});

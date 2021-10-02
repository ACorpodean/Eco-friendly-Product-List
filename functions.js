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
  const html = p
    .map((prod) => {
      // console.info(typeof prod.expiration);
      // console.warn(typeof prod.weight);
      // console.error(typeof prod.price);
      return `<tr>
        <td>${prod.product}</td>
        <td>${prod.expiration}</td>
        <td>${prod.weight} g</td>
        <td>${prod.price} RON</td>
        <td>..</td>
      </tr>`;
    })
    .join(" ");
  document.querySelector("tbody").innerHTML = html;
}

loadProductList();

function searchProductNames() {
  fetch("products.json")
    .then((r) => r.json())
    .then((products) => {
      const input = document.getElementById("searchinput");
      const inputvalue = input.value;
      console.log(input, inputvalue);
      productList = products;
      console.log(products);
      products.forEach((element) => console.log(element));
      const filtered = productList.filter((product) => {
        return product.product.toLowerCase().includes(inputvalue);
      });
      displayProductList(filtered);
    });
}
document.getElementById("Searchbutton").addEventListener("click", (e) => {
  searchProductNames();
});

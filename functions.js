let productList = [];

function loadProductList() {
  fetch("http://localhost:3000/products")
    .then((r) => r.json())
    .then((products) => {
      productList = products;
      displayProductList(products);
    });
}

function displayProductList(products) {
  const html = products
    .map((prod) => {
      // console.info(typeof prod.expiration);
      // console.warn(typeof prod.weight);
      // console.error(typeof prod.price);
      return `<tr>
        <td>${prod.name}</td>
        <td>${prod.expiration}</td>
        <td>${prod.weight} g</td>
        <td>${prod.price} RON</td>
        <td>
          <a href="#" class="delete-b" data-id="${prod.id}">&#10006;</a>
          <a href="#" class="edit-b">&#9998;</a>
        </td>
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
  fetch("http://localhost:3000/products-db/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(product)
  })
  .then(r=> r.json())
  .then(status => {
    console.warn("status", status);
    if (status.success) {
      loadProductList();
      document.querySelector('form').reset();
    }
  })
}

function submitProduct() {
  const product = getProductValuesAsJson();
  saveProduct(product);
}

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

loadProductList();

function deleteTeam(id) {
  fetch("http://localhost:3000/products-json/delete", {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({ id: id })
})
.then(r=> r.json())
.then(status => {
  console.warn("status", status);
  if (status.success) {
    loadProductList();
  }
})
}

document.querySelector('#productList tbody').addEventListener("click", e=> {
  if (e.target.matches("a.delete-b")) {
    const id = e.target.getAttribute("data-id");
    deleteTeam(id);
  }
});


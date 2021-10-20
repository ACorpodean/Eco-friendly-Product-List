let productList = [];

const API = {
  CREATE: {
    URL: "http://localhost:3000/products/create",
    METHOD: "POST"
  },
  READ: {
    URL: "http://localhost:3000/products",
    METHOD: "GET"
  },
  UPDATE: {
    URL: "http://localhost:3000/products/update",
    METHOD: "PUT"
  },
  DELETE: {
    URL: "http://localhost:3000/products/delete",
    METHOD: "DELETE"
  },
  EXPIRED: {
    URL: "http://localhost:3000/products/expired",
    METHOD: "GET"
  }
};

// for demo purposes...
if (location.host === "acorpodean.github.io") {
  API.READ.URL = "data/products.json";
  API.DELETE.URL = "data/delete.json";
  API.CREATE.URL = "data/create.json";
  API.UPDATE.URL = "data/update.json";
  API.EXPIRED.URL = "data/expired.json";

  API.READ.METHOD = "GET";
  API.DELETE.METHOD = "GET";
  API.CREATE.METHOD = "GET";
  API.UPDATE.METHOD = "GET";
  API.EXPIRED.METHOD = "GET";
}

function loadProductList() {
  fetch(API.READ.URL)
    .then((r) => r.json())
    .then((products) => {
      productList = products;
      displayProductList(products);
    });
}

function loadExpiredProductList() {
  fetch(API.EXPIRED.URL)
    .then((r) => r.json())
    .then((products) => {
      displayProductList(products);
    });
}

function displayProductList(products) {
  const html = products
    .map((prod) => {
      const expiredCls = prod.expired ? "warning" : "";
      const expiredImg = prod.expired ? "&#9888;" : "";
      return `<tr>
        <td>${prod.name}</td>
        <td  class="${expiredCls}"> ${prod.expiration} ${expiredImg}  </td>
        <td>${prod.weight} g</td>
        <td>${prod.price} RON</td>
        <td>
          <a href="#" class="delete-b" data-id="${prod.id}">&#10006;</a>
          <a href="#" class="edit-b" data-id="${prod.id}">&#9998;</a>
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
  fetch(API.CREATE.URL, {
    method: API.CREATE.METHOD,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(product)
  })
    .then(r => r.json())
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

function deleteTeam(id) {
  fetch(API.DELETE.URL, {
    method: API.DELETE.METHOD,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ id: id })
  })
    .then(r => r.json())
    .then(status => {
      console.warn("status", status);
      if (status.success) {
        loadProductList();
      }
    })
}

document.querySelector('#productList tbody').addEventListener("click", e => {
  if (e.target.matches("a.delete-b")) {
    const id = e.target.getAttribute("data-id");
    deleteTeam(id);
  }
});

document.querySelector('#productList tbody').addEventListener("click", e => {
  if (e.target.matches("a.edit-b")) {
    const id = e.target.getAttribute("data-id");
    console.info(id);
    //to add update function with id param
  }
});

document.getElementById("expiredButton").addEventListener("click", (e) => {
  loadExpiredProductList();
})


document.getElementById("allButton").addEventListener("click", (e) => {
  loadProductList();
})

loadProductList();



// to make update function
//to rename functions to suit project
//database search function
//database  -api functionality 
//interface work / interface api
//check products expired
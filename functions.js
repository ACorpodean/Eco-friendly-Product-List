let productList = [];
let editID;

const API = {
  CREATE: {
    URL: "http://localhost:3000/products/create",
    METHOD: "POST",
  },
  READ: {
    URL: "http://localhost:3000/products",
    METHOD: "GET",
  },
  UPDATE: {
    URL: "http://localhost:3000/products/update",
    METHOD: "PUT",
  },
  DELETE: {
    URL: "http://localhost:3000/products/delete",
    METHOD: "DELETE",
  },
  EXPIRED: {
    URL: "http://localhost:3000/products/expired",
    METHOD: "GET",
  },
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

function deleteProduct(id) {
  fetch(API.DELETE.URL, {
    method: API.DELETE.METHOD,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id }),
  })
    .then((r) => r.json())
    .then((status) => {
      if (status.success) {
        loadProductList();
      }
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

function editProduct(id) {
  editID = id;
  var p = productList.find((prod) => prod.id == id);
  populateInputs(p);
}

function loadProductList() {
  fetch(API.READ.URL)
    .then((r) => r.json())
    .then((products) => {
      productList = products;
      displayProductList(products);
    });
}

loadProductList();

function loadExpiredProductList() {
  fetch(API.EXPIRED.URL)
    .then((r) => r.json()) // aici e promisiunea
    .then((products) => {
      displayProductList(products); // aici e rezultat
    });
}

function getProductValuesAsJson() {
  const name = document.querySelector("[name=name]").value;
  const expiration = document.querySelector("[name=exp-date]").value;
  const weight = document.querySelector("[name=weight]").value;
  const price = document.querySelector("[name=price]").value;

  return {
    name: name,
    expiration: expiration,
    weight: weight,
    price: price,
  };
}

function populateInputs(p) {
  const name = p.name;
  const expiration = p.expirationUpdate;
  const weight = p.weight;
  const price = p.price;

  document.querySelector("[name=name]").value = name;
  document.querySelector("[name=exp-date]").value = expiration;
  document.querySelector("[name=weight]").value = weight;
  document.querySelector("[name=price]").value = price;
}

function saveProduct(product) {
  fetch(API.CREATE.URL, {
    method: API.CREATE.METHOD,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  })
    .then((r) => r.json())
    .then((status) => {
      if (status.success) {
        loadProductList();
        document.querySelector("form").reset();
      }
    });
}

function searchProductNames() {
  const input = document.getElementById("searchinput").value;
  const inputvalue = input.toLowerCase();
  const filtered = productList.filter((product) => {
    return product.name.toLowerCase().includes(inputvalue);
  });
  displayProductList(filtered);
  document.getElementById("searchinput").value = '';
}

document.getElementById("searchbutton").addEventListener("click", (e) => {
  searchProductNames();
});

document.querySelector("#productList tbody").addEventListener("click", (e) => {
  if (e.target.matches("a.delete-b")) {
    const id = e.target.getAttribute("data-id");
    deleteProduct(id);
  } else if (e.target.matches("a.edit-b")) {
    const id = e.target.getAttribute("data-id");
    editProduct(id);
  }
});

document.getElementById("expiredButton").addEventListener("click", (e) => {
  loadExpiredProductList();
});

document.getElementById("allButton").addEventListener("click", (e) => {
  loadProductList();
});

function submitProduct() {
  //legata din HTML
  const product = getProductValuesAsJson();
  if (editID) {
    product.id = editID;
    updateProduct(product);
  } else {
    saveProduct(product);
  }
}

function updateProduct(product) {
  fetch(API.UPDATE.URL, {
    method: API.UPDATE.METHOD,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  })
    .then((r) => r.json())
    .then((status) => {
      console.warn("status", status);
      if (status.success) {
        loadProductList();
        document.querySelector("form").reset();
        editID = false;
      }
    });
}

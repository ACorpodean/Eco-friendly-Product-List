function loadProducts() {
  fetch("products.json")
    .then((r) => r.json())
    .then((products) => {
      //   displayProducts(products);
      console.info("Products", products);
    });
}

loadProducts();

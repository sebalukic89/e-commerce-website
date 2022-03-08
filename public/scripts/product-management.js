const deleteProductButtonElements = document.querySelectorAll(
  '.product-item button'
);

function deleteProduct(event) {
  const buttonElement = event.target;
  const productId = buttonElement.dataset.productid;

  fetch('/admin/products/' + productId, {
    method: 'DELETE',
  });
}

for (const deleteProductButtonElement of deleteProductButtonElements) {
  deleteProductButtonElement.addEventListener('click');
}

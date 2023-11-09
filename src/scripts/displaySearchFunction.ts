import { IProduct } from "./IProduct";




export const displaySearchedProducts = (
  products: IProduct[],
  userInput: string,
  theHtmlElement: { innerHTML: string },
  errorMsg: { innerHTML: string }
) => {
  const matchingProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(userInput) ||
      product.brand.toLowerCase().includes(userInput) ||
      product.category.toLowerCase().includes(userInput)
  );

  if (matchingProducts.length > 0) {
    let showSearchProducts = "";

    matchingProducts.forEach((product) => {
      const highlightedTitle = highlightMatch(userInput, product.title);

      showSearchProducts += `
        <a href="product-page.html" class="click">
          <div class="search_card_image">
            <img src="${product.images[0]}" alt=""/>
          </div>
          <div class="search_card_description">
            <h4>${highlightedTitle}</h4>
            <h4 class="product_id">${product.id}</h4>
            <div class="search_card_price">
              <span class="">₦${(product.price * 520).toLocaleString()}</span>
              <span class="search_card_line_through">₦ ${Math.floor((product.price / (1 - (product.discountPercentage / 100)) * 520)).toLocaleString()}</span>
            </div>
          </div>
        </a>
      `;
    });

    theHtmlElement.innerHTML = showSearchProducts;

    const productCards = document.querySelectorAll(".click");
    productCards.forEach((product) => {
      product.addEventListener("click", () => {
        const productId = product.querySelector(".product_id").textContent;
        localStorage.setItem("clickedProductId", JSON.stringify(productId));
      });
    });
  } else {
    errorMsg.innerHTML = `<p>Oops! Product not available</p>`;
  }
};

const highlightMatch = (userInput: string, text: string) => {
  const regex = new RegExp(`(${userInput})`, 'gi');
  return text.replace(regex, (match) => `<span class="highlight">${match}</span>`);
};

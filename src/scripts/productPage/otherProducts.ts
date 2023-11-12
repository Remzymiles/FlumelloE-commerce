import { productPageHtmlElems } from "./productPageHtmlELems";


const {
    otherProductsContainer,
} = productPageHtmlElems




export const handleOtherProducts = (products) =>{
    const otherProducts = () => {
        let imageCardHTML = "";
      
        products.forEach((product) => {
          
          imageCardHTML += `
            <div class="slide_card">
              <a href="product-page.html" class="click">
                <span class="card_discount_percent">${product.discountPercentage}%</span>
                <div class="card_image">
                  <img src="${product.images[0]}" alt="${product.title}" />
                </div>
                <div class="card_description">
                  <h4 class="product_title">${product.title}</h4>
                  <h4 class= "product_id">${product.id}</h4>
                  <p class="product_remaining">${product.stock} Remaining</p>
                  <div class="card_price">
                    <p class="card_bold">₦ ${(product.price * 520).toLocaleString()}</p>
                    <p class="card_line_through">₦ ${Math.floor((product.price / (1 - (product.discountPercentage / 100)) * 520)).toLocaleString()}</p>
                  </div>
                </div>
              </a>
            </div>
          `;
        });
      
        otherProductsContainer.innerHTML = imageCardHTML;
      
        const productCards = document.querySelectorAll<HTMLAnchorElement>(".click");
        productCards.forEach((product) => {
          product.addEventListener("click", () => {
            const productId = product.querySelector<HTMLHeadingElement>(".product_id").textContent;
            localStorage.setItem("clickedProductId", JSON.stringify(productId));
          });
        });
      };
      otherProducts();
}
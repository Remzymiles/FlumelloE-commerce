import { IProduct } from "../interface/IProduct";

interface IShowProducts {
    products : IProduct[];
    productCardsGroupOne:{ innerHTML: string };
    productCardsGroupTwo:{ innerHTML: string };
    productCardsGroupThree: { innerHTML: string};
    productCardsGroupFour:{ innerHTML: string};

}


export const showProducts = (
  {products,
  productCardsGroupOne,
  productCardsGroupTwo,
  productCardsGroupThree,
  productCardsGroupFour}:IShowProducts
) => {
  const ImageCardsGroupOne = () => {
    let imageCardHTML = "";

    products.slice(0, 10).forEach((product) => {
      imageCardHTML += `
            <div class="slide_card">
              <a href="product-page.html" class="click" > 
                <span class="card_discount_percent">${
                  product.discountPercentage
                }%</span>
                <div class="card_image">
                  <img src="${product.images[0]}" alt="${product.title}" />
                </div>
                <div class="card_description">
                  <h4 class="product_title">${product.title}</h4>
                  <h4 class= "product_id">${product.id}</h4>
                  <p class="product_remaining">${product.stock} Remaining</p>
                  <div class="card_price">
                    <p class="card_bold">₦ ${(
                      product.price * 520
                    ).toLocaleString()}</p>
                    <p class="card_line_through">₦ ${Math.floor(
                      (product.price / (1 - product.discountPercentage / 100)) *
                        520
                    ).toLocaleString()}</p>
                  </div>
                </div>
              </a>
            </div>
          `;
    });

    productCardsGroupOne.innerHTML = imageCardHTML;

    const productCards = document.querySelectorAll(".click");
    productCards.forEach((product) => {
      product.addEventListener("click", () => {
        const productId = product.querySelector(".product_id").textContent;
        localStorage.setItem("clickedProductId", JSON.stringify(productId));
      });
    });
  };
  //{ IProduct } from "../IProduct";

  //
  const ImageCardsGroupTwo = () => {
    let imageCardHTML = "";

    products.slice(10, 20).forEach((product) => {
      imageCardHTML += `
            <div class="slide_card">
              <a href="product-page.html" class= "click">
                <span class="card_discount_percent" id="groceries">${
                  product.discountPercentage
                }%</span>
                <div class="card_image">
                  <img src="${product.images[0]}" alt="${product.title}" />
                </div>
                <div class="card_description">
                  <h4 class= "product_title">${product.title}</h4>
                  <h4 class= "product_id">${product.id}</h4>
                  <p class="product_remaining">${product.stock} Remaining</p>
                  <div class="card_price">
                    <p class="card_bold">₦ ${(
                      product.price * 520
                    ).toLocaleString()}</p>
                    <p class="card_line_through">₦ ${Math.floor(
                      (product.price / (1 - product.discountPercentage / 100)) *
                        520
                    ).toLocaleString()}</p>
                  </div>
                </div>
              </a>
            </div>
          `;
    });

    productCardsGroupTwo.innerHTML = imageCardHTML;

    const productCards = document.querySelectorAll(".click");
    productCards.forEach((product) => {
      product.addEventListener("click", () => {
        const productId = product.querySelector(".product_id").textContent;
        localStorage.setItem("clickedProductId", JSON.stringify(productId));
      });
    });
  };
  //

  //
  const ImageCardsGroupThree = () => {
    let imageCardHTML = "";

    products.slice(20, 30).forEach((product) => {
      imageCardHTML += `
            <div class="slide_card">
              <a href="product-page.html" class= "click">
                <span class="card_discount_percent" id="gadgets">${
                  product.discountPercentage
                }%</span>
                <div class="card_image">
                  <img src="${product.images[0]}" alt="${product.title}" />
                </div>
                <div class="card_description">
                  <h4 class= "product_title">${product.title}</h4>
                  <h4 class= "product_id">${product.id}</h4>
                  <p class="product_remaining">${product.stock} Remaining</p>
                  <div class="card_price">
                    <p class="card_bold">₦ ${(
                      product.price * 520
                    ).toLocaleString()}</p>
                    <p class="card_line_through">₦ ${Math.floor(
                      (product.price / (1 - product.discountPercentage / 100)) *
                        520
                    ).toLocaleString()}</p>
                  </div>
                </div>
              </a>
            </div>
          `;
    });

    productCardsGroupThree.innerHTML = imageCardHTML;

    const productCards = document.querySelectorAll(".click");
    productCards.forEach((product) => {
      product.addEventListener("click", () => {
        const productId = product.querySelector(".product_id").textContent;
        localStorage.setItem("clickedProductId", JSON.stringify(productId));
      });
    });
  };
  //

  //
  const ImageCardsGroupFour = () => {
    let imageCardHTML = "";

    products.slice(13, 26).forEach((product) => {
      imageCardHTML += `
            <div class="slide_card">
              <a href="product-page.html" class="click">
                <span class="card_discount_percent">${
                  product.discountPercentage
                }%</span>
      
                <div class="card_image">
                  <img src="${product.images[0]}" alt="${product.title}" />
                </div>
                <div class="card_description">
                  <h4 class= "product_title">${product.title}</h4>
                  <h4 class= "product_id">${product.id}</h4>
                  <p class="product_remaining">${product.stock} Remaining</p>
                  <div class="card_price">
                    <p class="card_bold">₦ ${(
                      product.price * 520
                    ).toLocaleString()}</p>
                    <p class="card_line_through">₦ ${Math.floor(
                      (product.price / (1 - product.discountPercentage / 100)) *
                        520
                    ).toLocaleString()}</p>
                  </div>
                </div>
              </a>
            </div>
          `;
    });
    productCardsGroupFour.innerHTML = imageCardHTML;

    const productCards = document.querySelectorAll<HTMLAnchorElement>(".click");
    productCards.forEach((product) => {
      product.addEventListener("click", () => {
        const productId =
          product.querySelector<HTMLHeadingElement>(".product_id").textContent;
        localStorage.setItem("clickedProductId", JSON.stringify(productId));
      });
    });
  };

//   calling the product group functions
ImageCardsGroupOne()
ImageCardsGroupTwo()
ImageCardsGroupThree()
ImageCardsGroupFour()


};

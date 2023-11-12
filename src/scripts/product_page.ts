import { IProduct } from "./interface/IProduct";
import { productPageHtmlElems } from "./productPage/productPageHtmlELems";
import { productPageImports } from "./productPageImports";
import { handleOtherProducts } from "./productPage/otherProducts";
//

const {
  storedUserLoginStatus,
  displaySearchedProducts,
  handleLogout,
  handleDropdownButtonStatus,
  handleCartIcon,
  handleProductCardArrows
} = productPageImports

const {
  signUpBtnElem,
  logInBtnElem ,
  logOutBtnElem,
  productDetailsContainer,
  loader,
  arrow,
  searchBarInputElem,
  searchBarContainer,
  searchSectionContainer,
  closeSearchIcon,
  searchedItemsContainerElem,
  searchErrorMsg,
  cartQuantity
} = productPageHtmlElems
//

//

// Global variable
let products: IProduct[];
let getSearchInput: string;
let addProductsToCart = JSON.parse(localStorage.getItem("addProductsToCart")) || [];
let productQuantityInput: string 
//


// get clicked product from local storage
const clickedProduct = JSON.parse(localStorage.getItem("clickedProductId"));
const productId = Number(clickedProduct);
//

// handle cart icon
handleCartIcon(cartQuantity)

//handle dropdown links
handleDropdownButtonStatus(signUpBtnElem,logInBtnElem);;
//

// handle search box
const handleSearchBox: EventListener = (e: Event): void => {
  e.preventDefault();
  //
  getSearchInput
    ? searchSectionContainer.classList.add("block_elem")
    : searchSectionContainer.classList.remove("block_elem");
  //
  handleGetProductFromApiById();
};
//

// get user input
const handleSearchBoxInput: EventListener = (e: Event): void => {
  const searchInput = e.target as HTMLInputElement;
  getSearchInput = searchInput.value;
};
//

// close the search section when the x icon is clicked
const handleClosingSearchSection: EventListener = (): void => {
  searchSectionContainer.classList.add("none_elem");
};
//


// find the product that matches the id and add it to the product page
const handleProduct:Function = () => {
  const matchingProduct = products.filter(
    (product) => product.id === productId
  );

  if (matchingProduct) {
     const productQuantityFromCart = addProductsToCart.find(product => product.newProductId === productId)
     const newProductQuantity = productQuantityFromCart ? productQuantityFromCart.productQuantity : 1;
    
    let showMatchedProducts = "";

    matchingProduct.forEach((product) => {
      showMatchedProducts = `
      <section class="product">
        <div class="image">
            <img src="${product.images[0]}" alt="${product.title}">
        </div>
        <div>
          <div class="text">
            <p>${product.title}</p>
            <h1>₦ ${(product.price * 520).toLocaleString()}</h1>
            <p class="card_line_through">₦ ${Math.floor((product.price / (1 - (product.discountPercentage / 100)) * 520)).toLocaleString()}</p>
            <p>${product.discountPercentage}% off</p>
            <p>Price shown before tax, Free shipping</p>
            <span>
            <i class="fa fa-star"></i><i class="fa fa-star"></i><i class="fa fa-star"></i>
            <i class="fa fa-star"></i><i class="fa fa-star"></i> 4.9 | ${(product.stock * 323).toLocaleString()}+ sold
            </span>
            <div class="product_quantity_input">
              <label for="quantity" id="product_quantity_label">Quantity:</label>
              <input type="number" name="quantity" id="product_quantity" min="1" value="${newProductQuantity}">
            </div>
            <div class="buttons">
                <a href="checkout.html" class="buy_now_btn">Buy Now</a>
                <a href="#" class="add_to_cart_btn"> Add To Cart</a>
            </div>
          </div>
        </div>
                </section>
                <hr>
                <div class="desc">
                    <h2>Description</h2>
                    <p>${product.description}</p>
                </div>`;
    });
    productDetailsContainer.innerHTML = showMatchedProducts;
// 
    const productQuantity = document.querySelector<HTMLInputElement>("#product_quantity");
    const addToCartBtnElem = document.querySelector<HTMLAnchorElement>(".add_to_cart_btn");
    const buyNowBtnElem = document.querySelector<HTMLAnchorElement>(".buy_now_btn");

    productQuantityInput = productQuantity.value;


    // handle get the product quantity
    const handleGetProductQuantity: EventListener = (e: Event): void => {
      const getQuantityInput = e.target as HTMLInputElement;
      productQuantityInput = getQuantityInput.value;
    };

    // 

    // handle cart icon
    handleCartIcon(cartQuantity)
    
    
    // 
    const handleAddToCart: EventListener = (e: Event): void => {
      if (!productQuantityInput || productQuantityInput === "0") {
        alert("product Quantity not added!");
        return;
      }
    
      // Check if the product already exists in the cart
      const existingProduct = addProductsToCart.find(
        (product) => product.newProductId === productId
      );
    
      if (!existingProduct) {
        const productToAddToCart = products.find((product) => product.id === productId);
    
        if (productToAddToCart) {
          const newProduct = {
            newProductId: productId,
            image: productToAddToCart.images[0],
            productName: productToAddToCart.title,
            productPrice: productToAddToCart.price,
            productStock: productToAddToCart.stock,
            productDiscountPercentage: productToAddToCart.discountPercentage,
            productQuantity: Number(productQuantityInput),
          };
    
          addProductsToCart.push(newProduct);
          handleCartIcon(cartQuantity); 
        }
      } else {
        existingProduct.productQuantity = Number(productQuantityInput);
        handleCartIcon(cartQuantity);
      }
    
      // Save the cart to localStorage
      localStorage.setItem("addProductsToCart", JSON.stringify(addProductsToCart));
    
      // Handle cart icon
      handleCartIcon(cartQuantity); 
    };

    // handle products for checkout
    const handleProductsForCheckout: EventListener = (e: Event):void =>{
    let checkoutProducts = []

      if (!productQuantityInput || productQuantityInput === "0") {
        e.preventDefault()
        alert("product Quantity not added!");
        return;
      }

      const productToAddToCheckout = products.find((product) => product.id === productId);

      const newCheckoutProduct = {
        checkoutProductId: productId,
        checkoutImage: productToAddToCheckout.images[0],
        checkoutProductName: productToAddToCheckout.title,
        checkoutProductPrice: productToAddToCheckout.price,
        checkoutProductStock: productToAddToCheckout.stock,
        checkoutProductDiscountPercentage: productToAddToCheckout.discountPercentage,
        checkoutProductQuantity: Number(productQuantityInput),
        isProductFromCart: false,
      };
      checkoutProducts.push(newCheckoutProduct)
      localStorage.setItem("checkoutProducts", JSON.stringify(checkoutProducts))
    }


    // 
    productQuantity.addEventListener("change", handleGetProductQuantity);
    addToCartBtnElem.addEventListener("click", handleAddToCart);
    buyNowBtnElem.addEventListener("click",  handleProductsForCheckout)
   
    //
  }
};
//

// handle image card arrows
handleProductCardArrows()

// handle get product from API by id
const handleGetProductFromApiById = async () => {
  arrow.forEach((arrow) => {
    arrow.classList.add("none_elem");
  });
  loader.forEach((loader) => {
    loader.classList.add("block_elem");
  });
  try {
    const res = await fetch(`https://dummyjson.com/products`);
    const data = await res.json();
    products = data.products;
    handleOtherProducts(products)
    handleProduct();
    displaySearchedProducts(
      products,
      searchBarInputElem.value.toLowerCase(),
      searchedItemsContainerElem,
      searchErrorMsg
      );

    arrow.forEach((arrow) => {
      arrow.classList.remove("none_elem");
    });
    //
    loader.forEach((loader) => {
      loader.classList.add("none_elem");
    });
  } catch (error) {
    console.error("An error occurred:", error);
  }
};
handleGetProductFromApiById();
//

//
logOutBtnElem.addEventListener("click", handleLogout);
searchBarInputElem.addEventListener("change", handleSearchBoxInput);
closeSearchIcon.addEventListener("click", handleClosingSearchSection);
searchBarContainer.addEventListener("submit", handleSearchBox);

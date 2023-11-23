import { IProduct } from "./interface/IProduct";
import { homepageElems } from "./homepage/homepageHtmlElems";

const {
    arrow,
    loader,
} = homepageElems

export  const handleGetAllProductsFromApi = async (): Promise<IProduct[]> => {
    arrow.forEach((arrow) => {
        arrow.classList.add("none_elem");
      });
      loader.forEach((loader) => {
        loader.classList.add("block_elem");
      });
    let allProducts: IProduct[]
    try {
      const res = await fetch(`https://dummyjson.com/products`);
      const data = await res.json();
      allProducts = data.products;
      return allProducts
    } catch (error) {
      console.log(error);
    }
  };
  handleGetAllProductsFromApi();
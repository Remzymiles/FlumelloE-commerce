import { cardWidth } from "./constants";
import { homepageElems } from "../homepage/homepageHtmlElems";


const {
    scrollContainer,
    leftArrow,
    rightArrow,
  } = homepageElems
  // 

export const handleProductCardArrows = () =>{
    const scrollLeft = (container) => () => {
        container.scrollBy({
          left: -cardWidth,
          behavior: "smooth",
        });
      };
      //
      const scrollRight = (container) => () => {
        container.scrollBy({
          left: cardWidth,
          behavior: "smooth",
        });
      };
      
      for (let i = 0; i < leftArrow.length; i++) {
        leftArrow[i].addEventListener("click", scrollLeft(scrollContainer[i]));
      
        rightArrow[i].addEventListener("click", scrollRight(scrollContainer[i]));
      }
}
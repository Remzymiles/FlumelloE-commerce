import { cardWidth } from "./constants";
import { homepageElems } from "../homepage/homepageHtmlElems";

const { scrollContainer, leftArrow, rightArrow } = homepageElems;
//

export const handleProductCardArrows = () => {
  const handleScroll =
    (container: HTMLDivElement, scrollWidth: number) => () => {
      container.scrollBy({
        left: scrollWidth,
        behavior: "smooth",
      });
    };
  //

  for (let i = 0; i < leftArrow.length; i++) {
    leftArrow[i].addEventListener(
      "click",
      handleScroll(scrollContainer[i], -cardWidth)
    );

    rightArrow[i].addEventListener(
      "click",
      handleScroll(scrollContainer[i], cardWidth)
    );
  }
};

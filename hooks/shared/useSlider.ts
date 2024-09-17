import { RefObject } from 'react'; // Make sure to import RefObject if you're using React

interface SliderFunctions {
  moveLeft: () => void;
  moveRight: () => void;
  openMobileNav: (ref: RefObject<HTMLElement>) => void;
  closeMobileNav: (ref: RefObject<HTMLElement>) => void;
}

export const useSlider = (
  items: any[], // Change 'any' to the actual type of your items
  size: number,
  container: any,
  prev: any,
  next: any,
): SliderFunctions => {
  const categoriesWidth = getSectionCategoryWidth(size, items?.length);

  const moveLeft = (): void => {
    const { width } = container.current?.getBoundingClientRect() || { width: 0 };
    const scrollLeft = container.current?.scrollLeft || 0;

    if (scrollLeft > 0) {
      container.current!.scrollLeft -= size;

      if (scrollLeft < width) {
        next.current?.classList.remove('disabled');
      }
    } else {
      prev.current?.classList.add('disabled');
      prev.current?.setAttribute('disabled', 'true');
    }
  };

  const moveRight = (): void => {
    const { width } = container.current?.getBoundingClientRect() || { width: 0 };
    const scrollLeft = container.current?.scrollLeft || 0;

    if (scrollLeft + width < categoriesWidth) {
      container.current!.scrollLeft += size;
      prev.current?.classList.remove('disabled');
      next.current?.classList.remove('disabled');
    } else {
      next.current?.classList.add('disabled');
      next.current?.setAttribute('disabled', 'true');
    }
  };

  const openMobileNav = (ref: RefObject<HTMLElement>): void => {
    ref.current!.style.width = '100%';
  };

  const closeMobileNav = (ref: RefObject<HTMLElement>): void => {
    ref.current!.style.width = '0';
  };

  function getSectionCategoryWidth(length: number, size: number) {
    return length * size;
  }
  return {
    moveLeft,
    moveRight,
    openMobileNav,
    closeMobileNav,
  };
};

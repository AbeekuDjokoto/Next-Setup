import { CarouselImage } from '@/types';

export function SliderContent({
  activeIndex,
  sliderImage,
}: {
  activeIndex: number;
  sliderImage: CarouselImage[];
}) {
  return (
    <section>
      {sliderImage.map((image, index) => (
        <div
          key={index}
          className={index === activeIndex ? 'relative inline-block w-full' : 'hidden'}>
          <img src={image.src} alt={image.description} className="w-full max-h-[400px] h-full" />
        </div>
      ))}
    </section>
  );
}

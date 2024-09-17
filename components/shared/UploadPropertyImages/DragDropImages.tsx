'use client';
import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import CloseIcon from '@/public/assets/icons/circle-xmark-solid.svg';

interface ImageProps {
  image: string;
  index: number;
  moveImage: (fromIndex: number, toIndex: number) => void;
  onRemoveImg: (fileName: string) => void;
  fileName: string;
}

interface DragItem {
  index: number;
  type: string;
}

const Image: React.FC<ImageProps> = ({ image, index, fileName, moveImage, onRemoveImg }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [, drag] = useDrag<DragItem, void, { isDragging: boolean }>({
    type: 'IMAGE',
    item: { type: 'IMAGE', index },
  });

  const [, drop] = useDrop<DragItem, void, { isOver: boolean }>({
    accept: 'IMAGE',
    hover: (draggedItem) => {
      if (draggedItem.index !== index && ref.current) {
        moveImage(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  drag(drop(ref));

  return (
    <div ref={ref} className="relative w-[140px] h-[140px] cursor-move">
      <img src={image} alt={`Image ${index}`} className="w-full h-full object-cover" />
      <CloseIcon
        className="absolute right-[-8px] top-[-8px] cursor-pointer hover:text-red-500"
        onClick={() => onRemoveImg(fileName)}
      />
    </div>
  );
};

interface ImageListProps {
  imageList: File[];
  setImageList: React.Dispatch<React.SetStateAction<File[]>>;
}

const DragDropImages: React.FC<ImageListProps> = ({ imageList, setImageList }) => {
  const moveImage = (fromIndex: number, toIndex: number) => {
    const updatedList = [...imageList];
    const movedItem = updatedList.splice(fromIndex, 1)[0];
    updatedList.splice(toIndex, 0, movedItem);
    setImageList(updatedList);
  };

  const onRemoveImg = (fileName: string) => {
    setImageList((prev) => prev.filter((file) => file.name !== fileName));
  };

  return (
    <div className="flex items-center gap-4 flex-wrap">
      {imageList.map((image, index) => {
        const url = URL.createObjectURL(image);
        return (
          <Image
            key={index}
            image={url}
            fileName={image.name}
            index={index}
            moveImage={moveImage}
            onRemoveImg={onRemoveImg}
          />
        );
      })}
    </div>
  );
};

export { DragDropImages };

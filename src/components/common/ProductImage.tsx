import React, { useState, useEffect } from 'react';
import { resolveProductImageUrl, BRIGADEIRO_PLACEHOLDER_IMAGE } from '../../data/products';

interface ProductImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
}

const EXTENSIONS_TO_TRY = ['.webp', '.jpg', '.jpeg', '.png'];

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  fallbackSrc = BRIGADEIRO_PLACEHOLDER_IMAGE,
  className = 'w-full h-full object-cover',
  ...props
}) => {
  const initialResolved = resolveProductImageUrl(src);
  const [currentSrc, setCurrentSrc] = useState<string>(initialResolved);
  const [attemptedExtIndex, setAttemptedExtIndex] = useState<number>(0);
  const [isFailed, setIsFailed] = useState<boolean>(false);

  useEffect(() => {
    const newResolved = resolveProductImageUrl(src);
    setCurrentSrc(newResolved);
    setAttemptedExtIndex(0);
    setIsFailed(false);
  }, [src]);

  const handleError = () => {
    // If the image is a local brigadeiro path with an extension, attempt format fallback (.webp -> .jpg -> .jpeg -> .png)
    const match = currentSrc.match(/^(.+)(\.(webp|jpg|jpeg|png))$/i);
    if (match && !isFailed) {
      const basePath = match[1];
      const nextIndex = attemptedExtIndex + 1;

      if (nextIndex < EXTENSIONS_TO_TRY.length) {
        setAttemptedExtIndex(nextIndex);
        setCurrentSrc(`${basePath}${EXTENSIONS_TO_TRY[nextIndex]}`);
        return;
      }
    }

    // If all format extensions fail or it was already the fallback, switch to universal fallback
    if (currentSrc !== fallbackSrc) {
      setIsFailed(true);
      setCurrentSrc(fallbackSrc);
    }
  };

  return (
    <img
      src={currentSrc}
      alt={alt || 'Brigadeiro gourmet artesanal Encanto Gourmet'}
      onError={handleError}
      className={className}
      referrerPolicy="no-referrer"
      loading={props.loading || 'lazy'}
      {...props}
    />
  );
};

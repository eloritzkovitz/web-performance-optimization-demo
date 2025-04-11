import React from "react";

interface ImageListProps {
  images: string[];
  visibleImages: number;
}

const ImageList: React.FC<ImageListProps> = ({ images, visibleImages }) => {
  return (
    <>
      {images.slice(0, visibleImages).map((src, index) => (
        <img
          key={index}
          src={src}
          alt={`Image ${index + 1}`}
          loading="lazy" // Lazy load images
          width="1920"
          height="1080"
          style={{
            width: "100%",
            objectFit: "cover",
            marginTop: "1rem",
            borderRadius: "8px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        />
      ))}
    </>
  );
};

export default ImageList;
import { useEffect, useState } from "react";
import { fetchImages } from "../utils/imageUtils";

// BaselinePage component
const BaselinePage = () => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch image URLs from the backend
  useEffect(() => {
    const loadImages = async () => {
      setLoading(true);
      const data = await fetchImages("jpg");
      setImages(data);
      setLoading(false);
    };

    loadImages();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Unoptimized Page</h1>
      <div className="mb-4" />
      <p>This page loads everything up front, including large images and components.</p>

      {/* Show loading spinner while fetching images */}
      {loading && <p>Loading images...</p>}

      {/* Render all images */}
      {!loading &&
        images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Image ${index + 1}`}
            style={{
              width: "100%",
              marginTop: "1rem",
            }}
          />
        ))}

      {/* Render the heavy component */}
      <HeavyComponent />
    </div>
  );
};

// Heavy component that renders a lot of items
const HeavyComponent = () => {
  const data = Array(10000).fill("Rendering lots of items");
  return (
    <div>
      {data.map((item, index) => (
        <p
          key={index}
          style={{
            padding: "0.5rem",
            margin: "0.5rem 0",
            backgroundColor: index % 2 === 0 ? "#f8f9fa" : "#e9ecef",
            borderRadius: "4px",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          {item} #{index + 1}
        </p>
      ))}
    </div>
  );
};

export default BaselinePage;
import React, { Suspense, useState, useEffect, useRef } from "react";
import { fetchImages } from "../utils/imageUtils";

// Lazy load the HeavyComponent
const LazyHeavyComponent = React.lazy(
  () => import("../components/HeavyComponent")
);

// OptimizedPage component
const OptimizedPage = () => {
  const [images, setImages] = useState<string[]>([]);
  const [visibleImages, setVisibleImages] = useState(1);
  const [loading, setLoading] = useState(true);  
  const loadMoreRef = useRef<HTMLDivElement | null>(null); 
  const [showHeavy, setShowHeavy] = useState(false);

  // Fetch image URLs from the backend
  useEffect(() => {
    const loadImages = async () => {
      setLoading(true);
      const data = await fetchImages("avif");
      setImages(data);
      setLoading(false);
    };

    loadImages();
  }, []);

  // Intersection Observer to load more images when scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setVisibleImages((prev) => Math.min(prev + 1, images.length));
        }
      },
      { rootMargin: "100px", threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [images.length]);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Optimized Page</h1>
      <p>
        This page defers loading of heavy content and uses lazy loading for
        images and components.
      </p>

      {/* Show loading spinner while fetching images */}
      {loading && <p>Loading images...</p>}

      {/* Render all visible images with lazy loading */}
      {!loading &&
        Array.isArray(images) &&
        images.slice(0, visibleImages).map((src, index) => (
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

      {/* Load more trigger */}
      {!loading && visibleImages < images.length && (
        <div
          ref={loadMoreRef}
          style={{
            height: "50px",
            marginTop: "1rem",
            backgroundColor: "#f0f0f0",
            textAlign: "center",
            lineHeight: "50px",
            borderRadius: "4px",
          }}
        >
          Scroll to load more images...
        </div>
      )}

      {/* Button to load heavy content */}
      <button
        style={{ marginTop: "1rem" }}
        onClick={() => {
          setShowHeavy(true);
        }}
      >
        Load More Content
      </button>

      {/* Lazy-loaded heavy component */}
      {showHeavy && (
        <Suspense fallback={<p>Loading heavy component...</p>}>
          <LazyHeavyComponent />
        </Suspense>
      )}
    </div>
  );
};

export default OptimizedPage;
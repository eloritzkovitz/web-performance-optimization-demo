import React, { Suspense, useState, useEffect, useRef } from "react";
import { fetchImages } from "../utils/imageUtils";
import ImageList from "../components/ImageList"; // Import the new component

const LazyHeavyComponent = React.lazy(
  () => import("../components/HeavyComponent")
);

const OptimizedPage = () => {
  const [images, setImages] = useState<string[]>([]);
  const [visibleImages, setVisibleImages] = useState(1);
  const [loading, setLoading] = useState(true);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const [showHeavy, setShowHeavy] = useState(false);

  useEffect(() => {
    const loadImages = async () => {
      setLoading(true);
      const data = await fetchImages("avif");
      setImages(data);
      setLoading(false);
    };

    loadImages();
  }, []);

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

      {loading && <p>Loading images...</p>}

      {!loading && <ImageList images={images} visibleImages={visibleImages} />}

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

      <button
        style={{ marginTop: "1rem" }}
        onClick={() => {
          setShowHeavy(true);
        }}
      >
        Load More Content
      </button>

      {showHeavy && (
        <Suspense fallback={<p>Loading heavy component...</p>}>
          <LazyHeavyComponent />
        </Suspense>
      )}
    </div>
  );
};

export default OptimizedPage;
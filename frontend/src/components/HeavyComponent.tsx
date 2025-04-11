import { useState, useRef, useEffect } from "react";

const HeavyComponent = () => {
  const totalItems = 10000; // Total number of items
  const pageSize = 100; // Number of items to load per page
  const [visibleItems, setVisibleItems] = useState(pageSize); // Track how many items are visible
  const loadMoreRef = useRef<HTMLDivElement | null>(null); // Ref for the load more trigger

  useEffect(() => {
    // Intersection Observer to load more items when scrolling
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setVisibleItems((prev) => Math.min(prev + pageSize, totalItems)); // Load the next page
        }
      },
      { threshold: 1.0 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, []);

  const data = Array(totalItems).fill("Rendering lots of items");

  return (
    <div>
      {data.slice(0, visibleItems).map((item, index) => (
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
      {visibleItems < totalItems && (
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
          Loading more items...
        </div>
      )}
    </div>
  );
};

export default HeavyComponent;
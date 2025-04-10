import React, { Suspense, useState } from 'react';

const LazyHeavyComponent = React.lazy(() => import('../components/HeavyComponent'));

const OptimizedPage = () => {
  const [showHeavy, setShowHeavy] = useState(false);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Optimized Page</h1>
      <div className="mb-4"/>
      <p>This page defers loading of heavy content and uses lazy loading for large components.</p>
      <img
        src="https://via.placeholder.com/800x400"
        alt="Placeholder"
        style={{ width: '100%', marginTop: '1rem' }}
        loading="lazy"
      />

      <button style={{ marginTop: '1rem' }} onClick={() => setShowHeavy(true)}>
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
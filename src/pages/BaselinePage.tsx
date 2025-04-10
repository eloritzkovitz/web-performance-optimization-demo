const BaselinePage = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Unoptimized Page</h1>
      <div className="mb-4"/>
      <p>This page loads everything up front, including large images and components.</p>
      <img
        src="https://via.placeholder.com/800x400"
        alt="Placeholder"
        style={{ width: '100%', marginTop: '1rem' }}
      />
      <HeavyComponent />
    </div>
  );
};

const HeavyComponent = () => {
  const data = Array(10000).fill('Rendering lots of items');
  return (
    <div>
      {data.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </div>
  );
};

export default BaselinePage;
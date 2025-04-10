const HeavyComponent = () => {
  const data = Array(10000).fill('Rendering lots of items (optimized)');
  return (
    <div>
      {data.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </div>
  );
};

export default HeavyComponent;
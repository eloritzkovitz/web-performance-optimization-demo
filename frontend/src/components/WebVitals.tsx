import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { onLCP, onINP, onCLS, onFCP, onTTFB } from "web-vitals";

interface Metrics {
  lcp: number | null;
  inp: number | null;
  cls: number | null;
  fcp: number | null;
  ttfb: number | null;
}

const WebVitals = () => {
  const [metrics, setMetrics] = useState<Metrics>({
    lcp: null,
    inp: null,
    cls: null,
    fcp: null,
    ttfb: null,
  });

  const location = useLocation(); // Detect the current route

  useEffect(() => {
    // Reset metrics when the route changes
    setMetrics({
      lcp: null,
      inp: null,
      cls: null,
      fcp: null,
      ttfb: null,
    });

    const handleMetric = (metric: { name: string; value: number }) => {
      setMetrics((prevMetrics) => ({
        ...prevMetrics,
        [metric.name.toLowerCase()]: metric.value,
      }));
    };

    // Re-measure Web Vitals metrics
    onLCP(handleMetric);
    onINP(handleMetric);
    onCLS(handleMetric);
    onFCP(handleMetric);
    onTTFB(handleMetric);    

    // Cleanup function to reset metrics when the component unmounts
    return () => {
      setMetrics({
        lcp: null,
        inp: null,
        cls: null,
        fcp: null,
        ttfb: null,
      });
    };
  }, [location.pathname]); // Re-run when the route changes

  return (
    <div style={{ padding: "1rem", border: "1px solid #ccc", borderRadius: "8px", backgroundColor: "#fff" }}>
      <h2>Web Vitals Metrics</h2>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        <li>
          <strong>LCP:</strong> {metrics.lcp !== null ? `${metrics.lcp.toFixed(2)} ms` : "Loading..."}
        </li>
        <li>
          <strong>INP:</strong> {metrics.inp !== null ? `${metrics.inp.toFixed(2)} ms` : "Loading..."}
        </li>
        <li>
          <strong>CLS:</strong> {metrics.cls !== null ? metrics.cls.toFixed(2) : "Loading..."}
        </li>
        <li>
          <strong>FCP:</strong> {metrics.fcp !== null ? `${metrics.fcp.toFixed(2)} ms` : "Loading..."}
        </li>
        <li>
          <strong>TTFB:</strong> {metrics.ttfb !== null ? `${metrics.ttfb.toFixed(2)} ms` : "Loading..."}
        </li>
      </ul>
    </div>
  );
};

export default WebVitals;
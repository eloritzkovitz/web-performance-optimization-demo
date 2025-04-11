import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import WebVitals from "../components/WebVitals";

interface MainPageProps {
  children: ReactNode;
}

export default function MainPage({ children }: MainPageProps) {
  const location = useLocation();

  return (
    <div className="vh-100 vw-100 d-flex bg-light">
      {/* Fixed Header */}
      <header
        className="text-center py-4 bg-white text-dark shadow"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 1000,
        }}
      >
        <Link to="/" className="text-decoration-none text-dark">
          <h1 className="display-4">Web Performance Optimization Demo</h1>
        </Link>
      </header>

      {/* Fixed Sidebar */}
      <nav
        className="mt-5"
        style={{
          position: "fixed",
          top: "100px",
          left: 0,
          height: "calc(100% - 100px)",
          width: "250px",
          overflowY: "auto",
          zIndex: 1000,
        }}
      >
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="text-decoration-none text-primary" to="/baseline">
              Unoptimized Page
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="text-decoration-none text-success" to="/optimized">
              Optimized Page
            </Link>
          </li>
          <div className="mt-4" />
          <WebVitals />         
        </ul>
      </nav>

      {/* Main Content */}
      <div
        className="d-flex flex-grow-1"
        style={{
          marginLeft: "250px",
          marginTop: "100px",
          overflowY: "auto",
          width: "calc(100% - 250px)",
        }}
      >
        <div className="container-fluid mt-5">
          <div className="row w-100 mx-0">
            <main className="col-md-12">
              <div className="card shadow-sm">
                <div className="card-body">
                  {/* Only show this content on the root path */}
                  {location.pathname === "/" && (
                    <>
                      <h1>Main Page</h1>
                      <div className="mb-4" />
                      <p>
                        Welcome to the <strong>Web Performance Optimization Demo</strong>. This application, written in TypeScript and React, demonstrates the impact of various optimization techniques on web performance. You can explore the differences between an <strong>unoptimized page</strong> and an <strong>optimized page</strong> that leverages modern techniques, such as:
                      </p>
                      <ul>
                        <li><strong>Code Splitting:</strong> Breaking down JavaScript bundles into smaller chunks to load only what is needed.</li>
                        <li><strong>Lazy Loading:</strong> Deferring the loading of non-critical resources until they are needed.</li>
                        <li><strong>Caching:</strong> Storing frequently accessed resources to reduce network requests.</li>
                        <li><strong>Text Compression:</strong> Minimizing the size of text-based resources using Brotli or Gzip.</li>
                        <li><strong>New Image Formats:</strong> Replacing .jpg images with .avif - a modern, better compressed format.</li>
                      </ul>
                      <p>
                        Additionally, this demo tracks key <strong>Web Vitals</strong> metrics to measure and improve user experience. Below is an explanation of the core Web Vitals parameters:
                      </p>
                      <ul>
                        <li>
                          <strong>Largest Contentful Paint (LCP):</strong> Measures the time it takes for the largest visible content (e.g., an image or text block) to load and render. A good LCP score is under <strong>2.5 seconds</strong>.
                        </li>
                        <li>
                          <strong>Interaction to Next Paint (INP):</strong> Evaluates the responsiveness of the page by measuring the delay between user interactions (e.g., clicks, taps) and the next visual update. A good INP score is under <strong>200 milliseconds</strong>.
                        </li>
                        <li>
                          <strong>Cumulative Layout Shift (CLS):</strong> Measures the visual stability of the page by tracking unexpected layout shifts. A good CLS score is under <strong>0.1</strong>.
                        </li>
                        <li>
                          <strong>First Contentful Paint (FCP):</strong> Measures the time it takes for the first piece of content (e.g., text, image) to appear on the screen. A good FCP score is under <strong>1.8 seconds</strong>.
                        </li>
                        <li>
                          <strong>Time to First Byte (TTFB):</strong> Measures the time it takes for the server to respond to the initial request. A good TTFB score is under <strong>200 milliseconds</strong>.
                        </li>
                      </ul>
                      <p>
                        Use the navigation links on the left to explore the <strong>Unoptimized Page</strong> and the <strong>Optimized Page</strong>. Observe how these techniques improve performance and user experience.
                      </p>
                    </>
                  )}
                  {children}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
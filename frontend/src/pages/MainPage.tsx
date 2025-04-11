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
                        This demo showcases the difference between an unoptimized
                        web page and one that has been enhanced with various
                        optimization techniques: code splitting, lazy loading, cachiing, and more.
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
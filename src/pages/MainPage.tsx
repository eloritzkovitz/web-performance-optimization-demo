import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

interface MainPageProps {
  children: ReactNode;
}

export default function MainPage({ children }: MainPageProps) {
  const location = useLocation();

  return (
    <div className="vh-100 vw-100 d-flex flex-column bg-light">
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

      {/* Scrollable Content */}
      <div
        className="d-flex flex-grow-1 justify-content-center w-100 overflow-y-auto"
        style={{ marginTop: "100px" }}
      >
        <div className="container-fluid mt-5">
          <div className="row w-100 mx-0">
            <nav className="col-md-3 mb-4">
              <ul className="list-group">
                <li className="list-group-item">
                  <Link
                    className="text-decoration-none text-primary"
                    to="/baseline"
                  >
                    Unoptimized Page
                  </Link>
                </li>
                <li className="list-group-item">
                  <Link
                    className="text-decoration-none text-success"
                    to="/optimized"
                  >
                    Optimized Page
                  </Link>
                </li>
              </ul>
            </nav>
            <main className="col-md-9">
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
                        optimization techniques. Explore the links on the left to
                        see how performance improvements can impact user experience.
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
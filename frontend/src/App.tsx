import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Sidebar } from "./components/layout/Sidebar";
import { FootprintProvider } from "./context/FootprintContext";

// Pages
import { DashboardView } from "./pages/DashboardView";
import { UploadView } from "./pages/UploadView";
import { AnalysisView } from "./pages/AnalysisView";
import { ReportsView } from "./pages/ReportsView";
import { VerificationView } from "./pages/VerificationView";

/**
 * Application shell: Composes the sidebar layout and route transitions
 * around the global FootprintProvider.
 */
export default function App() {
  const location = useLocation();

  return (
    <FootprintProvider>
      <div className="app-shell">
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        
        <Sidebar />

        <main id="main-content" className="main-content" role="main">
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<DashboardView />} />
              <Route path="/upload" element={<UploadView />} />
              <Route path="/analysis" element={<AnalysisView />} />
              <Route path="/reports" element={<ReportsView />} />
              <Route path="/verification" element={<VerificationView />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </FootprintProvider>
  );
}

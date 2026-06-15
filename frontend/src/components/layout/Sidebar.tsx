import { NavLink } from "react-router-dom";
import { LayoutDashboard, UploadCloud, Brain, FileText, ShieldCheck } from "lucide-react";

export function Sidebar() {
  return (
    <nav className="sidebar" aria-label="Main Navigation">
      <div className="sidebar-logo">
        <ShieldCheck className="w-6 h-6 text-teal-400" />
        <span>Carbon Ledger</span>
      </div>
      
      <div className="sidebar-nav">
        <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`} end>
          <LayoutDashboard className="w-5 h-5" />
          Dashboard
        </NavLink>
        <NavLink to="/upload" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          <UploadCloud className="w-5 h-5" />
          Upload Evidence
        </NavLink>
        <NavLink to="/analysis" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          <Brain className="w-5 h-5" />
          AI Analysis
        </NavLink>
        <NavLink to="/reports" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          <FileText className="w-5 h-5" />
          Reports
        </NavLink>
        <NavLink to="/verification" className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
          <ShieldCheck className="w-5 h-5" />
          Verification
        </NavLink>
      </div>
    </nav>
  );
}

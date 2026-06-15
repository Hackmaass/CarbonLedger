import { PageLayout } from "../components/layout/PageLayout";
import { useGlobalFootprint } from "../context/FootprintContext";
import { Link } from "react-router-dom";
import { Brain, FileText, UploadCloud } from "lucide-react";

export function DashboardView() {
  const { entries } = useGlobalFootprint();
  
  const totalEntries = entries.length;
  const recentEntry = entries[0];

  return (
    <PageLayout title="Dashboard" description="Overview of your carbon audit telemetry.">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
        <div className="card glass-panel">
          <h3 style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "0.5rem" }}>Total Audits</h3>
          <p style={{ fontSize: "2rem", fontWeight: "700", margin: 0 }}>{totalEntries}</p>
        </div>
        <div className="card glass-panel">
          <h3 style={{ color: "var(--text-muted)", fontSize: "0.9rem", marginBottom: "0.5rem" }}>Latest AI Audit Score</h3>
          <p style={{ fontSize: "2rem", fontWeight: "700", margin: 0, color: "var(--primary)" }}>
            {recentEntry ? `${recentEntry.result.total_annual_kg.toFixed(1)} kg` : "--"}
          </p>
        </div>
      </div>

      <h2 style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>Quick Actions</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
        <Link to="/upload" className="card glass-panel" style={{ textDecoration: "none", transition: "transform 0.1s", display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ padding: "0.75rem", background: "var(--bg-hover)", borderRadius: "8px" }}><UploadCloud /></div>
          <div>
            <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>Upload Evidence</div>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Parse utility bills</div>
          </div>
        </Link>
        <Link to="/analysis" className="card glass-panel" style={{ textDecoration: "none", transition: "transform 0.1s", display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ padding: "0.75rem", background: "var(--bg-hover)", borderRadius: "8px" }}><Brain /></div>
          <div>
            <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>Manual Audit</div>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Input metrics directly</div>
          </div>
        </Link>
        <Link to="/reports" className="card glass-panel" style={{ textDecoration: "none", transition: "transform 0.1s", display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ padding: "0.75rem", background: "var(--bg-hover)", borderRadius: "8px" }}><FileText /></div>
          <div>
            <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>View Reports</div>
            <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Past telemetry</div>
          </div>
        </Link>
      </div>
    </PageLayout>
  );
}

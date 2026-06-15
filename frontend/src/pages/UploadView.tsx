import { PageLayout } from "../components/layout/PageLayout";
import { UploadCloud } from "lucide-react";

export function UploadView() {
  return (
    <PageLayout title="Upload Evidence" description="Securely upload utility bills or receipts for automated AI extraction.">
      <div className="card glass-panel" style={{ textAlign: "center", padding: "4rem 2rem", border: "2px dashed var(--border-focus)" }}>
        <UploadCloud style={{ width: "48px", height: "48px", margin: "0 auto 1rem", color: "var(--primary)" }} />
        <h2 style={{ marginBottom: "0.5rem" }}>Drag & drop evidence here</h2>
        <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>Supports JPEG, PNG, and WebP (Max 10MB)</p>
        <button className="btn primary">Select File</button>
      </div>
    </PageLayout>
  );
}

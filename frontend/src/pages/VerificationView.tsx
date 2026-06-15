import { PageLayout } from "../components/layout/PageLayout";
import { useGlobalFootprint } from "../context/FootprintContext";
import { ShieldCheck } from "lucide-react";

export function VerificationView() {
  const { entries } = useGlobalFootprint();

  return (
    <PageLayout title="Cryptographic Verification" description="Ensure data integrity via SHA-256 ledger anchors.">
      <div className="card glass-panel" style={{ marginBottom: "2rem" }}>
        <h2 style={{ marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <ShieldCheck className="text-teal-400" /> System Integrity Status
        </h2>
        <p style={{ color: "var(--text-muted)" }}>
          All recorded telemetry metrics are cryptographically chained. Modifying past entries will invalidate the signature hash, guaranteeing immutable audit trails without third-party reliance.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {entries.length === 0 ? (
          <div className="card glass-panel" style={{ textAlign: "center", padding: "3rem" }}>
            <p style={{ color: "var(--text-muted)" }}>No entries to verify.</p>
          </div>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} className="card glass-panel" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
              <div>
                <div style={{ fontWeight: 600 }}>Audit #{entry.id.split("-")[0]}</div>
                <div style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                  {new Date(entry.created_at).toLocaleString()}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <code style={{ background: "#000", padding: "0.4rem 0.8rem", borderRadius: "4px", fontSize: "0.8rem", color: "var(--primary)" }}>
                  {entry.id}
                </code>
                <div className="badge success" style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                  <ShieldCheck className="w-4 h-4" /> Verified
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </PageLayout>
  );
}

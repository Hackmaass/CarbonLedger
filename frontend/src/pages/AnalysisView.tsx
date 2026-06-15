import { PageLayout } from "../components/layout/PageLayout";
import { CalculatorForm } from "../components/CalculatorForm";
import { ResultBreakdown } from "../components/ResultBreakdown";
import { InsightsPanel } from "../components/InsightsPanel";
import { useGlobalFootprint } from "../context/FootprintContext";

export function AnalysisView() {
  const { result, insights, loading, saving, calculate, save } = useGlobalFootprint();

  return (
    <PageLayout title="AI Analysis" description="Process telemetry data through the Carbon Engine to generate insights.">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "2rem" }}>
        
        <div>
          <CalculatorForm onSubmit={calculate} loading={loading} />
        </div>

        <div>
          {loading && (
            <div className="card glass-panel skeleton" style={{ height: "300px" }} />
          )}

          {!loading && !result && (
            <div className="card glass-panel" style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
              <p style={{ color: "var(--text-muted)" }}>Awaiting telemetry input...</p>
            </div>
          )}

          {!loading && result && (
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <ResultBreakdown result={result} />
              {insights && <InsightsPanel insights={insights} />}
              <button className="btn primary" style={{ width: "100%" }} onClick={save} disabled={saving}>
                {saving ? "Commiting to Ledger..." : "Commit Verification"}
              </button>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}

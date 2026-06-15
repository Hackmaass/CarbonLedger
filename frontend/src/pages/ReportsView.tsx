import { PageLayout } from "../components/layout/PageLayout";
import { HistoryPanel } from "../components/HistoryPanel";
import { useGlobalFootprint } from "../context/FootprintContext";

export function ReportsView() {
  const { entries } = useGlobalFootprint();

  return (
    <PageLayout title="Telemetry Reports" description="Historical audit entries securely logged to the ledger.">
      <div className="card glass-panel">
        <HistoryPanel entries={entries} />
      </div>
    </PageLayout>
  );
}

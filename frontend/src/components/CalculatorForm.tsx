import { useState } from "react";
import { type CarbonInput, emptyInput } from "../lib/types";
import { extractDataFromImage } from "../lib/api";
import { TransportSection } from "./TransportSection";
import { HomeSection } from "./HomeSection";
import { DietConsumptionSection } from "./DietConsumptionSection";

interface Props {
  onSubmit: (input: CarbonInput) => void;
  loading: boolean;
}

/** Accessible footprint input form: labelled controls grouped in fieldsets. */
export function CalculatorForm({ onSubmit, loading }: Props) {
  const [input, setInput] = useState<CarbonInput>(emptyInput);
  const [auditing, setAuditing] = useState(false);
  const [auditError, setAuditError] = useState<string | null>(null);

  // Type-safe section updaters — each patch is checked against the schema.
  const patchTransport = (patch: Partial<CarbonInput["transport"]>) =>
    setInput((p) => ({ ...p, transport: { ...p.transport, ...patch } }));
  const patchHome = (patch: Partial<CarbonInput["home"]>) =>
    setInput((p) => ({ ...p, home: { ...p.home, ...patch } }));
  const patchConsumption = (patch: Partial<CarbonInput["consumption"]>) =>
    setInput((p) => ({ ...p, consumption: { ...p.consumption, ...patch } }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(input);
  };

  const handleAuditFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAuditing(true);
    setAuditError(null);
    try {
      const data = await extractDataFromImage(file);
      if (data.home) patchHome(data.home);
      if (data.consumption) patchConsumption(data.consumption);
    } catch (err) {
      setAuditError(err instanceof Error ? err.message : "Extraction failed");
    } finally {
      setAuditing(false);
      // Reset input value so same file can be uploaded again if needed
      e.target.value = "";
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit} aria-labelledby="calc-heading">
      <h2 id="calc-heading">Estimate your annual footprint</h2>

      <div className="audit-section">
        <label htmlFor="audit-upload" className="btn secondary outline">
          {auditing ? "Extracting..." : "✨ AI Audit: Upload Bill/Receipt"}
        </label>
        <input
          id="audit-upload"
          type="file"
          accept="image/*"
          className="visually-hidden"
          onChange={handleAuditFile}
          disabled={auditing}
        />
        {auditError && <p className="error small">{auditError}</p>}
        <p className="hint">
          Upload an electricity bill, gas bill, or grocery receipt to auto-fill fields.
        </p>
      </div>

      <TransportSection transport={input.transport} onChange={patchTransport} />
      <HomeSection home={input.home} onChange={patchHome} />
      <DietConsumptionSection
        diet={input.diet}
        onDietChange={(diet) => setInput((p) => ({ ...p, diet }))}
        consumption={input.consumption}
        onConsumptionChange={patchConsumption}
      />

      <button className="btn" type="submit" disabled={loading} aria-busy={loading}>
        {loading ? "Calculating…" : "Calculate my footprint"}
      </button>
    </form>
  );
}

import { type CarbonInput } from "../lib/types";
import { NumberField } from "./NumberField";

interface Props {
  home: CarbonInput["home"];
  onChange: (patch: Partial<CarbonInput["home"]>) => void;
}

const MAX_KWH_MONTH = 100_000;
const MAX_HOUSEHOLD = 50;

export function HomeSection({ home, onChange }: Props) {
  return (
    <fieldset>
      <legend>Home energy</legend>
      <NumberField
        id="electricity"
        label="Electricity per month (kWh)"
        max={MAX_KWH_MONTH}
        value={home.electricity_kwh_per_month}
        onChange={(v) => onChange({ electricity_kwh_per_month: v })}
      />
      <NumberField
        id="gas"
        label="Natural gas per month (kWh)"
        max={MAX_KWH_MONTH}
        value={home.natural_gas_kwh_per_month}
        onChange={(v) => onChange({ natural_gas_kwh_per_month: v })}
      />
      <NumberField
        id="household"
        label="People in household"
        min={1}
        max={MAX_HOUSEHOLD}
        step={1}
        hint="Home energy is shared across this many people."
        value={home.household_size}
        onChange={(v) => onChange({ household_size: v })}
      />
    </fieldset>
  );
}

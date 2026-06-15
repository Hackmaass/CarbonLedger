import { type CarbonInput, type DietType } from "../lib/types";
import { NumberField } from "./NumberField";

interface Props {
  diet: DietType;
  onDietChange: (diet: DietType) => void;
  consumption: CarbonInput["consumption"];
  onConsumptionChange: (patch: Partial<CarbonInput["consumption"]>) => void;
}

const MAX_USD_MONTH = 1_000_000;
const MAX_WASTE_WEEK = 1_000;

const DIET_OPTIONS: { value: DietType; label: string }[] = [
  { value: "heavy_meat", label: "Heavy meat eater" },
  { value: "medium_meat", label: "Average meat eater" },
  { value: "low_meat", label: "Low meat" },
  { value: "pescatarian", label: "Pescatarian" },
  { value: "vegetarian", label: "Vegetarian" },
  { value: "vegan", label: "Vegan" },
];

export function DietConsumptionSection({
  diet,
  onDietChange,
  consumption,
  onConsumptionChange,
}: Props) {
  return (
    <fieldset>
      <legend>Diet &amp; consumption</legend>
      <div className="field">
        <label htmlFor="diet">Diet</label>
        <select
          id="diet"
          value={diet}
          onChange={(e) => onDietChange(e.target.value as DietType)}
        >
          {DIET_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      <NumberField
        id="goods"
        label="Goods spending per month (USD)"
        max={MAX_USD_MONTH}
        value={consumption.goods_spend_usd_per_month}
        onChange={(v) => onConsumptionChange({ goods_spend_usd_per_month: v })}
      />
      <NumberField
        id="waste"
        label="Landfill waste per week (kg)"
        max={MAX_WASTE_WEEK}
        value={consumption.waste_kg_per_week}
        onChange={(v) => onConsumptionChange({ waste_kg_per_week: v })}
      />
    </fieldset>
  );
}

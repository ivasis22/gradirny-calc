import { ResultField } from "./ResultField";
import { Section } from "./Section";

export const CalculationIntermediateValuesSection = ({ formik, autoResults }) => (
    <Section title="Вычисление промежуточных величин">
      <ResultField
        label="Плотность орошения (gₓ)"
        value={autoResults.gx}
        unit="м³/м²·ч"
      />
      <ResultField
        label="Мощность теплосъема (Q)"
        value={autoResults.q}
        unit="МВт"
      />
      <ResultField
        label="При q1"
        value={formik.values.airParameters.humidity}
        unit="кПа"
      />
    </Section>
  );
import { ResultField } from "./ResultField";
import { Section } from "./Section";

export const CalculationWaterDebetSection = ({ formik, autoResults }) => (
    <Section title="Вычисление расхода воды">
      <ResultField
        label="Капельный унос"
        value={autoResults.gy}
        unit="м3/ч"
      />
      {/* <ResultField
        label="Мощность теплосъема (Q)"
        value={autoResults.q}
        unit="МВт"
      />
      <ResultField
        label="При q1"
        value={formik.values.airParameters.humidity}
        unit="кПа"
      /> */}
    </Section>
  );
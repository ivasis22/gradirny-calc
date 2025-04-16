import { InputField } from "./InputField";
import { Section } from "./Section";

export const ParametersOutdoorAirSection = ({ formik }) => (
    <Section title="Параметры наружного воздуха обеспеченность 0,95 для г. Волгоград">
        <InputField
            label="Относительная влажность воздуха (φ)"
            name="airParameters.humidity"
            formik={formik}
            unit="%"
        />
    </Section>
  );
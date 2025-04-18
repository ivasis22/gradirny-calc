import { InputField } from "./InputField";
import { Section } from "./Section";

export const ParametersOutdoorAirSection = ({ formik }) => (
    <Section title="Параметры наружного воздуха обеспеченность 0,95 для г. Волгоград">
        <InputField
            label="Температура по сухому термометру"
            name="airParameters.temperature_dry"
            formik={formik}
            unit="°C"
        />
        <InputField
            label="Относительная влажность воздуха (φ)"
            name="airParameters.humidity"
            formik={formik}
            unit="%"
        />
        <InputField
            label="Барометрическое давление (Pб)"
            name="airParameters.barometric_press" 
            formik={formik}
            unit="кПа"
        />
    </Section>
  );
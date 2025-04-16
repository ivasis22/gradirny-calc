import { InputField } from "./InputField";
import { Section } from "./Section";

export const InitialDataSection = ({ formik }) => (
    <Section title="Исходные данные для расчёта">
        <InputField
            label="Производительность градирни (Gг)"
            name="initialData.g1"
            formik={formik}
            unit="м³/ч"
        />
        <InputField
            label="Количество секций (n)"
            name="initialData.n"
            formik={formik}
            unit=""
        />
        <InputField
            label="Температура входящей воды (t₁)"
            name="initialData.t1"
            formik={formik}
            unit="°C"
        />
        <InputField
            label="Температура охлаждённой воды (t₂)"
            name="initialData.t2"
            formik={formik}
            unit="°C"
        />
    </Section>
  );
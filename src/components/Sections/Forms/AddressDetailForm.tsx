import FormikFieldSelect from "@/components/shared/FormikFieldSelect";
import { useTranslation } from "@/i18n";

export default function AddressDetailForm() {
  const {translate} = useTranslation()
  return (
    <>
      <FormikFieldSelect
        title={translate("INPUTTITLE.TITLE")}
        name="title"
        value="MR"
        required
        options={["MR", "Mrs"]}
      />

      <FormikFieldSelect
        title={translate("INPUTTITLE.NATIONALITY")}
        name="nationality"
        value="Pakistani"
        required
        options={["Saudi", "Pakistani"]}
      />

      <FormikFieldSelect
        title={translate("INPUTTITLE.GENDER")}
        name="gender"
        value="Male"
        required
        options={["Male", "Female"]}
      />

      <FormikFieldSelect
        title={translate("INPUTTITLE.REGION")}
        name="region"
        value="Middle east"
        required
        options={["Middle east"]}
      />

      <FormikFieldSelect
        title={translate("INPUTTITLE.CITY")}
        name="city"
        value="Middle east"
        required
        options={["Riyadh"]}
      />

      <FormikFieldSelect
        title={translate("INPUTTITLE.MARITAL_STATUS")}
        name="maritalStatus"
        value="Single"
        required
        options={["Single", "Married"]}
      />

      <FormikFieldSelect
        title={translate("INPUTTITLE.DEPENDENTS")}
        name="dependents"
        value="1"
        required
        options={["0", "1", "2", "3"]}
      />
    </>
  );
}

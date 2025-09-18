import FormikField from "@/components/shared/FormikFieldInput";
import { useTranslation } from "@/i18n";

export default function BasicInfoForm() {
  const {translate} = useTranslation()
  
  return (
    <>
      <FormikField
        title={translate("INPUTTITLE.NATIONAL_ID")}
        name="nationalId"
        required
        type="text"
        placeholder="Enter your National ID / Iqama Number"
      />
      <FormikField
        title={translate("INPUTTITLE.DOB")}
        name="dob"
        required
        type="date"
        placeholder="Enter your National ID / Iqama Number"
      />
      <FormikField
        title={translate("INPUTTITLE.PHONE")}
        name="phone"
        required
        type="tel"
        placeholder="9665XXXXXXXX"
      />
      <FormikField
        title={translate("INPUTTITLE.EMAIL")}
        name="email"
        type="email"
        placeholder="Email"
      />
    </>
  );
}

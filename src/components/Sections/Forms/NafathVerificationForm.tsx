import FormikField from "@/components/shared/FormikFieldInput";
import FormikFieldRadio from "@/components/shared/FormikFieldRadio";
import FormikFieldSelect from "@/components/shared/FormikFieldSelect";
import { useTranslation } from "@/i18n";

export default function NafathVarificationForm({ values }: { values: any }) {
  const { translate } = useTranslation();
  return (
    <>
      <FormikFieldSelect
        value="Military"
        title={translate("INPUTTITLE.EMPLOYMENT_TYPE")}
        required
        name="employmentType"
        options={["Military", "Government", "Private Sector"]}
      />

      <FormikFieldSelect
        value="Masters Degree"
        title={translate("INPUTTITLE.EDUCATION_LEVEL")}
        required
        name="education"
        options={["Masters Degree", "Bachelors", "Diploma"]}
      />

      <FormikFieldSelect
        value="Rental"
        title={translate("INPUTTITLE.RESIDENT_STATUS")}
        name="residentStatus"
        required
        options={["Rental", "Owned"]}
      />

      <FormikFieldSelect
        value="Government"
        title={translate("INPUTTITLE.EMPLOYMENT_SECTOR")}
        required
        name="employmentSector"
        options={["Private Sector", "Government"]}
      />

      <FormikFieldSelect
        value="Manager"
        title={translate("INPUTTITLE.OCCUPATION")}
        required
        name="occupation"
        options={["Agent Sergeant", "Manager", "Engineer"]}
      />

      <FormikField
        title={translate("INPUTTITLE.JOINING_DATE")}
        name="joiningDate"
        required
        type="date"
        placeholder="Enter your joining date"
      />

      <FormikFieldRadio
        title={translate("INPUTTITLE.PEP")}
        name="pep"
        value="no"
        required
      />
      <div></div>
      <FormikFieldRadio
        title={translate("INPUTTITLE.BENEFICIARY")}
        name="beneficiary"
        value="no"
        required
      />

      <FormikField
        title={translate("INPUTTITLE.BENEFICIARY_NAME")}
        name="beneficiaryName"
        disabled={values.beneficiary !== "no"}
        type="text"
        required={values.beneficiary === "no"}
        placeholder="Beneficiary name"
      />

      <FormikFieldRadio
        title={translate("INPUTTITLE.RELATIONSHIP")}
        name="relationship"
        value="no"
        required
      />

      <FormikFieldSelect
        value="Grandparents"
        title={translate("INPUTTITLE.RELATIONSHIP_POSITION")}
        name="relationshipPosition"
        disabled={values.relationship !== "yes"}
        required={values.relationship === "yes"}
        options={["Grandparents", "Father", "Friend"]}
      />

      <>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          {translate("TITLE.FINANCIAL_DETAILS")}
        </h3>
        <div></div>

        <FormikField
          title={translate("INPUTTITLE.FOOD_EXPENSES")}
          name="food"
          required
          type="number"
          placeholder="0"
        />

        <FormikField
          title={translate("INPUTTITLE.HOUSING_EXPENSES")}
          name="housing"
          required
          type="number"
          placeholder="0"
        />

        <FormikField
          title={translate("INPUTTITLE.DOMESTIC_EXPENSES")}
          name="domestic"
          type="number"
          required
          placeholder="0"
        />

        <FormikField
          title={translate("INPUTTITLE.EDUCATION_EXPENSES")}
          name="educationExpenses"
          type="number"
          required
          placeholder="0"
        />

        <FormikField
          title={translate("INPUTTITLE.HEALTHCARE_EXPENSES")}
          name="healthcare"
          type="number"
          required
          placeholder="0"
        />

        <FormikField
          title={translate("INPUTTITLE.TRANSPORT_EXPENSES")}
          name="transport"
          type="number"
          required
          placeholder="0"
        />

        <FormikField
          title={translate("INPUTTITLE.INSURANCE_EXPENSES")}
          name="insurance"
          type="number"
          required
          placeholder="0"
        />

        <FormikField
          title={translate("INPUTTITLE.FUTURE_EXPENSES")}
          name="future"
          required
          type="number"
          placeholder="0"
        />

        <FormikField
          title={translate("INPUTTITLE.TOTAL_EXPENSES")}
          name="total"
          required
          type="number"
          placeholder="0"
        />
      </>
    </>
  );
}

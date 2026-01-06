"use client";

import { useFormikContext } from "formik";
import FormikField from "@/components/shared/FormikFieldInput";
import FormikFieldRadio from "@/components/shared/FormikFieldRadio";
import FormikFieldSelect from "@/components/shared/FormikFieldSelect";
import { useTranslation } from "@/i18n";
import {
  useGetEmploymentCategoriesQuery,
  useGetOccupationsQuery,
  useGetEmploymentSectorsQuery,
  useGetEducationLevelsQuery,
  useGetResidentialStatusQuery,
  useGetRelatedPartiesQuery,
} from "@/lib/services/lookupApi";
import FormikCalendar from "@/components/ui/FormikCalender";

export default function NafathVarificationForm({ values }: { values: any }) {
  const { translate } = useTranslation();
  const { values: formikValues } = useFormikContext<any>();

  // Fetch lookup data
  const { data: employmentCategories, isLoading: employmentCategoriesLoading } =
    useGetEmploymentCategoriesQuery();
  const { data: educationLevels, isLoading: educationLevelsLoading } =
    useGetEducationLevelsQuery();
  const { data: residentialStatus, isLoading: residentialStatusLoading } =
    useGetResidentialStatusQuery();
  const { data: employmentSectors, isLoading: employmentSectorsLoading } =
    useGetEmploymentSectorsQuery();
  const { data: occupations, isLoading: occupationsLoading } =
    useGetOccupationsQuery();
  const { data: relatedParties, isLoading: relatedPartiesLoading } =
    useGetRelatedPartiesQuery();

  return (
    <>
      <FormikFieldSelect
        title={translate("INPUTTITLE.EMPLOYMENT_TYPE")}
        name="employmentType"
        required
        options={employmentCategories}
        loading={employmentCategoriesLoading}
        optionValueKey="EMPCATGID"
        optionLabelKey="EMPCATGNAME"
      />

      <FormikFieldSelect
        title={translate("INPUTTITLE.EDUCATION_LEVEL")}
        name="education"
        required
        options={educationLevels}
        loading={educationLevelsLoading}
        optionValueKey="QUALIFICATIONID"
        optionLabelKey="QUALIFICATION"
      />

      <FormikFieldSelect
        title={translate("INPUTTITLE.RESIDENT_STATUS")}
        name="residentStatus"
        required
        options={residentialStatus}
        loading={residentialStatusLoading}
        optionValueKey="RESIDENTID"
        optionLabelKey="RESIDENT_STATUS"
      />

      <FormikFieldSelect
        title={translate("INPUTTITLE.EMPLOYMENT_SECTOR")}
        name="employmentSector"
        required
        options={employmentSectors}
        loading={employmentSectorsLoading}
        optionValueKey="SECTORID"
        optionLabelKey="SECTOR"
      />

      <FormikFieldSelect
        title={translate("INPUTTITLE.OCCUPATION")}
        name="occupation"
        required
        options={occupations}
        loading={occupationsLoading}
        optionValueKey="OCCUPATIONID"
        optionLabelKey="OCCUPATIONNAME"
      />

      <FormikCalendar
        label={translate("INPUTTITLE.JOINING_DATE")}
        name="joiningDate"
        required
        placeholder="Enter your joining date"
      />

      <FormikFieldRadio
        title={translate("INPUTTITLE.PEP")}
        name="pep"
        value="N"
        required
      />

      <FormikFieldRadio
        title={translate("INPUTTITLE.BENEFICIARY")}
        name="beneficiary"
        value="N"
        required
      />

      <FormikField
        title={translate("INPUTTITLE.BENEFICIARY_NAME")}
        name="beneficiaryName"
        disabled={formikValues.beneficiary !== "N"}
        type="text"
        required={formikValues.beneficiary === "N"}
        placeholder="Beneficiary name"
      />

      <FormikFieldRadio
        title={translate("INPUTTITLE.RELATIONSHIP")}
        name="relationship"
        value="N"
        required
      />

      <FormikFieldSelect
        title={translate("INPUTTITLE.RELATIONSHIP_POSITION")}
        name="relationshipPosition"
        required={formikValues.relationship === "Y"}
        disabled={formikValues.relationship !== "Y"}
        options={relatedParties}
        loading={relatedPartiesLoading}
        optionValueKey="PARTYID"
        optionLabelKey="PARTY"
      />

      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        {translate("TITLE.FINANCIAL_DETAILS")}
      </h3>

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
        required
        type="number"
        placeholder="0"
      />
      <FormikField
        title={translate("INPUTTITLE.EDUCATION_EXPENSES")}
        name="educationExpenses"
        required
        type="number"
        placeholder="0"
      />
      <FormikField
        title={translate("INPUTTITLE.HEALTHCARE_EXPENSES")}
        name="healthcare"
        required
        type="number"
        placeholder="0"
      />
      <FormikField
        title={translate("INPUTTITLE.TRANSPORT_EXPENSES")}
        name="transport"
        required
        type="number"
        placeholder="0"
      />
      <FormikField
        title={translate("INPUTTITLE.INSURANCE_EXPENSES")}
        name="insurance"
        required
        type="number"
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
  );
}

"use client";

import { useFormikContext } from "formik";
import FormikFieldSelect from "@/components/shared/FormikFieldSelect";
import { useTranslation } from "@/i18n";

import {
  useGetTitlesQuery,
  useGetNationalitiesQuery,
  useGetRegionsQuery,
  useGetCitiesQuery,
  useGetMaritalStatusQuery,
  useGetFamilySizeQuery,
} from "@/lib/services/lookupApi";

export default function AddressDetailForm() {
  const { translate } = useTranslation();
  const { values } = useFormikContext<any>();

  const { data: titles = [], isLoading: titlesLoading } = useGetTitlesQuery();

  const { data: nationalities = [], isLoading: nationalitiesLoading } =
    useGetNationalitiesQuery();

  const { data: regions = [], isLoading: regionsLoading } =
    useGetRegionsQuery();

  const { data: maritalStatus = [], isLoading: maritalStatusLoading } =
    useGetMaritalStatusQuery();

  const { data: familySize = [], isLoading: familySizeLoading } =
    useGetFamilySizeQuery();

  const { data: cities = [], isLoading: citiesLoading } = useGetCitiesQuery(
    values.region,
    {
      skip: !values.region,
    }
  );

  return (
    <>
      <FormikFieldSelect
        title={translate("INPUTTITLE.TITLE")}
        name="title"
        required
        options={titles}
        disabled={titlesLoading}
        loading={titlesLoading}
        placeholder={
          titlesLoading ? translate("COMMON.LOADING") : "Select Title"
        }
        optionValueKey="TITLEID"
        optionLabelKey="TITLE"
      />

      <FormikFieldSelect
        title={translate("INPUTTITLE.NATIONALITY")}
        name="nationality"
        required
        options={nationalities}
        disabled={nationalitiesLoading}
        loading={nationalitiesLoading}
        placeholder={
          nationalitiesLoading
            ? translate("COMMON.LOADING")
            : "Select Nationality"
        }
        optionValueKey="NATIONALITYID"
        optionLabelKey="NATIONALITY"
      />

      <FormikFieldSelect
        title={translate("INPUTTITLE.GENDER")}
        name="gender"
        required
        options={{
          data: [
            { GENDERID: "M", gender: "Male", gender_ar: "ذكر" },
            { GENDERID: "F", gender: "Female", gender_ar: "أنثى" },
          ],
        }}
        optionValueKey="GENDERID"
        optionLabelKey="gender"
      />

      <FormikFieldSelect
        title={translate("INPUTTITLE.REGION")}
        name="region"
        required
        options={regions}
        disabled={regionsLoading}
        loading={regionsLoading}
        placeholder={
          regionsLoading ? translate("COMMON.LOADING") : "Select Region"
        }
        optionValueKey="REGIONID"
        optionLabelKey="REGION"
      />

      <FormikFieldSelect
        title={translate("INPUTTITLE.CITY")}
        name="city"
        required
        options={cities}
        disabled={!values.region || citiesLoading}
        loading={citiesLoading}
        placeholder={
          !values.region
            ? translate("COMMON.SELECT_REGION_FIRST")
            : citiesLoading
              ? translate("COMMON.LOADING")
              : "Select City"
        }
        optionValueKey="CITYID"
        optionLabelKey="CITY"
      />

      <FormikFieldSelect
        title={translate("INPUTTITLE.MARITAL_STATUS")}
        name="maritalStatus"
        required
        options={maritalStatus}
        disabled={maritalStatusLoading}
        loading={maritalStatusLoading}
        placeholder={
          maritalStatusLoading
            ? translate("COMMON.LOADING")
            : "Select Marital Status"
        }
        optionValueKey="MARSTATID"
        optionLabelKey="MARSTAT"
      />

      <FormikFieldSelect
        title={translate("INPUTTITLE.DEPENDENTS")}
        name="dependents"
        required
        options={familySize}
        disabled={familySizeLoading}
        loading={familySizeLoading}
        placeholder={
          familySizeLoading ? translate("COMMON.LOADING") : "Select Family Size"
        }
        optionValueKey="FAMILYSIZEID"
        optionLabelKey="FAMILYSIZE"
      />
    </>
  );
}

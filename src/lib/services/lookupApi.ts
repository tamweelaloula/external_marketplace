import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL + "/lookup/";

export const lookupApi = createApi({
  reducerPath: "lookupApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      headers.set(
        "x-api-key",
        process.env.NEXT_PUBLIC_X_API_KEY || ""
      );
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getTitles: builder.query<any[], void>({
      query: () => "title",
    }),

    getNationalities: builder.query<any[], void>({
      query: () => "nationalities",
    }),

    getRegions: builder.query<any[], void>({
      query: () => "regions",
    }),

    getCities: builder.query<any[], string>({
      query: (districtId) => `cities?districtid=${districtId}`,
    }),

    getMaritalStatus: builder.query<any[], void>({
      query: () => "marital-status",
    }),

    getFamilySize: builder.query<any[], void>({
      query: () => "fam-size",
    }),

    getEmploymentCategories: builder.query<any, void>({
      query: () => `employment-categories?status=A`,
    }),

    getOccupations: builder.query<any, void>({
      query: () => `occupations?status=A`,
    }),

    getEmploymentSectors: builder.query<any, void>({
      query: () => `empl_sector?status=A`,
    }),

    getEducationLevels: builder.query<any, void>({
      query: () => `education_level?status=A`,
    }),

    getResidentialStatus: builder.query<any, void>({
      query: () => `residential_status?status=A`,
    }),

    getRelatedParties: builder.query<any, void>({
      query: () => `related-party?status=A`,
    }),

    getCondition: builder.query<any, { modelId: string; modelTypeId: string }>({
      query: ({ modelId, modelTypeId }) =>
        `conditions-by-model-type?modelId=${modelId}&modelTypeId=${modelTypeId}`,
    }),
  }),
});

export const {
  useGetTitlesQuery,
  useGetNationalitiesQuery,
  useGetRegionsQuery,
  useGetCitiesQuery,
  useGetMaritalStatusQuery,
  useGetFamilySizeQuery,
  useGetEmploymentCategoriesQuery,
  useGetOccupationsQuery,
  useGetEmploymentSectorsQuery,
  useGetEducationLevelsQuery,
  useGetResidentialStatusQuery,
  useGetRelatedPartiesQuery,
  useGetConditionQuery
} = lookupApi;

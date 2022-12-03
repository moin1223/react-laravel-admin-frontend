import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/api",


    }),
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => "/categories"
        }),

        // getCategory: builder.query({
        //     query: (categoryId) => `/categories/${categoryId}`,
        // }),

        addCategory: builder.mutation({
            query: (data) => ({
                url: "/categories",
                method: "POST",
                body: data,
            }),
        }),

    }),
});

export const { useGetCategoriesQuery, useGetCategoryQuery, useAddCategoryMutation } = apiSlice;
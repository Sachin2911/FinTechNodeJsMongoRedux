import { createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { GetKpisResponse, GetProductsResponse, GetTransactionsResponse } from "./types";

// Will allow us to create endpoints to call the backend
export const api = createApi({
    // We are using the baseurl to make the api calls
    baseQuery: fetchBaseQuery({ baseUrl:import.meta.env.VITE_BASE_URL}),
    reducerPath: "main",
    tagTypes:["Kpis", "Products", "Transactions"],
    endpoints: (build) => ({
        getKpis: build.query<Array<GetKpisResponse>, void>({
            query: ()=>"kpi/kpis/",
            providesTags: ["Kpis"]
        }),
        getProducts: build.query<Array<GetProductsResponse>, void>({
            query: ()=>"product/products/",
            providesTags: ["Products"]
        }),
        getTransactions: build.query<Array<GetTransactionsResponse>, void>({
            query: ()=>"transaction/transactions/",
            providesTags: ["Transactions"]
        })
    })
})

export const { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } = api;
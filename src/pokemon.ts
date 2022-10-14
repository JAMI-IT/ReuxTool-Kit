// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  //   baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.1.12:8000/User" }),
  // baseQuery: fetchBaseQuery({
  //   baseUrl: "https://color-palette-api.kadikraman.now.sh/",
  // }),
  tagTypes: ["Posts"],
  keepUnusedDataFor: 30,

  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (name) => `pokemon/${name}`,
    }),
    getData: builder.query({
      query: () => ({
        url: "/all",
        method: "GET",
      }),
      providesTags: ["Posts"],
    }),
    adaData: builder.mutation({
      query: (value) => ({
        url: "/add",
        method: "POST",
        body: value,
      }),
      invalidatesTags: ["Posts"],
    }),
    updatedata: builder.mutation({
      query: (data) => ({
        url: "/update",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Posts"],
    }),
    deleteData: builder.mutation({
      query: (data) => ({
        url: "/delete",
        method: "DELETE",
        body: data,
      }),
      invalidatesTags: ["Posts"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  // useGetPokemonByNameQuery,
  useGetDataQuery,
  useAdaDataMutation,
  useUpdatedataMutation,
  useDeleteDataMutation,
} = pokemonApi;

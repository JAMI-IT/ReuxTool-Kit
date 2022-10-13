// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  //   baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.1.10:8000/User" }),
  // baseQuery: fetchBaseQuery({
  //   baseUrl: "https://color-palette-api.kadikraman.now.sh/",
  // }),
  tagTypes: ["Posts"],

  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (name) => `pokemon/${name}`,
    }),
    getData: builder.mutation({
      query: () => ({
        url: "/all",
        method: "GET",
      }),
    }),
    adaData: builder.mutation({
      query: (value) => ({
        url: "/add",
        method: "POST",
        body: value,
      }),
    }),
    updatedata: builder.mutation({
      query: (data) => (
        console.log("value", data),
        {
          url: "/update",
          method: "PUT",
          body: data,
        }
      ),
    }),
    deleteData: builder.mutation({
      query: (data) => (
        console.log("De.", data),
        {
          url: "/delete",
          method: "DELETE",
          body: data,
        }
      ),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetPokemonByNameQuery,
  useGetDataMutation,
  useAdaDataMutation,
  useUpdatedataMutation,
  useDeleteDataMutation,
} = pokemonApi;

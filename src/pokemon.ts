// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  //   baseQuery: fetchBaseQuery({ baseUrl: "https://pokeapi.co/api/v2/" }),
  baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.1.13:8000/User" }),
  // baseQuery: fetchBaseQuery({
  //   baseUrl: "https://color-palette-api.kadikraman.now.sh/",
  // }),

  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (name) => `pokemon/${name}`,
    }),
    getData: builder.mutation({
      query: () => ({
        url: "/User",
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
      query: (id, ...rest) => ({
        url: "/put",
        method: "update",
        body: rest,
      }),
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
} = pokemonApi;

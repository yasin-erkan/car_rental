import { Car } from "../types";

type ReturnType = {
  results: Car[];
  total_count: number;
};

// If we directly define the return type of an asynchronous function based on its returned data, we will get an error.
// The return type of an async function should always be expressed using a Promise type.
// The reason is that the function may either return data, be in a loading state, or throw an error.
// The Promise interface represents asynchronous operations, and the generic type we pass to it defines the type of data returned when the operation succeeds.

export const fetchCars = async (): Promise<ReturnType> => {
  const url =
    "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/all-vehicles-model/records?limit=20&refine=make:BMW";

  const res = await fetch(url);
  const data = await res.json();

  return data;
};

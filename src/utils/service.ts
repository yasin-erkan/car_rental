import {colgroup} from 'motion/react-client';
import {Car} from '../types';

type ReturnType = {
  results: Car[];
  total_count: number;
};

// When specifying the return type of asynchronous functions, it should always be expressed using the Promise type. This is because the function might return a loading or error state.
// The Promise interface defines the type of asynchronous operations, and the generic type we provide indicates the type of data returned upon a successful operation.
export const fetchCars = async (
  make?: string,
  model?: string,
  year?: string,
  page: string = '1',
): Promise<ReturnType> => {
  // Start with the base URL
  let url =
    'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/all-vehicles-model/records?';

  // If there is a make filter, add it to the URL
  if (make) {
    url += `&refine=make:${encodeURIComponent(make)}`;
  }

  // If there is a model filter, add it to the URL
  if (model) {
    url += `&refine=model:${encodeURIComponent(model)}`;
  }

  // If there is a year filter, add it to the URL
  if (year) {
    url += `&refine=year:${encodeURIComponent(year)}`;
  }

  // Pagination logic: calculates the offset based on the page number
  const offset = (parseInt(page) - 1) * 10;

  url += `&limit=10`;
  url += `&offset=${offset}`;

  const res = await fetch(url);

  const data = await res.json();

  return data;
};

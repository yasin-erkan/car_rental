import ReactSelect from 'react-select';
import { makes } from '../constants/index';
import { FormEvent, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { OptionType } from '../../types';

// 1. Component: SearchButton
const SearchButton = ({ designs }: { designs: string }) => (
  <button className={`ml-3 z-10 ${designs}`}>
    <img src="/public/search.svg" width={40} height={40} />
  </button>
);

// 2. Component: SearchBar
const SearchBar = () => {
  const [make, setMake] = useState<string>('');
  const [model, setModel] = useState<string>('');

  const [searchParams, setSearchParams] = useSearchParams();

  /*
   * We need to convert the makes array into the format required by the select library
   * e.g., "bmw" > {value: "bmw", label: "bmw"}
   * 
   * To prevent unnecessary computations on each render, 
   * we use useMemo to cache the data.
   */
  const options: OptionType[] = useMemo(
    () =>
      makes.map((make) => ({
        label: make,
        value: make,
      })),
    []
  );

  // Executes when the form is submitted
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Add data as search parameters to the URL
    setSearchParams({ make, model });
  };

  return (
    <form onSubmit={handleSubmit} className="searchbar gap-3">
      <div className="searchbar-item">
        <ReactSelect
          defaultInputValue={searchParams.get('make')!}
          onChange={(e) => e && setMake(e.value)}
          className="w-full text-black"
          options={options}
        />
        <SearchButton designs="sm:hidden" />
      </div>

      <div className="searchbar-item">
        <img
          width={25}
          src="/model-icon.png"
          alt="car"
          className="absolute ml-4"
        />

        <input
          defaultValue={searchParams.get('model')!}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setModel(e.target.value)
          }
          placeholder="e.g:Civic"
          type="text"
          className="searchbar-input rounded text-black"
        />

        <SearchButton designs="sm:hidden" />
      </div>

      <SearchButton designs="max-sm:hidden" />
    </form>
  );
};

export default SearchBar;
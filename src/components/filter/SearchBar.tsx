import {FC, FormEvent, useState} from 'react';
import ReactSelect from 'react-select';
import {makes} from '../../utils/constants';
import {useNavigate, useSearchParams} from 'react-router-dom';

type SelectOption = {
  label: string;
  value: string;
};

const Searchbar: FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Get initial values from URL params if they exist
  const initialMake = searchParams.get('make') || '';
  const initialModel = searchParams.get('model') || '';

  const [selectedMake, setSelectedMake] = useState<SelectOption | null>(
    initialMake ? {label: initialMake, value: initialMake} : null,
  );
  const [model, setModel] = useState<string>(initialModel);

  // Map the makes array to convert strings into objects
  const options = makes.map(make => ({
    label: make,
    value: make,
  }));

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Preserve existing URL parameters
    const params = new URLSearchParams();

    // Update make and model parameters
    if (selectedMake?.value) {
      params.set('make', selectedMake.value);
    } else {
      params.delete('make');
    }

    if (model) {
      params.set('model', model);
    } else {
      params.delete('model');
    }

    params.set('page', '1');

    // Update the URL
    navigate(`/?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="searchbar flex gap-3 items-center justify-center">
      <div className="searchbar-item items-end">
        <div className="w-full flex flex-col">
          <label htmlFor="make">Make</label>
          <ReactSelect
            className="w-full text-black"
            options={options}
            placeholder="Select a make"
            value={selectedMake}
            onChange={option => setSelectedMake(option as SelectOption | null)}
            inputId="make"
            classNamePrefix="select"
          />
        </div>

        <button type="submit" className="ml-3 sm:hidden cursor-pointer">
          <img src="/search.svg" alt="search" className="size-[40px]" />
        </button>
      </div>

      <div className="searchbar-item flex flex-col !items-start">
        <label htmlFor="model">Model</label>

        <div className="w-full flex">
          <div className="absolute ml-3 mt-1">
            <img src="/model-icon.png" alt="model" className="size-[25px]" />
          </div>

          <input
            type="text"
            id="model"
            className="searchbar-input rounded text-black bg-white"
            placeholder="Enter model..."
            value={model}
            onChange={e => setModel(e.target.value)}
          />

          <button type="submit" className="ml-3 cursor-pointer">
            <img src="/search.svg" alt="search" className="size-[40px]" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default Searchbar;

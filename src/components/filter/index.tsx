import { FC } from "react";
import Searchbar from "./SearchBar";
import Year from "./Year";

const Filter: FC = () => {
  return (
    <div className="mt-12 padding-x padding-y max-width">
      <div className="home-text-container">
        <h1 className="text-4xl font-extrabold">Drive Your Dream</h1>
        <p>Explore top-tier cars and experience the thrill of the road.</p>
      </div>

      <div className="home-filters">
        <Searchbar />

        <div className="home-filter-container">
          <Year />
        </div>
      </div>
    </div>
  );
};

export default Filter;

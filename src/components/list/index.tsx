import { FC, useEffect, useState } from "react";
import { fetchCars } from "../../utils/service";
import { Car } from "../../types";
import Warning from "../warning";
import Card from "./card";
import { useSearchParams } from "react-router-dom";
import ReactPaginate from "react-paginate";

const List: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [cars, setCars] = useState<Car[] | null>(null);
  const [total, setTotal] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Get parameters from the URL
  const make = searchParams.get("make") || "";
  const model = searchParams.get("model") || "";
  const year = searchParams.get("year") || "";
  const page = searchParams.get("page") || "1";

  useEffect(() => {
    // Reset states
    setIsLoading(true);
    setError(null);

    fetchCars(make, model, year, page)
      .then((data) => {
        setCars(data.results);
        setTotal(data.total_count);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);  
      });
  }, [make, model, year, page]); // Refetch when parameters change

  // ! 1) isLoading is true > Data is being loaded from the API
  if (isLoading) return <Warning>Loading...</Warning>;

  //!  2) error is not null > An error occurred while fetching data from the API
  if (error) return <Warning>{error}</Warning>;

  //! 3) cars is an empty array > No data found for the given criteria
  if (!cars || cars.length < 1) return <Warning>No Data Found</Warning>;

  // 4) cars is a populated array > Data successfully fetched from the API
  return (
    <div className="padding-x max-width">
      <section className="home-cars-wrapper">
        {cars.map((car) => (
          <Card key={car.id} car={car} />
        ))}
      </section>

      {total && (
        <ReactPaginate
          breakLabel="..."
          nextLabel=">"
          previousLabel="<"
          initialPage={(parseInt(page) || 1) - 1}
          onPageChange={(e) => {
            searchParams.set("page", (e.selected + 1).toString());
            setSearchParams(searchParams);
          }}
          pageCount={Math.ceil(total / 10)}
          pageRangeDisplayed={5}
          renderOnZeroPageCount={null}
          containerClassName="pagination"
        />
      )}
    </div>
  );
};

export default List;

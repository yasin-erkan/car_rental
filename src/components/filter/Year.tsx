import { FC, FormEvent, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const Year: FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Get the current year parameter from the URL
  const initialYear = searchParams.get("year") || "";
  const [year, setYear] = useState<string>(initialYear);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Preserve existing URL parameters
    const params = new URLSearchParams(searchParams);
    
    // If year value exists, add it; otherwise, remove the parameter
    if (year) {
      params.set("year", year);
    } else {
      params.delete("year");
    }
    
    // Update the URL
    navigate(`/?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <label htmlFor="year">Year</label>
      <div className="flex">
        <input 
          type="number" 
          id="year"  
          className="w-28 py-[6px] px-2 rounded-l-[4px] shadow text-black bg-white border-r border-zinc-200" 
          placeholder="e.g., 2023"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <button 
          type="submit" 
          className="bg-white rounded-r px-3 text-blue-500 hover:bg-zinc-200 transition cursor-pointer"
        >
          🔎
        </button>
      </div>
    </form>
  );
};

export default Year;

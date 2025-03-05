import { FC, useEffect, useState } from 'react'
import { fetchCars } from '../../utils/service';
import { Car } from '../../types';
import Warning from '../warning';
import Card from './card';

const List:FC = () => {
const [cars, setCars] =useState <Car[] | null>(null);
const [total, setTotal] = useState<number | null>(null);
const [error,setError] = useState<string | null> (null);


  useEffect(() =>{
    fetchCars()
    .then((data) =>{
      setCars(data.results);
      setTotal(data.total_count);
    }
  ).catch((error)=> setError(error.message));
},[]);

if(!cars) return <Warning> Loading ...</Warning>;

if(error) return <Warning>{error}</Warning>;

if(cars.length < 1 ) return <Warning> Data not Found!</Warning>;



  return (
    <div className='padding-x max-width'>
<section className='home-cars-wrapper'>
  {cars.map((car, i) => (<Card key={car.id} car={car}/>
))}
</section>


    </div>
  )
}

export default List
import { Car } from "../types";

export default function calcPrice(car: Car): number {
  // Base price (starting from $100)
  let price = 100;

  // Car age: Newer cars are more expensive, while older cars get a discount.
  const carYear = parseInt(car.year);
  const currentYear = new Date().getFullYear();
  const age = currentYear - carYear;
  // 2% discount per year, up to a maximum of 20%
  const ageDiscount = Math.min(age * 0.02, 0.2);
  price *= 1 - ageDiscount;

  // Engine displacement (displ): Larger engines may have an additional charge.
  // Displacement is usually in liters; converting to cc by multiplying by 1000.
  const cc = car.displ * 100;
  let engineFee = 0;
  if (cc > 100) {
    engineFee = (cc - 100) * 0.2; // $0.2 per extra cc
  }
  price += engineFee;

  // Return the final price rounded to 2 decimal places
  return Math.round(price * 10) / 10;
}

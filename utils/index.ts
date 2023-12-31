import { CarProps, FilterProps } from "@/types";

export const calculateCarRent = (city_mpg: number, year:
    number) => {
        const basePricePerDay = 64.99; // Base rental price per day in dollars
        const mileageFactor = 0.1; // Additional rate per mile driven
        const yearFactor = 0.05; // Additional rate per year of vehicle age

        // Calculate addition rate base on milage and year
        const mileageRate = city_mpg * mileageFactor;
        const yearRate = (new Date().getFullYear() - year) *
        yearFactor;

        // Calculate total rental rate per day
        const rentalRatePerDay = basePricePerDay + mileageRate
        + yearRate;

        return rentalRatePerDay.toFixed(0);
};

export async function fetchCars(filters: FilterProps) {
    const { manufacturer, year, model, limit, fuel } = filters;
    const headers = {
            'X-RapidAPI-Key': '34c4c1da45msh591f22ad8c0b5f4p187a61jsnb8f90accd9a4',
            'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
    }
    //search paramters converted to template string. Allowing paramaters to be passed to it
    const response = await fetch(`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?
    maker=${manufacturer}&year=${year}&model=${model}&limit=${limit}&fuel_type=${fuel}`, {
    headers: headers,
});

const result = await response.json();

return result;
}

export const generateCarImageUrl = (car: CarProps, angle?
: string) => {
    //key...
const url = new URL("https://cdn.imagin.studio/getimage");
  const { make, model, year } = car;

  url.searchParams.append('customer', 'hrjavascript-mastery');
  url.searchParams.append('make', make);
  url.searchParams.append('modelFamily', model.split(" ")[0]);
  url.searchParams.append('zoomType', 'fullscreen');
  url.searchParams.append('modelYear', `${year}`);
  // url.searchParams.append('zoomLevel', zoomLevel);
  url.searchParams.append('angle', `${angle}`);

  return `${url}`;
}

export const updateSearchParams = (type: string, value: string) => {
    const searchParams = new URLSearchParams(window.location.search); //stores previous search

        //Update or delete search
        searchParams.set(type, value)

        const newPathName = `${window.location.pathname}?${searchParams.toString()}`
    
    return newPathName;
}
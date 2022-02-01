
import { Loading } from "./Loading";
import cloudImage from "../assest/svg/cloud.svg";


 type searchProps = {
   weatherData: any;
 };

export const WeatherLeftSidePanel = ({ weatherData }: searchProps) => {
  const { main, wind, weather, name } = weatherData;

  if (Object.keys(weatherData).length === 0) {
    return <Loading />;
  }

  return (
    <div className='mt-5'>
      <h1 className="text-center fs-6">- {name} -</h1>
      <div className='d-flex align-items-center mx-auto justify-content-center'>
        <img src={cloudImage} alt='' />
        <h2 className='ms-4'>{main?.temp}&deg;C</h2>
      </div>
      <span
        style={{ fontSize: "25px", fontWeight: "bold" }}
        className='d-flex mx-auto justify-content-center mt-5'
      >
        {weather?.map((item: any) => item.main)}
      </span>
      <footer className='d-flex justify-content-around mt-4'>
        <span className='text-center'>
          Humidity <br /> <h1 className='fs-6'>{main?.humidity}%</h1>
        </span>
        <span className='text-center'>
          Wind Speed <br /> <h1 className='fs-6'> {wind?.speed}km/h</h1>
        </span>
      </footer>
    </div>
  );
};

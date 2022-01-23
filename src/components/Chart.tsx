import React, { useEffect } from 'react';
import { Line } from "react-chartjs-2";
import axios from 'axios';
import { Loading } from './Loading';
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);


//daily forecast api
const apiURL = {
    base: "https://api.openweathermap.org/data/2.5/",
    key: process.env.REACT_APP_WEATHER_API,
};
//api.openweathermap.org/data/2.5/forecast?q=nigeria&appid={API_KEY}

export const Charts = ({ userSearchString }: any) => {
  const [weather, setWeather] = React.useState<any>([{}]);
    const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    axios
      .get(
        `${apiURL.base}forecast?q=${userSearchString}&appid=${apiURL.key}&units=metric`
      )
      .then(res => {
        setWeather(res.data);
        setLoading(false);
      });
  }, [userSearchString]);

  // map over weather data and get the data for the next 5 days
  const chartData = weather?.list?.map((item: any) => {
    return item.main.temp;
  });

  const chartLabels = weather?.list?.map((item: any) => {
    return item.dt_txt;
  });

  const data = {
    labels: chartLabels,
    datasets: [
      {
        label: "Daily Forecast",
        data: chartData,
        fill: true,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "transparent",
        pointBorderColor: "rgb(75, 192, 192)",
      },
    ],
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className='w-100'>
      <p className='text-center'>
        Chart shows weather for the next following days
      </p>
      <Line data={data} />
    </div>
  );
};

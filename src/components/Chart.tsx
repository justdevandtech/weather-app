import React, { useEffect } from 'react';
import { Line } from "react-chartjs-2";
import moment from "moment";
import './chart.css';
import axios from 'axios';
import { Loading } from './Loading';
import { Card, Button } from 'react-bootstrap';
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

    const fetchDataForChart = async () => {
       try {
          const res = await axios.get(
            `${apiURL.base}forecast?q=${userSearchString}&appid=${apiURL.key}&units=metric`
          );
          setWeather(res.data);
          setLoading(false);
       } catch (error) {
         console.log(error);
         
       }
    };
  useEffect(() => {
      fetchDataForChart();
  }, [userSearchString]);

  // map over weather data and get the data for the next 5 days
  const chartData = weather?.list?.map((item: any) => {
    return item.main.temp;
  });
// moment().format("ddd, hA"); 
  const chartLabels = weather?.list?.map((item: any) => {
    return (
      moment(item.dt_txt).format("ddd, hA")
    );
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
    <div className='w-100 mt-4'>
      <p className='text-center'>
        Chart shows weather for the next following days
      </p>
      <Line data={data} />
      </div>
  );
};

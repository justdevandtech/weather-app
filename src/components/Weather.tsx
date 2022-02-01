import React, { useEffect } from 'react';
import './weather.css';
import { Row, Col, InputGroup, FormControl } from "react-bootstrap";
import { DisplayDate } from './DisplayDate';
import { WeatherLeftSidePanel } from './WeatherLeftSidePanel';
import { Charts } from './Chart';
import axios from 'axios';
const apiURL = {
  base: "https://api.openweathermap.org/data/2.5/",
  key: process.env.REACT_APP_WEATHER_API,
};
  

export const Weather = () => {
  const [searchBarInput, setSearchBarInput] = React.useState("Nigeria");
  const [userSearchString, setUserSearchString] = React.useState("");
  const [weather, setWeather] = React.useState({});

  //api to automatically get the current location
  const fetchData = async () => {
    try {
    const response = await axios.get(
      `${apiURL.base}weather?q=${searchBarInput}&appid=${apiURL.key}&units=metric`
    );
    setWeather(response?.data);
    setUserSearchString(searchBarInput);
  }
  catch (error) {
    console.log(error);
  }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchBarInput = () => {
    fetchData();
    setUserSearchString(searchBarInput);
  };

  return (
    <div className='weather bg-white p-4 shadow rounded mt-4'>
      <InputGroup className='mb-3'>
        <FormControl
          placeholder='Search for a city'
          aria-label="Recipient's username"
          aria-describedby='basic-addon2'
          value={searchBarInput}
          onChange={e => setSearchBarInput(e.target.value)}
          onKeyPress={e => {
            if (e.key === "Enter") {
              handleSearchBarInput();
            }
          }}
        />
        <InputGroup.Text
          id='basic-addon2'
          style={{ cursor: "pointer" }}
          onClick={handleSearchBarInput}
        >
          Search Here
        </InputGroup.Text>
      </InputGroup>
      <Row>
        <Col style={{ borderRight: "3px solid #f5f5f5" }}>
          <DisplayDate />
          <WeatherLeftSidePanel weatherData={weather} />
        </Col>
        <Col>
          <Charts userSearchString={userSearchString} />
        </Col>
      </Row>
    </div>
  );
};

import React from 'react';
import moment from "moment";

export const DisplayDate = () => {
  const timeNow = moment().format("LLLL");
  return <div className='text-center'>{timeNow}</div>;
};

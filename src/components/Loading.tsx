import React from 'react';
import { Spinner } from 'react-bootstrap';


export const Loading = () => {
  return (
    <div className='d-flex mx-auto justify-content-center h-auto'>
      <Spinner animation='grow' />
    </div>
  );
};

import React from 'react';
import { SyncLoader } from 'react-spinners';
const LoadingComponent = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <SyncLoader size={60} color="#F59E0B" />
    </div>
  );
};

export default LoadingComponent;

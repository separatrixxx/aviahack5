import React from 'react';
import {FaHeart} from "react-icons/fa";


function App() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-white">
      <h1 className="text-svo text-3xl lg:text-7xl">Водитель, ты умничка</h1>
        <div className="mt-20">
            <h1 className="text-svo text-5xl lg:text-9xl absolute "><FaHeart /></h1>
            <h1 className="text-svo text-5xl lg:text-9xl animate-ping"><FaHeart /></h1>
        </div>
    </div>
  );
}

export default App;

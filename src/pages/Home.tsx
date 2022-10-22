import React from 'react';
import Footer from '../components/Footer'

function Home () {

    document.title = 'Авиахакатон';

    return (
        <div className="flex flex-col items-center justify-center w-full h-screen bg-white">
            <input id="input_token" className="w-48 lg:w-72 h-12 lg:h-16 bg-gray-200 text-2xl p-3 rounded-2xl shadow-xl
            focus:outline-none hover:bg-gray-300 focus:bg-gray-300 text-svo text-center
            transition-colors duration-300 ease-in-out"/>
            <Footer />
        </div>
    );
}

export default Home;
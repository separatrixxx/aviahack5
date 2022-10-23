import React from 'react';
import Footer from '../components/Footer'

function Home () {

    document.title = 'Авиахакатон';

    return (
        <div id="home_screen" className="flex flex-col items-center justify-center w-full h-screen
        bg-cover bg-center bg-no-repeat">
            <input id="input_token" placeholder="Введите токен" className="w-48 lg:w-72 h-12 lg:h-16 bg-white
            text-lg lg:text-2xl p-3 rounded-2xl shadow-xl focus:outline-none hover:bg-gray-100 focus:bg-gray-100
            text-svo text-center transition-colors duration-300 ease-in-out"/>
            <Footer />
        </div>
    );
}

export default Home;
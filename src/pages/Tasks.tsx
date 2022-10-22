import React from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer'

function Tasks () {

    document.title = 'Авиахакатон - Задачи';

    return (
        <div className="flex flex-col items-center justify-center w-full h-screen bg-white">
            <Header />
            <div className="w-5/6 lg:w-1/2 h-32 lg:h-48 bg-gray-200 rounded-2xl mb-20">

            </div>
            <a href="/start" className="flex items-center justify-center w-48 lg:w-72 h-12 lg:h-16 bg-svo text-white
            rounded-2xl text-base lg:text-xl shadow-xl hover:scale-105 transition-all duration-500 easy-in-out">
                Принять
            </a>
            <Footer />
        </div>
    );
}

export default Tasks;
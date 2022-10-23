import React from 'react';
import Footer from '../components/Footer'

function End () {

    document.title = 'Авиахакатон - В пути';

    return (
        <div className="flex flex-col items-center justify-center w-full h-screen bg-white">
            <button id='end_task_btn' className="flex items-center justify-center w-48 lg:w-72 h-12 lg:h-16 bg-svo text-white
                rounded-2xl text-base lg:text-xl shadow-xl hover:scale-105 transition-all duration-500 easy-in-out">
                    Закончить
            </button>
            <button id='error_task_btn' className="flex items-center justify-center w-48 lg:w-72 h-12 lg:h-16 bg-red-500 text-white mt-10
                rounded-2xl text-base lg:text-xl shadow-xl hover:scale-105 transition-all duration-500 easy-in-out">
                    Авария
            </button>
            <Footer />
        </div>
    );
}

export default End;
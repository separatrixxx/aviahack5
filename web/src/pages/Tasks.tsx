import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Tasks () {

    document.title = 'Авиахакатон - Задачи';

    return (
        <div className="flex flex-col items-center justify-center w-full h-screen bg-white">
            <Header />
            <div className="flex flex-col w-5/6 lg:w-1/2 bg-gray-200 rounded-2xl mb-20 p-5">
                <div className="flex">
                    <h1 className="text-svo text-base lg:text-lg">Id диспетчера: </h1>
                    <h1 id="dispatcher_id" className="text-svo text-base lg:text-lg ml-1">-</h1>
                </div>
                <div className="flex mt-0.5">
                    <h1 className="text-svo text-base lg:text-lg">Id полёта: </h1>
                    <h1 id="flight_id" className="text-svo text-base lg:text-lg ml-1">-</h1>
                </div>
                <div className="flex mt-0.5">
                    <h1 className="text-svo text-base lg:text-lg">Статус: </h1>
                    <h1 id="status" className="text-svo text-base lg:text-lg ml-1">-</h1>
                </div>
            </div>
            <a href="/start" id="accept_task" className="flex items-center justify-center w-48 lg:w-72 h-12 lg:h-16 bg-svo text-white
            rounded-2xl text-base lg:text-xl shadow-xl hover:scale-105 transition-all duration-500 easy-in-out">
                Принять
            </a>
            <Footer />
        </div>
    );
}

export default Tasks;
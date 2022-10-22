import React from 'react';

function End () {

    document.title = 'Авиахакатон';

    return (
        <div className="flex flex-col items-center justify-center w-full h-screen bg-white">
            <a href="/" className="flex items-center justify-center w-48 lg:w-72 h-12 lg:h-16 bg-svo text-white
            rounded-2xl text-base lg:text-xl shadow-xl hover:scale-105 transition-all duration-500 easy-in-out">
                Закончить
            </a>
        </div>
    );
}

export default End;
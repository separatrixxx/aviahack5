import React from 'react';

function NotFound () {

    document.title = '404';

    return (
        <div className="scroll-smooth bg-white w-full h-screen flex flex-col justify-center items-center p-5">
            <a href="/" className="text-gray-400 text-xl lg:text-5xl hover:text-svo
            transition-colors duration-500 easy-in-out">Данной страницы не существует</a>
        </div>
    );
}

export default NotFound;
import React from 'react';
import {FaArrowLeft, FaRegUser} from 'react-icons/fa';

function Header () {

    if (window.location.pathname === '/profile' || window.location.pathname === '/start') {
        return (
            <div className="flex items-center justify-between w-full absolute top-0 text-xs py-3 px-5 lg:px-7">
                <a href="/" className="text-xl lg:text-2xl text-svo hover:bg-svo hover:text-white p-3
            rounded-full transition-colors duration-300"><FaArrowLeft />
                </a>
            </div>
        );
    } else {
        return (
            <div className="flex items-start justify-between w-full absolute top-0 text-xs py-3 px-5 lg:px-7">
                <div className="flex flex-col items-start justify-center">
                    <h1 id="driver_name" className="text-xl lg:text-3xl text-svo">Здравствуйте, водитель!</h1>
                    <h1 id="token_name" className="text-base lg:text-xl text-gray-400">Ваш токен: TOKEN</h1>
                </div>
                <a href="/profile" className="text-xl lg:text-2xl text-svo hover:bg-svo hover:text-white p-3
            rounded-full transition-colors duration-300"><FaRegUser /></a> </div>
        );
    }
}

export default Header;
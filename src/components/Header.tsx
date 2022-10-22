import React from 'react';
import {FaRegUser} from 'react-icons/fa'

function Header () {

    return (
        <div className="flex items-center justify-between w-full absolute top-0 text-xs py-3 px-5 lg:px-7">
            <h1 id="token_name" className="text-lg lg:text-2xl text-svo">Ваш токен: TOKEN</h1>
            <a href="/profile" className="text-xl lg:text-2xl text-svo hover:bg-svo hover:text-white p-3 rounded-full
            transition-colors duration-300"><FaRegUser /></a>
        </div>
    );
}

function exit() {
    localStorage.removeItem('token');
    window.location.reload();
}

export default Header;
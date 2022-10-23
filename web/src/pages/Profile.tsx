import React from 'react';
import Header from '../components/Header';

function Profile () {

    return (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-white p-10">
            <Header />
            <input id="input_name" spellCheck="false" placeholder="Ваше имя" className="w-48 lg:w-72 h-12 lg:h-16 bg-white
            text-lg lg:text-2xl p-3 rounded-2xl shadow-xl focus:outline-none hover:bg-gray-100 focus:bg-gray-100
            text-svo text-center transition-colors duration-300 ease-in-out"/>
            <button onClick={exit} className="cursor-pointer text-gray-400 hover:text-svo absolute bottom-0 p-10
            transition-colors duration-300 ease-in-out">
                Выйти
            </button>
        </div>
    );
}

function exit() {
    localStorage.removeItem('token');
    window.location.href = '/';
}

export default Profile;
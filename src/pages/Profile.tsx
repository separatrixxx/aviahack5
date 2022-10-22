import React from 'react';

function Profile () {

    return (
        <div className="flex flex-col items-center justify-center">
            <input id="input_name" placeholder="Ваше имя" className="w-48 lg:w-72 h-12 lg:h-16 bg-white
            text-lg lg:text-2xl p-3 rounded-2xl shadow-xl focus:outline-none hover:bg-gray-100 focus:bg-gray-100
            text-svo text-center transition-colors duration-300 ease-in-out"/>
        </div>
    );
}

function exit() {
    localStorage.removeItem('token');
    window.location.reload();
}

export default Profile;
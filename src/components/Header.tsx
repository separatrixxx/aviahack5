import React from 'react';

function Header () {

    return (
        <div className="flex items-center justify-end w-full absolute top-0 text-xs p-3 lg:p-5">
            <button onClick={exit} className="cursor-pointer text-gray-400 hover:text-svo transition-colors duration-300 ease-in-out">
                Выйти
            </button>
        </div>
    );
}

function exit() {
    localStorage.removeItem('token_enter');
    window.location.reload();
}

export default Header;
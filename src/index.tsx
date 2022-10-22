import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);

let input = document.getElementById('input_token') as HTMLInputElement;

input?.addEventListener('keypress', async function (e) {
    if (e.which === 13) {
        e.preventDefault();
        let val: string = input.value;

        let url: string = 'http://127.0.0.1:8000/get_all_buses/';
        let response = await fetch(url);

        if (response.ok) {
            let json = await response.json();

            for (let i of json['list']) {
                if (val === i.token) {
                    localStorage.setItem('token', val);
                    input.classList.remove('border-4');
                    input.classList.remove('border-red-300');
                    window.location.reload();
                    break;
                }

                localStorage.removeItem('token');
                input.classList.add('border-4');
                input.classList.add('border-red-500');
            }
        } else {
            alert("Ошибка HTTP: " + response.status);
        }
    }
});

let tokenName = document.getElementById('token_name') as HTMLInputElement;
tokenName.innerHTML = 'Ваш токен: ' + localStorage.getItem('token')?.toUpperCase();
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

if (tokenName !== null) {
    tokenName.innerHTML = 'Ваш токен: ' + localStorage.getItem('token')?.toUpperCase();
}

let inputName = document.getElementById('input_name') as HTMLInputElement;
let driverName = document.getElementById('driver_name') as HTMLInputElement;

if (inputName !== null
    && +JSON.stringify(localStorage.getItem(JSON.stringify(localStorage.getItem('token')))).slice(1, -1) !== 0
    && localStorage.getItem(JSON.stringify(localStorage.getItem('token'))) !== null) {
    inputName.value = JSON.stringify(localStorage.getItem(JSON.stringify(localStorage.getItem('token')))).slice(1, -1);
}

if (driverName !== null
    && +JSON.stringify(localStorage.getItem(JSON.stringify(localStorage.getItem('token')))).slice(1, -1) !== 0
    && localStorage.getItem(JSON.stringify(localStorage.getItem('token'))) !== null) {
    driverName.innerHTML = 'Здравствуйте, '
        + JSON.stringify(localStorage.getItem(JSON.stringify(localStorage.getItem('token')))).slice(1, -1)
        + '!';
}

inputName?.addEventListener('keypress', function (e) {
    if (e.which === 13) {
        e.preventDefault();
        let val: string = inputName.value;

        localStorage.setItem(JSON.stringify(localStorage.getItem('token')), val);
    }
});

let token: any = localStorage.getItem('token');

if (token !== null && window.location.pathname === '/') {
    getTask().then();
}

let dispatcherId = document.getElementById('dispatcher_id') as HTMLInputElement;
let flightId = document.getElementById('flight_id') as HTMLInputElement;
let status = document.getElementById('status') as HTMLInputElement;

async function getTask() {
    let response_id = await fetch('http://127.0.0.1:8000/get_id_by_token/?token=' + localStorage.getItem('token'));
    let jsonId;

    if (response_id.ok) {
        jsonId = await response_id.json();
    } else {
        alert("Ошибка HTTP: " + response_id.status);
    }

    let response_task = await fetch('http://127.0.0.1:8000/get_all_queries_on_bus/?bus_id=' + jsonId.id);
    let jsonTask;

    if (response_task.ok) {
        jsonTask = await response_task.json();
    } else {
        alert("Ошибка HTTP: " + response_task.status);
    }


    if (jsonTask.list.length !== 0) {
        for (let i of jsonTask.list) {
            if (i.status === 'not_started') {
                dispatcherId.innerHTML = i.dispatcher_id;
                flightId.innerHTML = i.flight_id;
                status.innerHTML = i.status;
                localStorage.setItem('tasks', 'ok');
                (document.getElementById('accept_task') as HTMLInputElement).classList.remove('hidden');
                break;
            }
    
            dispatcherId.innerHTML = '-';
            flightId.innerHTML = '-';
            status.innerHTML = '-';
            localStorage.removeItem('tasks');
            (document.getElementById('accept_task') as HTMLInputElement).classList.add('hidden');
        }
    } else {
            dispatcherId.innerHTML = '-';
            flightId.innerHTML = '-';
            status.innerHTML = '-';
            localStorage.removeItem('tasks');
            (document.getElementById('accept_task') as HTMLInputElement).classList.add('hidden');
    }
}



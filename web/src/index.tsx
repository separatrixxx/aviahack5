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

if (token !== null && (window.location.pathname === '/' 
    || window.location.pathname === '/start'
    || window.location.pathname === '/end')) {
    getTask().then();
}

let dispatcherId = document.getElementById('dispatcher_id') as HTMLInputElement;
let flightId = document.getElementById('flight_id') as HTMLInputElement;
let status = document.getElementById('status') as HTMLInputElement;

let dispatcherId_start = document.getElementById('dispatcher_id_start') as HTMLInputElement;
let flightId_start = document.getElementById('flight_id_start') as HTMLInputElement;
let status_start = document.getElementById('status_start') as HTMLInputElement;

let acceptTaskBtn = document.getElementById('accept_task_btn') as HTMLInputElement;
let endTaskBtn = document.getElementById('end_task_btn') as HTMLInputElement;
let errorTaskBtn = document.getElementById('error_task_btn') as HTMLInputElement;

let timer = document.getElementById('timer') as HTMLInputElement;

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
            if ((i.status === 'not_started' && window.location.pathname === '/') 
                || (i.status === 'wait' && window.location.pathname === '/start')) {
                if (window.location.pathname === '/') {
                    dispatcherId.innerHTML = i.dispatcher_id;
                    flightId.innerHTML = i.flight_id;
                    status.innerHTML = 'Не начато';
                } else if (window.location.pathname === '/start') {
                    dispatcherId_start.innerHTML = i.dispatcher_id;
                    flightId_start.innerHTML = i.flight_id;
                    status_start.innerHTML = 'Ожидает выполнения';
                }

                localStorage.setItem('tasks', 'ok');
                localStorage.setItem('task', JSON.stringify(i));
                break;
            }
    
            if (dispatcherId !== null) {
                dispatcherId.innerHTML = '-';
                flightId.innerHTML = '-';
                status.innerHTML = '-';
            }
            localStorage.removeItem('tasks');
        }
    } else {
            dispatcherId.innerHTML = '-';
            flightId.innerHTML = '-';
            status.innerHTML = '-';
            localStorage.removeItem('tasks');
            (document.getElementById('accept_task') as HTMLInputElement).classList.add('hidden');
    }
}

function Timer() {
    let minutes = Number(localStorage.getItem('minutes'));
    let seconds = Number(localStorage.getItem('seconds'));

    if (seconds < 60) {
        seconds += 1;
    } else {
        minutes += 1;
        seconds = 0;
    }

    let min;
    let sec;

    if (minutes < 10) {
        min = '0' + minutes;
    } else {
        min = '' + minutes;
    }

    if (seconds < 10) {
        sec = '0' + seconds;
    } else {
        sec = '' + seconds;
    }

    localStorage.setItem('minutes', min);
    localStorage.setItem('seconds', sec);

    timer.innerHTML = localStorage.getItem('minutes') + ':' + localStorage.getItem('seconds');
}


if ((JSON.parse(localStorage.getItem('task') || '{}').status === 'wait' && window.location.pathname === '/')
    || (JSON.parse(localStorage.getItem('task') || '{}').status === 'wait' && window.location.pathname === '/profile')) {
    putNotStartedStatus();
} else if (JSON.parse(localStorage.getItem('task') || '{}').status === 'wait' && window.location.pathname === '/end') {
    let now = new Date();

    let startDate = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
    let startTime = now.getHours() + ':' + now.getMinutes() + ":" + now.getSeconds();

    localStorage.setItem('minutes', '00');
    localStorage.setItem('seconds', '00');

    setInterval(() => Timer(), 1000);

    putStartDateTimeStatus(startDate, startTime);
}

if (JSON.parse(localStorage.getItem('task') || '{}').status === 'in_progress' && window.location.pathname !== 'end') {
    let now = new Date();

    let endDate = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
    let endTime = now.getHours() + ':' + now.getMinutes() + ":" + now.getMilliseconds();
    
    putEndDateTimeStatusError(endDate, endTime);
}

acceptTaskBtn?.addEventListener('click', () => {
    putWaitStatus();
})

async function putWaitStatus() {
    let task = JSON.parse(localStorage.getItem('task') || '{}');

    let response_status = await fetch('http://127.0.0.1:8000/put_status/?id=' + task.id + '&status=wait',
    {
        method: 'PUT'
    });

    if (response_status.ok) {
        window.location.pathname = '/start';
    } else {
        alert('Ошибка HTTP: ' + response_status.status);
    }
}

async function putNotStartedStatus() {
    let task = JSON.parse(localStorage.getItem('task') || '{}');

    let response_status = await fetch('http://127.0.0.1:8000/put_status/?id=' + task.id + '&status=not_started',
    {
        method: 'PUT'
    });

    if (response_status.ok) {
        
    } else {
        alert('Ошибка HTTP: ' + response_status.status);
    }
}

async function putStartDateTimeStatus(startDate: string, startTime: string) {
    let task = JSON.parse(localStorage.getItem('task') || '{}');
    let response_date = await fetch('http://127.0.0.1:8000/put_start_date/?id=' + task.id + '&start_date=' + startDate,
    {
        method: 'PUT'
    });

    let response_time = await fetch('http://127.0.0.1:8000/put_start_time/?id=' + task.id + '&start_time=' + startTime,
    {
        method: 'PUT'
    });

    let response_status = await fetch('http://127.0.0.1:8000/put_status/?id=' + task.id + '&status=in_progress',
    {
        method: 'PUT'
    });

    if (response_date.ok && response_time.ok && response_status.ok) {
        
    } else {
        alert('Ошибка HTTP: \n' + response_date.status + '\n' + response_time.status + '\n' + response_status.status);
    }
}

endTaskBtn?.addEventListener('click', () => {
    let now = new Date();

    let endDate = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
    let endTime = now.getHours() + ':' + now.getMinutes() + ":" + now.getMilliseconds();
    
    putEndDateTimeStatus(endDate, endTime);
})

async function putEndDateTimeStatus(endDate: string, endTime: string) {
    let task = JSON.parse(localStorage.getItem('task') || '{}');
    let response_date = await fetch('http://127.0.0.1:8000/put_end_date/?id=' + task.id + '&end_date=' + endDate,
    {
        method: 'PUT'
    });

    let response_time = await fetch('http://127.0.0.1:8000/put_end_time/?id=' + task.id + '&end_time=' + endTime,
    {
        method: 'PUT'
    });

    let response_status = await fetch('http://127.0.0.1:8000/put_status/?id=' + task.id + '&status=complete',
    {
        method: 'PUT'
    });

    if (response_date.ok && response_time.ok && response_status.ok) {
        localStorage.removeItem('tasks');
        localStorage.removeItem('task');
        localStorage.removeItem('minutes');
        localStorage.removeItem('seconds');
        window.location.pathname = '/';
    } else {
        alert('Ошибка HTTP: \n' + response_date.status + '\n' + response_time.status + '\n' + response_status.status);
    }
}

errorTaskBtn?.addEventListener('click', () => {
    let now = new Date();

    let endDate = now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate();
    let endTime = now.getHours() + ':' + now.getMinutes() + ":" + now.getMilliseconds();
    
    putEndDateTimeStatusError(endDate, endTime);
})

async function putEndDateTimeStatusError(endDate: string, endTime: string) {
    let task = JSON.parse(localStorage.getItem('task') || '{}');
    let response_date = await fetch('http://127.0.0.1:8000/put_end_date/?id=' + task.id + '&end_date=' + endDate,
    {
        method: 'PUT'
    });

    let response_time = await fetch('http://127.0.0.1:8000/put_end_time/?id=' + task.id + '&end_time=' + endTime,
    {
        method: 'PUT'
    });

    let response_status = await fetch('http://127.0.0.1:8000/put_status/?id=' + task.id + '&status=error',
    {
        method: 'PUT'
    });

    if (response_date.ok && response_time.ok && response_status.ok) {
        localStorage.removeItem('tasks');
        localStorage.removeItem('task');
        localStorage.removeItem('minutes');
        localStorage.removeItem('seconds');
        window.location.pathname = '/';
    } else {
        alert('Ошибка HTTP: \n' + response_date.status + '\n' + response_time.status + '\n' + response_status.status);
    }
}
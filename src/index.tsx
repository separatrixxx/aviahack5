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

input?.addEventListener('keypress', function(e){
    if(e.which === 13){
        e.preventDefault();
        let val: string = input.value;

        if (val === 'qwerty') {
            localStorage.setItem('token_enter', 'ok');
            window.location.reload();
        } else {
            localStorage.removeItem('token_enter');
            alert('Ты чё-то перепутал');
        }
    }
});
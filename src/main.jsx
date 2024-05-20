import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './assets/fonts/fontawesome-free-6.1.2-web/css/all.css'; 
import './assets/css/normalize.css'; 
import './assets/css/styles.css'; 
import './assets/css/responsive.css'; 

import TimeAgo from 'javascript-time-ago'

import es from 'javascript-time-ago/locale/es'
import ru from 'javascript-time-ago/locale/ru'

TimeAgo.addDefaultLocale(es)
TimeAgo.addLocale(ru)

ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
)

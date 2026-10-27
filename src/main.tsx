import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import DetailPage from './components/DetailPage';
import './styles.css';
ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode>{['/','/vi','/vi/','/en','/en/','/book','/book/'].includes(location.pathname)?<App/>:<DetailPage/>}</React.StrictMode>);

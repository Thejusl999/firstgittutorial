import ReactDOM from 'react-dom/client';
import ContextProvider from './store/ContextProvider';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<ContextProvider><App/></ContextProvider>);

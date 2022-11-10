import React from 'react';
import ReactDOM from 'react-dom/client';
import 'semantic-ui-css/semantic.min.css';
import './app/layout/styles.css';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import { store, StoreContext } from './app/stores/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './features/home/HomePage';
import ActivityDashboard from './features/activities/dashboard/ActivityDashboard';
import ActivityForm from './features/activities/form/ActivityForm';
import ActivityDetails from './features/activities/details/ActivityDetails';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <HomePage />,
            },
            {
                path: 'activities',
                element: <ActivityDashboard />,
            },
            {
                path: 'activities/:id',
                element: <ActivityDetails />,
            },
            {
                path: 'createActivity',
                element: <ActivityForm />,
            },
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    // <React.StrictMode>
    <StoreContext.Provider value={store}>
        <RouterProvider router={router} />
    </StoreContext.Provider>
    // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

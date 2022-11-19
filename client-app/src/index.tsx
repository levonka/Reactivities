import React from 'react';
import ReactDOM from 'react-dom/client';
import 'semantic-ui-css/semantic.min.css';
import 'react-calendar/dist/Calendar.css';
import 'react-toastify/dist/ReactToastify.min.css';
import './app/layout/styles.css';
import App from './app/layout/App';
import reportWebVitals from './reportWebVitals';
import { store, StoreContext } from './app/stores/store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './features/home/HomePage';
import ActivityDashboard from './features/activities/dashboard/ActivityDashboard';
import ActivityForm from './features/activities/form/ActivityForm';
import ActivityDetails from './features/activities/details/ActivityDetails';
import TestErrors from './features/errors/TestError';
import NotFound from './features/errors/NotFound';
import ServerError from './features/errors/ServerError';

const router = createBrowserRouter([
    {
        path: '',
        element: <HomePage />,
    },
    {
        element: <App />,
        children: [
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
            {
                path: 'manage/:id',
                element: <ActivityForm />,
            },
            {
                path: 'errors',
                element: <TestErrors />,
            },
            {
                path: 'server-error',
                element: <ServerError />,
            },
        ],
    },
    {
        path: '*',
        element: <NotFound />,
    },
]);
/*
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route path="" element={<HomePage />} />
            <Route path="activities" element={<ActivityDashboard />} />
            <Route path="activities/:id" element={<ActivityDetails />} />
            <Route path="createActivity" element={<ActivityForm />} />
            <Route path="manage/:id" element={<ActivityForm />} />
        </Route>
    )
);*/

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

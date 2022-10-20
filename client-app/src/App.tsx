import React from 'react';
import './App.css';
import { Header, List } from 'semantic-ui-react';

function App() {
    return (
        <div className="App">
            <Header as="h2" icon="users" content="Reactivities" />
            <List className="App-header"></List>
        </div>
    );
}

export default App;

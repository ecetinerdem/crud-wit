import { useState } from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import SideBar from './components/SideBar';
import Form from './components/Form';

function App() {
  const [users, setUsers] = useState([]);

  return (
    <>
      <h1>S11D3 CRUD Operations</h1>
      <div className="main-container">
        <div className="sideBar-container">
          <SideBar users={users} setUsers={setUsers} />
        </div>
        <div className="form-container">
          {/*TODO: From component'ini 2 kere ve aynı şek */}
          <Route path="/" exact>
            <Form users={users} setUsers={setUsers} />
          </Route>
          <Route path="/:id">
            <Form users={users} setUsers={setUsers} />
          </Route>
        </div>
      </div>
    </>
  );
}

export default App;

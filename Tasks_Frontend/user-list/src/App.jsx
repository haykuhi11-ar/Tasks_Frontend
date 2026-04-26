import { useState } from 'react'
import  './App.css';
import AddUser from './components/Add-user';
import UserList from './components/User-list';

export default function App() {
  const [users, setUsers] = useState([]);

  const addUser = (user) => {
    setUsers([...users, user]);
  } 

  const deleteUser = (id) => {
    setUsers(users.filter(u => u.id !== id));
  }

  return (
    <div className='container'>
      <div className='layout'>
        <div className='left'>
          <AddUser
            addUser={addUser}
          />
        </div>
        <div className='right'>
          <UserList
            users={users}
            deleteUser={deleteUser}
          />
        </div>
      </div>
    </div>
  );
}
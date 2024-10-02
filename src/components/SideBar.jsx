import { useEffect } from 'react';
import { API } from '../services/api';
import User from './User';

export default function SideBar({ users, setUsers }) {
  useEffect(() => {
    API.get('/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => console.log(error.messsage));
  }, []);

  function deleteHandler(id) {
    API.delete(`/users/${id}`)
      .then((response) => {
        setUsers(users.filter((user) => user.id !== id));
      })
      .catch((error) => console.log(error.messsage));
  }
  return (
    <div>
      <h2>Users</h2>
      {users.map((user) => (
        <User user={user} deleteHandler={deleteHandler} />
      ))}
    </div>
  );
}

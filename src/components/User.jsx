import { useHistory } from 'react-router-dom';

export default function User({ user, deleteHandler }) {
  const history = useHistory();
  return (
    <p key={user.id}>
      {user.name}
      <div>
        <button onClick={() => history.push(`/${user.id}`)}>Edit</button>
        <button onClick={() => deleteHandler(user.id)}>Delete</button>
      </div>
    </p>
  );
}

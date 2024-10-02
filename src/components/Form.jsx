import { useForm } from 'react-hook-form';
import { API } from '../services/api';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

export default function Form({ users, setUsers }) {
  //Tek formu hem update hem de create için kullanmaya çalışıyoruz. id'yi route param olarak alıyoruz.
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: '',
      avatar: `https://picsum.photos/200?${Math.floor(Math.random() * 100)}`,
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  //eğer id var ise edit yapmak istiyorum demektir.componentDidMount olduğunda edit yapmak istediğim kullanıcının tüm bilgilerini alıyorum(READ) ve formState'ini güncelliyorum.
  useEffect(() => {
    if (id) {
      API.get(`/users/${id}`)
        .then((response) => {
          /*  const { name, avatar, email, password } = response.data;
          setValue('name', name);
          setValue('avatar', avatar);
          setValue('email', email);
          setValue('password', password); */
          reset(response.data);
        })
        .catch((error) => console.log(error.message));
    }
  }, [id]);

  //edit ve create için 2 ayrı submit fonksiyonu tanımlamak lazım. yapılan istekler birbirinden farklı ve sonucunda yapılanlar da farklı.
  function createUser(data) {
    API.post('/users', data)
      .then((response) => {
        setUsers([response.data, ...users]);
        reset();
      })
      .catch((error) => console.log(error.message));
  }

  function editUser(data) {
    API.put(`/users/${id}`, data)
      .then((response) => {
        setUsers(
          users.map((user) => {
            if (user.id === id) {
              return response.data;
            }
            return user;
          })
        );
        reset();
      })
      .catch((error) => console.log(error.message));
  }

  //sonradan kodları okuduğumuzda daha kolay anlamak için declarative mantığında yazdık. hangi durumda ne yapacak? nasıl yapacak kısmı kullanılan metodun içinde var.
  function submitFn(data) {
    if (id) {
      editUser(data);
    } else {
      createUser(data);
    }
  }

  return (
    <form onSubmit={handleSubmit(submitFn)}>
      <h2>Form</h2>
      <div>
        <label htmlFor="name">Full Name</label>
        <input
          id="name"
          {...register('name', {
            minLength: { value: 3, message: 'En az 3 karakter giriniz' },
          })}
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div>
        <label htmlFor="avatar">Avatar</label>
        <input id="avatar" {...register('avatar')} />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" {...register('email')} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          {...register('password', {
            minLength: { value: 8, message: 'En az 8 karakter giriniz' },
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <div>
        <button disabled={!isValid}>{id ? 'Güncelle' : 'Kaydet'}</button>
      </div>
    </form>
  );
}

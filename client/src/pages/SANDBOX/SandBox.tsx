import { useEffect, useState } from 'react';
import { deleteUser, getUsers } from '../../services/ApiService';
import { User } from '../../interfaces/User';
import Title from '../../components/Title';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import './SandBox.css';
import { CardWithLikes } from '../../interfaces/Card';

interface SandboxProps {
  businesses: CardWithLikes[];
}

const Sandbox = ({ businesses }: SandboxProps) => {
  const [users, setUsers] = useState<Array<User>>([]);

  useEffect(() => {
    getUsers()
      .then((json) => {
        setUsers(json);
      })
      .catch((error) => {
        console.log(error);
        if (error instanceof Error) {
          toast.error(error.message);
        }
      });
  }, []);

  async function handleDelete(id: string) {
    if (window.confirm('Are you sure you want to delete?')) {
      try {
        await deleteUser(id);

        const updated = [...users].filter((user) => user._id !== id);
        setUsers(updated);
        toast.success('User successfully deleted.');
      } catch (error) {
        console.log(error);
        if (error instanceof Error) {
          toast.error(error.message);
        }
      }
    }
  }

  return (
    <>
      <div className="container">
        <Title mainText="Admin" />
        <table className="table table-hover text-center">
          <thead>
            <tr>
              <th className="userId">User ID</th>
              <th>Admin</th>
              <th>Firstname</th>
              <th>Email</th>
              <th className="phone">Phone number</th>
              <th>Business</th>

              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="userId">{user._id}</td>
                <td>{JSON.stringify(user.isAdmin)}</td>
                <td>{user.firstName}</td>
                <td>{user.email}</td>
                <td className="phone">{user.phone}</td>
                <td>{JSON.stringify(user.isBiz)}</td>
                <td>
                  {!user.isAdmin && (
                    <Link to={`/sandbox/edituser/${user._id}`}>
                      <button className="btn bt-light">
                        <i className="bi bi-pen" />
                      </button>
                    </Link>
                  )}

                  {!user.isAdmin && (
                    <button
                      onClick={() => handleDelete(user._id as string)}
                      className="btn bt-light"
                    >
                      <i className="bi bi-trash2" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <br />
        <table className="table table-hover text-center w-50 mx-auto">
          <thead>
            <tr>
              <th className="userId">Business name</th>
              <th className="userId">Likes</th>
            </tr>
          </thead>
          <tbody>
            {businesses.map((business) => (
              <tr key={business._id}>
                <td className="userId">{business.bizTitle}</td>
                <td className="userId">{business.likes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Sandbox;

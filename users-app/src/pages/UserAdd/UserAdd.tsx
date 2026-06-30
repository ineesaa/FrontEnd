import { useNavigate } from 'react-router-dom';
import { useAddUserMutation } from '../../features/users/usersApi';
import UserForm from '../../components/UserForm/UserForm';
import type { UserFormValues } from '../../types/user';

function UserAdd() {
  const navigate = useNavigate();
  const [addUser, { isLoading }] = useAddUserMutation();

  const handleSubmit = async (data: UserFormValues) => {
    try {
      await addUser(data).unwrap();
      navigate('/');
    } catch (err) {
      console.error('Add error:', err);
      alert('Failed to add the user. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 pb-8">
      <h1 className="text-slate-800 mb-6 text-2xl font-bold">Add New User</h1>
      <UserForm onSubmit={handleSubmit} submitLabel="Add" isSubmitting={isLoading} />
    </div>
  );
}

export default UserAdd;

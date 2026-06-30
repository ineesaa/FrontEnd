import { useNavigate, useParams } from 'react-router-dom';
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from '../../features/users/usersApi';
import UserForm from '../../components/UserForm/UserForm';
import type { UserFormValues } from '../../types/user';

function UserEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    data: user,
    isLoading,
    isError,
  } = useGetUserByIdQuery(id ?? '', { skip: !id });

  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();

  const handleSubmit = async (data: UserFormValues) => {
    if (!id) return;
    try {
      await updateUser({ id, data }).unwrap();
      navigate('/');
    } catch (err) {
      console.error('Update error:', err);
      alert('Failed to save changes. Please try again.');
    }
  };

  if (!id) {
    return <p className="text-center text-red-500 mt-12 text-[1.05rem]">Invalid id.</p>;
  }

  if (isLoading) {
    return <p className="text-center text-slate-500 mt-12 text-[1.05rem]">Loading...</p>;
  }

  if (isError || !user) {
    return <p className="text-center text-red-500 mt-12 text-[1.05rem]">User not found.</p>;
  }

  const { id: _omit, ...defaultValues } = user;
  void _omit;

  return (
    <div className="max-w-4xl mx-auto px-6 pb-8">
      <h1 className="text-slate-800 mb-6 text-2xl font-bold">Edit User</h1>
      <UserForm
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        submitLabel="Save Changes"
        isSubmitting={isUpdating}
      />
    </div>
  );
}

export default UserEdit;

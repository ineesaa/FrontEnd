import { useState } from 'react';
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from '../../features/users/usersApi';
import UserCard from '../../components/UserCard/UserCard';

function UsersList() {
  const { data: users, isLoading, isError, error } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      setDeletingId(id);
      await deleteUser(id).unwrap();
    } catch (err) {
      console.error('Delete error:', err);
      alert('Failed to delete the user. Please try again.');
    } finally {
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return <p className="text-center text-slate-500 mt-12 text-[1.05rem]">Loading...</p>;
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 mt-12 text-[1.05rem]">
        Error loading data. {error && 'status' in error ? `(${error.status})` : ''}
      </p>
    );
  }

  if (!users || users.length === 0) {
    return <p className="text-center text-slate-500 mt-12 text-[1.05rem]">No users yet.</p>;
  }

  return (
    <div className="max-w-4xl mx-auto px-6 pb-8">
      <h1 className="text-slate-800 mb-6 text-2xl font-bold">Users List</h1>
      <ul className="flex flex-col gap-4 p-0 m-0">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onDelete={handleDelete}
            isDeleting={deletingId === user.id}
          />
        ))}
      </ul>
    </div>
  );
}

export default UsersList;

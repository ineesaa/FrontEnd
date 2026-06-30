import { Link } from 'react-router-dom';
import type { User } from '../../types/user';
interface UserCardProps {
  user: User;
  onDelete: (id: string) => void;
  isDeleting?: boolean;
}

function UserCard({ user, onDelete, isDeleting = false }: UserCardProps) {
  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${user.firstName} ${user.lastName}?`
    );
    if (confirmed) {
      onDelete(user.id);
    }
  };

  return (
    <li className="list-none flex justify-between items-center gap-4 bg-white rounded-xl px-6 py-5 shadow-sm flex-wrap">
      <div className="flex-1 min-w-[220px]">
        <h3 className="text-lg font-semibold text-slate-800 mb-2">
          {user.firstName} {user.lastName}
        </h3>
        <p className="text-sm text-slate-500 my-0.5">
          <span className="font-semibold text-slate-800">Email:</span> {user.email}
        </p>
        <p className="text-sm text-slate-500 my-0.5">
          <span className="font-semibold text-slate-800">Phone:</span> {user.phone}
        </p>
        <p className="text-sm text-slate-500 my-0.5">
          <span className="font-semibold text-slate-800">Age:</span> {user.age}
        </p>
        <p className="text-sm text-slate-500 my-0.5">
          <span className="font-semibold text-slate-800">City:</span> {user.city}
        </p>
      </div>

      <div className="flex gap-2.5 items-center shrink-0">
        <Link
          to={`/users/edit/${user.id}`}
          className="no-underline bg-indigo-50 text-indigo-600 px-4 py-2 rounded-lg text-sm font-semibold transition-colors hover:bg-indigo-100"
        >
          Edit
        </Link>
        <button
          type="button"
          onClick={handleDelete}
          disabled={isDeleting}
          className="border-none bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-semibold transition-colors hover:bg-red-100 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {isDeleting ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </li>
  );
}

export default UserCard;

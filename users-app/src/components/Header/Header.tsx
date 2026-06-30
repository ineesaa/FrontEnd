import { NavLink } from 'react-router-dom';

function Header() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
      isActive
        ? 'bg-indigo-600 text-white hover:bg-indigo-600'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
    }`;

  return (
    <header className="bg-white shadow-sm mb-8">
      <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center flex-wrap gap-3">
        <span className="text-xl font-bold text-slate-800">Users App</span>
        <nav className="flex gap-2">
          <NavLink to="/" end className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/users/add" className={linkClass}>
            Add User
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;

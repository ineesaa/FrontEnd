import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="text-center mt-16">
      <h1 className="text-6xl text-indigo-600 m-0 font-bold">404</h1>
      <p className="text-slate-500 text-lg my-3">Page not found</p>
      <Link
        to="/"
        className="no-underline bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-semibold inline-block hover:bg-indigo-700 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;

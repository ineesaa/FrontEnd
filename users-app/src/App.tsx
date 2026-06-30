import { Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import UsersList from './pages/UsersList/UsersList';
import UserEdit from './pages/UserEdit/UserEdit';
import UserAdd from './pages/UserAdd/UserAdd';
import NotFound from './pages/NotFound/NotFound';

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<UsersList />} />
          <Route path="/users/add" element={<UserAdd />} />
          <Route path="/users/edit/:id" element={<UserEdit />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </>
  );
}

export default App;

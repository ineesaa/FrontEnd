import { UserProvider } from "./components/context/UserContext"
import { UserList } from "./components/UserList"
import { AddUser } from "./components/AddUser"

export default function App() {
  return (
    <UserProvider>
      <div className="container mt-4">
        <AddUser />
        <UserList />
      </div>
    </UserProvider>
  )
}
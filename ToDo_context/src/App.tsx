import { ToDoList } from "./components/ToDoList";
import { ToDoService } from "./context/provider";

export default function App() {
  return (
    <>
      <ToDoService>
        <ToDoList />
      </ToDoService>


    </>
  )
}
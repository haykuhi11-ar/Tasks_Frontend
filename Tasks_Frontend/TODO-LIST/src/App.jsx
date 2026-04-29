import ToDoList from "./components/Todo-list";

export default function App() {
  return (
    <div className="container-fluid app-bg">
      <h1 className="text-center my-4">ToDo List</h1>

      <div className="justify-content-center">
        <div className="">
          <ToDoList />
        </div>
      </div>
    </div>
  );
}
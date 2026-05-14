import { UserList } from "./Components/UserList";
import { ContextProvider } from "./Context/provider";

export default function App() {
  return (
    <ContextProvider>
      <UserList />
    </ContextProvider>
  )
}
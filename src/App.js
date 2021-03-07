import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Container from "./components/Container";
import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {

  return (
    <div className="App">
      <ToastContainer autoClose={1500} />
      <Container>
        <Form />
        <TodoList />
      </Container>
    </div>
  );
}

export default App;

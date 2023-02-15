import ToDoInput from "./components/todo-input/todo-input";
import { Provider } from "react-redux";
import store from "./redux/store";

export default function App() {
  return (
    <Provider store={store}>
      <section>
        <ToDoInput />
      </section>
    </Provider>
  );
}

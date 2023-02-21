import { useState } from "react";
import {
  useComponentDispatch,
  useComponentSelector,
} from "../../tests/redux-hooks";
import { Input, Button } from "antd";
import ToDoList from "../todo-list/todo-list";
import todoList from "../../redux/todo";

export default function ToDoInput() {
  const [input, setInput] = useState("");
  const [display, setDisplay] = useState(false);
  const state = useComponentSelector((state) => state);
  const dispatch = useComponentDispatch();

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  function handleClick() {
    dispatch(
      todoList.actions.addItem({
        state: input,
        id: Math.floor(Math.random() * 1000),
      })
    );
    setDisplay(true);
    setInput("");
  }
  return (
    <section className='listContainer'>
      <h1>Todo App</h1>
      <section>
        <Input
          type='text'
          size='small'
          placeholder='start adding items to your list......'
          allowClear
          value={input}
          onChange={(e) => handleInput(e)}
          style={{ width: "300px", marginRight: "20px" }}
        />
        <Button type='primary' onClick={() => handleClick()}>
          Add Item
        </Button>
      </section>
      <section>
        <ToDoList list={state} display={display} />
      </section>
    </section>
  );
}

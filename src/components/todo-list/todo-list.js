import { Button, List } from "antd";
import { useComponentDispatch } from "../../tests/redux-hooks";
import todoList from "../../redux/todo";

export default function ToDoList({ list, display }) {
  const dispatch = useComponentDispatch();
  return (
    <div>
      <List
        dataSource={list.todo}
        renderItem={(item) => (
          <List.Item
            style={{
              width: "300px",
              margin: "0 auto",
            }}
          >
            <p style={{ marginRight: "20px" }}>{item.state}</p>
            <Button
              type='default'
              onClick={() => {
                dispatch(todoList.actions.removeItem(item.id));
              }}
            >
              Remove Item
            </Button>
          </List.Item>
        )}
      />
      {display && (
        <Button
          type='primary'
          onClick={() => dispatch(todoList.actions.clearItem())}
        >
          Clear Items
        </Button>
      )}
    </div>
  );
}

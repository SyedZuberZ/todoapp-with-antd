import { createSlice } from "@reduxjs/toolkit";

const todoListItems = [];
const todoList = createSlice({
  name: "todo-list",
  initialState: todoListItems,
  reducers: {
    addItem: (state, action) => {
      state.push({ state: action.payload.state, id: action.payload.id });
      return state;
    },
    removeItem: (state, action) => {
      console.log(action);
      const removedItem = state.filter((item) => item.id !== action.payload);
      return removedItem;
    },
    clearItem: () => {
      return [];
    },
  },
});

export default todoList;

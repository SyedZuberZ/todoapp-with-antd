import { configureStore } from "@reduxjs/toolkit";
import todoList from "./todo";

const store = configureStore({
  reducer: {
    todo: todoList.reducer,
  },
});

export default store;

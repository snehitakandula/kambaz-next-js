import React from "react";
import { useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import { ListGroup } from "react-bootstrap";

export default function TodoList() {
  const { todos } = useSelector((state: any) => state.todosReducer);

  return (
    <div id="wd-todo-list-redux" className="p-3">
      <h2 className="mb-3">Todo List</h2>

      {/* Add/Update Section */}
      <div className="mb-3">
        <TodoForm />
      </div>

      {/* Todo Items Section */}
      <ListGroup>
        {todos.map((todo: any) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ListGroup>

      <hr />
    </div>
  );
}

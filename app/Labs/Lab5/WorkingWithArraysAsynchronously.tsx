"use client";

import { FaPencil } from "react-icons/fa6";
import { TiDelete } from "react-icons/ti";
import React, { useState, useEffect } from "react";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { FaTrash, FaPlusCircle } from "react-icons/fa";
import axios from "axios";
import * as client from "./client";

interface Todo {
  id: string | number;
  title: string;
  completed: boolean;
  editing?: boolean;
}

export default function WorkingWithArraysAsynchronously() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchTodos = async () => {
    try {
      const todos = await client.fetchTodos();
      setTodos(todos);
    } catch {
      setErrorMessage("Failed to load todos.");
    }
  };

  const removeTodo = async (todo: Todo) => {
    try {
      const updatedTodos = await client.removeTodo(todo);
      setTodos(updatedTodos);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.message || "Remove failed.");
      } else {
        setErrorMessage("Unexpected error.");
      }
    }
  };

  const createNewTodo = async () => {
    try {
      const todos = await client.createNewTodo();
      setTodos(todos);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.message || "Create failed.");
      } else {
        setErrorMessage("Unexpected error.");
      }
    }
  };

  const postNewTodo = async () => {
    try {
      const newTodo = await client.postNewTodo({
        title: "New Posted Todo",
        completed: false,
      });
      setTodos([...todos, newTodo]);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.message || "Post failed.");
      } else {
        setErrorMessage("Unexpected error.");
      }
    }
  };

  const deleteTodo = async (todo: Todo) => {
    try {
      await client.deleteTodo(todo);
      setTodos(todos.filter((t) => t.id !== todo.id));
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.message || "Delete failed.");
      } else {
        setErrorMessage("Unexpected error.");
      }
    }
  };

  const editTodo = (todo: Todo) => {
    setTodos(
      todos.map((t) =>
        t.id === todo.id ? { ...t, editing: true } : t
      )
    );
  };

  const updateTodo = async (todo: Todo) => {
    try {
      await client.updateTodo(todo);
      setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data?.message || "Update failed.");
      } else {
        setErrorMessage("Unexpected error.");
      }
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div id="wd-asynchronous-arrays">
      <h3>Working with Arrays Asynchronously</h3>

      {errorMessage && (
        <div
          id="wd-todo-error-message"
          className="alert alert-danger mb-2 mt-2"
        >
          {errorMessage}
        </div>
      )}

      <h4>
        Todos
        <FaPlusCircle
          onClick={createNewTodo}
          className="text-success float-end fs-3"
          id="wd-create-todo"
          style={{ cursor: "pointer" }}
        />
        <FaPlusCircle
          onClick={postNewTodo}
          className="text-primary float-end fs-3 me-3"
          id="wd-post-todo"
          style={{ cursor: "pointer" }}
        />
      </h4>

      <ListGroup>
        {todos.map((todo) => (
          <ListGroupItem key={todo.id}>
            <FaTrash
              onClick={() => removeTodo(todo)}
              className="text-danger float-end mt-1"
              id="wd-remove-todo"
              style={{ cursor: "pointer" }}
            />

            <TiDelete
              onClick={() => deleteTodo(todo)}
              className="text-danger float-end me-2 fs-3"
              id="wd-delete-todo"
              style={{ cursor: "pointer" }}
            />

            <FaPencil
              onClick={() => editTodo(todo)}
              className="text-primary float-end me-2 mt-1"
              style={{ cursor: "pointer" }}
            />

            <input
              type="checkbox"
              className="form-check-input me-2 float-start"
              defaultChecked={todo.completed}
              onChange={(e) =>
                updateTodo({ ...todo, completed: e.target.checked })
              }
            />

            {!todo.editing ? (
              <span>
                {todo.title}
              </span>
            ) : (
              <FormControl
                className="w-50 float-start"
                defaultValue={todo.title}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    updateTodo({ ...todo, editing: false });
                  }
                }}
                onChange={(e) =>
                  updateTodo({ ...todo, title: e.target.value })
                }
              />
            )}
          </ListGroupItem>
        ))}
      </ListGroup>

      <hr />
    </div>
  );
}

import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from 'uuid';

const LOCAL_KEY = 'todoApp2.todos'

function App() {
  const [todos, setTodos] = useState([]),
    refTodoName = useRef();

  useEffect(() => {
    const storagedItems = JSON.parse(localStorage.getItem(LOCAL_KEY))
    if (storagedItems) setTodos(storagedItems)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(todos))
  }, [todos])

  const inputEnter = (e) => {
    if (e.key === 'Enter') handleAddTodo()
  }

  function handleAddTodo() {
    const name = refTodoName.current.value
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
    })
    refTodoName.current.value = null
  }

  function handleRemoveTodo() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input type="text" ref={refTodoName} onKeyDown={inputEnter} />
      <button onClick={handleAddTodo} >Add activity</button>
      <button onClick={handleRemoveTodo}>Remove finished activities</button>

    </>
  );
}

export default App;

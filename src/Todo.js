import React from 'react'

function Todo({ todo, toggleTodo }) {
  function handleChecked() {
    toggleTodo(todo.id)
  }
  return (
    <div>
      <label>
        <input type="checkbox" checked={todo.complete} onChange={handleChecked} />{todo.name}
      </label>
    </div>
  )
}

export default Todo
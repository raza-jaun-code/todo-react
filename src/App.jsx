import { useState } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import { FaEdit, FaTrash, FaSave, FaPlus } from 'react-icons/fa';

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [editText, setEditText] = useState("");

  const isEditing = todos.some(todo => todo.editing);

  const addTodo = (e) => {
    e.preventDefault();
    if (!(todo.trim().length)) return;
    setTodos([...todos, { id: uuidv4(), text: todo, editing: false }]);
    setTodo("");
  }

  const editTodo = (e, tid) => {
    e.preventDefault();
    setTodos(todos.map(todo => todo.id === tid ? { ...todo, editing: false, text: editText } : todo))
    setEditText("");
  }

  const deleteTodo = (e, tid) => {
    e.preventDefault();
    setTodos(todos.filter(todo => todo.id !== tid))
  }

  const changeEditing = (e, elem) => {
    e.preventDefault();
    if (todos.some(todo => todo.editing)) return;
    setEditText(elem.text)
    setTodos(todos.map(todo => todo.id === elem.id ? { ...todo, editing: true } : todo));
  }

  return (
    <div className="app-container">
      <div className="header">
        <h1>My Todo List</h1>
        <p>Organize your tasks in style ✨</p>
      </div>

      <div className="add-todo">
        <input
          type="text"
          readOnly={isEditing}
          placeholder='What needs to be done?'
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button className="add-btn" onClick={addTodo}>
          <FaPlus /> Add Task
        </button>
      </div>

      <div className="todos-list">
        {todos.map((element) => (
          <div key={element.id} className="todo-card">
            <input
              className={`todo-input ${element.editing ? 'editing' : ''}`}
              value={element.editing ? editText : element.text}
              readOnly={!element.editing}
              onChange={(e) => setEditText(e.target.value)}
            />
            <div className="todo-actions">
              {!element.editing
                ? <button className="edit-btn" onClick={(e) => changeEditing(e, element)}>
                    <FaEdit />
                  </button>
                : <button className="save-btn" onClick={(e) => editTodo(e, element.id)}>
                    <FaSave />
                  </button>}
              <button className="delete-btn" onClick={(e) => deleteTodo(e, element.id)}>
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

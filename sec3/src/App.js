import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addTodo, deleteTodo, editTodo, toggleTodo } from "./store/todoSlice";

function App() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos); // 스토어에 있는 값을 가져올때는 useSelector
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");
  const [select, setSelect] = useState("전체");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() !== "") {
      dispatch(addTodo(text));
    }
    setText("");
  };

  const handleDelete = (id) => {
    // store 값 변경 필요 => 디스패치
    dispatch(deleteTodo(id));
  };

  const handleEditStart = (id, text) => {
    setEditId(id);
    setEditText(text);
  };

  const handleEditCancel = () => {
    setEditId(null);
    setEditText("");
  };

  const handleEditSave = () => {
    if (editText.trim() !== "") {
      dispatch(editTodo({ id: editId, newText: editText }));
      setEditId(null);
      setEditText("");
    }
  };

  const handleSelect = (e) => {
    setSelect(e.target.value);
  };

  const selectedTodos = todos.filter((todo) => {
    if (select === "완료") {
      return todo.completed;
    } else if (select === "미완료") {
      return !todo.completed;
    } else {
      return true;
    }
  });
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <select onChange={handleSelect} value={select}>
          <option value="전체">all</option>
          <option value="완료">completed</option>
          <option value="미완료">active</option>
        </select>
        <input value={text} onChange={(e) => setText(e.target.value)} />
        <button type="submit">Add Todo</button>
      </form>
      <ul>
        {selectedTodos.map((todo) => (
          <li key={todo.id}>
            {todo.id === editId ? (
              <>
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button onClick={handleEditSave}>save</button>
                <button onClick={handleEditCancel}>cancel</button>
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => dispatch(toggleTodo(todo.id))}
                />
                <span>{todo.text}</span>
                <button onClick={() => handleEditStart(todo.id, todo.text)}>
                  edit
                </button>
                <button onClick={() => handleDelete(todo.id)}>delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

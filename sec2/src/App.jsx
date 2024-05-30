import { useDispatch, useSelector } from "react-redux";
import { increment, asyncIncrement } from "./redux/action";
import "./App.css";

function Counter() {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();

  return (
    <div className="counter">
      <h1>counter</h1>
      <p>Count: {count}</p>
      <button onClick={() => dispatch(increment())}>+ 1</button>
      <button onClick={() => dispatch(asyncIncrement())}>1초 후 증가</button>
    </div>
  );
}

export default Counter;

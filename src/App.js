import './App.css';
import React from 'react';
import { useState } from 'react';

function App() {
  const [task, setTask] = useState(null);
  const [taskList, setTaskList] = useState([]);

  function onChangeTask(e) {
    setTask(e.target.value);
  }

  function handleClick() {
    taskList.push(task);
    setTaskList(taskList);
    setTask('');
  }

  return (
    <div className="App">
      <h1>TODOアプリ</h1>
      <div>
        <input type="text" placeholder='タイトル' value={task} onChange={onChangeTask} />
        <button onClick={handleClick}>追加</button>
        <table>
          <tbody>
            {taskList.map((task) => {
              return (
                <tr>
                  <td><input type="checkbox" /></td>
                  <td>{task}</td>
                  <td><button>削除</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <input type="text" placeholder='検索...' />
      </div>
    </div>
  );
}

export default App;

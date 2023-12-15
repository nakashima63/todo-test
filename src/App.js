import './App.scss';
import React from 'react';
import { useState, useEffect } from 'react';

function App() {
  const [task, setTask] = useState(null);
  const [taskList, setTaskList] = useState([]);
  const [checked, setChecked] = useState(false);
  const [keyWord, setKeyword] = useState(null);
  const [filteredTaskList, setFilteredTaskList] = useState([]);

  // タスクの入力
  function hundleInputTask(e) {
    setTask(e.target.value);
  }

  // タスクの追加
  function hundleAddTask() {
    const newTaskList = [...taskList, task];
    setTaskList(newTaskList);
    setTask('');
  }

  // タスクの削除
  function hundleDeleteTask(index) {
    const newTaskList = [...taskList];
    newTaskList.splice(index, 1);
    setTaskList(newTaskList);
  }

  // タスクの完了
  function handleChangeCheckbox() {
    setChecked(!checked);
  };

  useEffect(() => {
    const newFilteredTaskList = taskList.filter((task) => {
      return task.includes(keyWord);
    });
    setFilteredTaskList(newFilteredTaskList);
  }, [keyWord, taskList]);

  // タスクの検索
  function handleSearchTask(e) {
    setKeyword(e.target.value);
  }

  return (
    <div className="App">
      <div className='Card'>
        <h1>TODOアプリ</h1>
        <div className='AddForm'>
          <input type="text" placeholder='タイトル' value={task} onChange={hundleInputTask} />
          <button onClick={hundleAddTask}>追加</button>
        </div>
        <div className='TaskTable'>
          <table>
            <tbody>
              {keyWord ? filteredTaskList.map((task, index) => {
                return (
                  <tr>
                    <td><input type="checkbox" checked={checked} onChange={handleChangeCheckbox} /></td>
                    <td style={{ textDecoration: checked ? 'line-through' : 'none' }}>{task}</td>
                    <td><button onClick={() => hundleDeleteTask(index)}>削除</button></td>
                  </tr>
                );
              }) : taskList.map((task, index) => {
                return (
                  <tr>
                    <td><input type="checkbox" checked={checked} onChange={handleChangeCheckbox} /></td>
                    <td className={checked ? 'FinishedTask' : ''}>{task}</td>
                    <td><button onClick={() => hundleDeleteTask(index)}>削除</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <input type="text" value={keyWord} onChange={handleSearchTask} placeholder='検索...' />
      </div>
    </div>
  );
}

export default App;

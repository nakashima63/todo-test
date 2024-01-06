import './App.scss';
import React from 'react';
import { useState, useEffect } from 'react';

function App() {
  const [text, setText] = useState(null);
  const [taskList, setTaskList] = useState([]);
  const [keyWord, setKeyword] = useState(null);
  const [filteredTaskList, setFilteredTaskList] = useState([]);

  // タスクの入力
  function hundleInputText(e) {
    setText(e.target.value);
  }

  // タスクの追加
  function hundleAddTask() {
    const newTask = { name: text, checked: false };
    const newTaskList = [...taskList, newTask];
    setTaskList(newTaskList);
    setText('');
  }

  // タスクの削除
  function hundleDeleteTask(index) {
    const newTaskList = [...taskList];
    newTaskList.splice(index, 1);
    setTaskList(newTaskList);
  }

  // チェックボックスの切り替え
  function handleChangeCheckbox(index) {
    const newTaskList = [...taskList];
    newTaskList[index].checked = !newTaskList[index].checked;
    setTaskList(newTaskList);
  }

  useEffect(() => {
    const newFilteredTaskList = taskList.filter((task) => {
      if (!task.name) {
        return false;
      }
      return task.name.includes(keyWord);
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
          <input type="text" placeholder='タイトル' value={text} onChange={hundleInputText} />
          <button onClick={hundleAddTask}>追加</button>
        </div>
        <ul className="TaskList">
         {keyWord ? (
           filteredTaskList.map((task, index) => {
             return (
               <li key={index}>
                 <input type="checkbox" checked={task.checked} onChange={() => handleChangeCheckbox(index)} />
                 <span className={task.checked ? 'FinishedTask' : ''}>{task.name}</span>
                 <button onClick={() => hundleDeleteTask(index)}>削除</button>
               </li>
             );
           })
         ) : (
           taskList.map((task, index) => {
             return (
               <li key={index}>
                 <input type="checkbox" checked={task.checked} onChange={() => handleChangeCheckbox(index)} />
                 <span className={task.checked ? 'FinishedTask' : ''}>{task.name}</span>
                 <button onClick={() => hundleDeleteTask(index)}>削除</button>
               </li>
             );
           })
         )}
        </ul>
        <input type="text" value={keyWord} onChange={handleSearchTask} placeholder='検索...' />
      </div>
    </div>
  );
}

export default App;

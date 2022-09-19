import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import NavBar from './Components/navbar/NavBar';
import TasksList from './Components/TasksList';
import { createGlobalState } from 'react-hooks-global-state';

import toast from 'react-hot-toast';
import './App.css';

export const { useGlobalState } = createGlobalState({ data: null });

export const checkTasks = () => {
  if (localStorage.getItem('storageTasks') === null)
    localStorage.setItem('storageTasks', '[]');
};

export const getTasks = () => {
  checkTasks();
  return JSON.parse(localStorage.getItem('storageTasks'));
};

export const updateTasks = tasks => {
  localStorage.setItem('storageTasks', JSON.stringify(tasks));
};

export const completeTask = (currentId, bool) => {
  const tasks = getTasks();
  tasks[currentId].iscompleted = bool;

  updateTasks(tasks);
};

export const getStorageToken = () => {
  if (localStorage.getItem('storageToken') === null)
    localStorage.setItem('storageToken', uuidv4());

  return localStorage.getItem('storageToken');
};

export const removeTask = currentId => {
  const tasks = getTasks();
  const newTasks = tasks.filter(task => {
    return task.id !== currentId;
  });

  updateTasks(newTasks);
};

export const editTaskContent = (currentId, content, name) => {
  const tasks = getTasks();
  tasks[currentId].body = content;
  tasks[currentId].name = name;

  updateTasks(tasks);
};

function App() {
  // const [states, setStates] = useState();
  const [show, setShow] = useState('hidden');
  const [name, setName] = useState('');
  const [data, setData] = useGlobalState('data');
  const [body, setBody] = useState('');

  // useEffect(() => {
  //   setData(getTasks());
  // }, []);

  const addTask = (name, body, datetime, iscompleted, token) => {
    checkTasks();
    const id =
      getTasks().length === 0 ? 0 : getTasks()[getTasks().length - 1].id + 1;
    const object = { id, name, body, datetime, iscompleted, token };
    const tasks = getTasks();
    tasks.push(object);
    updateTasks(tasks);
  };

  const submitTask = () => {
    const current = new Date();
    const cDate =
      current.getFullYear() +
      '-' +
      (current.getMonth() + 1) +
      '-' +
      current.getDate();
    const cTime =
      current.getHours() +
      ':' +
      current.getMinutes() +
      ':' +
      current.getSeconds();
    const datetime = cDate + ' ' + cTime;

    if (name === '' || body === '') {
      toast.error('Fill the blank fields');
    } else {
      addTask(name, body, datetime, false, getStorageToken());
      setData(getTasks());

      setName('');
      setBody('');
    }
  };
  function showTodo() {
    setShow('');
  }

  return (
    <div>
      <NavBar />
      <button className="AddNote" onClick={showTodo}>
        ➕Add Note
      </button>
      <div className="App">
        <div className={` add-task ${show}`}>
          <ul className="task-options">
            <li>
              <input
                className="title"
                placeholder="Title"
                type="text"
                required
                value={name}
                onChange={e => setName(e.target.value)}
              ></input>
            </li>

            <li>
              <textarea
                className="textarea"
                required
                rows="6"
                placeholder="Notes.............."
                cols="37"
                value={body}
                onChange={e => setBody(e.target.value)}
              ></textarea>
            </li>
            <button className="btn-close">close</button>
            <button className="btn-submit" onClick={submitTask}>
              Add Note
            </button>
          </ul>
        </div>
        {data && <TasksList data={data}></TasksList>}
      </div>
    </div>
  );
}

export default App;

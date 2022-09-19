import {
  getTasks,
  completeTask,
  useGlobalState,
  getStorageToken,
  removeTask,
} from '../App';

import { useState } from 'react';

const TasksList = ({ data }) => {
  const [jsonData, setData] = useGlobalState('data');
  const [editingId, setEditingId] = useState(null);
  const [editing, setEditing] = useState(false);

  const [newName, setNewName] = useState('');

  return (
    <div className="tasks-list">
      <div className="task-container">
        {data &&
          data.map(task => {
            if (task.token === getStorageToken())
              return (
                <div className="task" key={task.id}>
                  <p className="small-text">Task:</p>
                  {(!editing || task.id !== editingId) && (
                    <h2 id={'name-' + task.id}>
                      {newName === ''
                        ? task.name
                        : editing && task.id === editingId
                        ? newName
                        : task.name}
                    </h2>
                  )}

                  <p>{task.datetime}</p>
                  <div className="completed">
                    <input
                      type="checkbox"
                      id={'cb' + task.id}
                      checked={task.iscompleted}
                      onChange={e => {
                        completeTask(task.id, e.target.checked);
                        setData(getTasks());
                      }}
                    ></input>
                  </div>
                  {(!editing || task.id !== editingId) && (
                    <p className="task-content" id={'content-' + task.id}>
                      {task.body}
                    </p>
                  )}
                  <button
                    className="btn-close"
                    onClick={() => {
                      removeTask(task.id);
                      setData(getTasks());
                    }}
                  >
                    Delete task
                  </button>
                </div>
              );
          })}
      </div>
    </div>
  );
};

export default TasksList;

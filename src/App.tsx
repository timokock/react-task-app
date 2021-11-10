import React, { useState, useRef } from 'react';

type FormElement = React.FormEvent<HTMLFormElement>;

interface ITask {
  taskName: string,
  done: boolean
}

function App(): JSX.Element {

  const [newTask, setNewTask] = useState<string>('');
  const [taskList, setTaskList] = useState<ITask[]>([]);
  const taskInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormElement): void => {
    e.preventDefault();
    addNewTaskToTaskList(newTask);
  };

  const addNewTaskToTaskList = (taskName: string): void => {
    const newTaskList: ITask[] = [...taskList, {taskName: taskName, done: false}];
    setTaskList(newTaskList);
    setNewTask('');
    taskInput.current?.focus();
  };

  const toggleDone = (taskID: number): void => {
    const tasks: ITask[] = [...taskList];
    tasks[taskID].done = !tasks[taskID].done;
    setTaskList(tasks);
  };
  const deleteTask = (taskID: number): void => {
    const tasks: ITask[] = [...taskList];
    tasks.splice(taskID, 1);
    setTaskList(tasks);
  };
 
  return (
    <div className="container p-4">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <input type="text" className="form-control" ref={taskInput} onChange={e => setNewTask(e.target.value)} value={newTask} autoFocus/>
                <button className="btn btn-success btn-block mt-2">Save</button>
              </form>
            </div>
        </div>
        {
          taskList.map((t: ITask, i: number) => {
            return (
            <div className="card card-body mt-2" key={i}>
              <h2 style={{textDecoration: t.done ? 'line-through' : ''}}>{t.taskName}</h2>
              <div>
                <button className="btn btn-secondary" onClick={() => toggleDone(i)}>{t.done ? '✓' : '✗'}</button>
                <button className="btn btn-danger" onClick={() => deleteTask(i)}>🗑</button>
              </div>
            </div>
            )
          })
        }          
        </div>
      </div>
    </div>
  );
}

export default App;

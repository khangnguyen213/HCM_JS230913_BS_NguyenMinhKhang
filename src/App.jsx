import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [modalDelete, setModalDelete] = useState(false);
  const [taskDelete, setTaskDelete] = useState({
    id: '',
    title: '',
    completed: false,
  });

  const [modalEdit, setModalEdit] = useState(false);
  const [taskEdit, setTaskEdit] = useState({
    id: '',
    title: '',
    completed: false,
  });

  const handleNewTaskChange = (e) => {
    setNewTask(e.target.value);
  };

  const addTask = () => {
    if (newTask === '') return;
    const task = {
      id: Math.floor(Math.random() * 10000),
      title: newTask,
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, task]);
    setNewTask('');
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => {
      const newTasks = [...prevTasks];
      const index = newTasks.findIndex((task) => task.id === id);
      newTasks.splice(index, 1);
      return newTasks;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    setModalDelete(false);
    setTaskDelete({
      id: '',
      title: '',
      completed: false,
    });
  };

  const editTask = () => {
    setTasks((prevTasks) => {
      const newTasks = [...prevTasks];
      const index = newTasks.findIndex((task) => task.id === taskEdit.id);
      newTasks[index].title = taskEdit.title;
      return newTasks;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    setModalEdit(false);
    setTaskEdit({
      id: '',
      title: '',
      completed: false,
    });
  };

  const checkTask = (id) => {
    setTasks((prevTasks) => {
      const newTasks = [...prevTasks];
      const index = newTasks.findIndex((task) => task.id === id);
      newTasks[index].completed = !newTasks[index].completed;
      return newTasks;
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  useEffect(() => {
    const sampleTasks = [
      { id: 1, title: 'Quét nhà', completed: false },
      { id: 2, title: 'Nấu cơm', completed: false },
      { id: 3, title: 'Rửa bát', completed: true },
    ];

    if (localStorage.getItem('tasks') === null) {
      localStorage.setItem('tasks', JSON.stringify(sampleTasks));
    }
    setTasks(JSON.parse(localStorage.getItem('tasks')));
  }, []);

  return (
    <div className="container">
      {modalDelete && (
        <div className="backdrop">
          <div className="modal-delete">
            <div className="modal-delete-content">
              <h1>Xác nhận xóa</h1>
              <h2>Bạn có muốn xóa công việc "{taskDelete.title}"?</h2>
              <div className="modal-delete-buttons">
                <button
                  className="btn-delete"
                  onClick={() => deleteTask(taskDelete.id)}
                >
                  Xóa
                </button>
                <button
                  className="btn-cancel"
                  onClick={() => setModalDelete(false)}
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {modalEdit && (
        <div className="backdrop">
          <div className="modal-edit">
            <div className="modal-edit-content">
              <h1>Cập nhật công việc</h1>
              <h2>Tên công việc</h2>
              <input
                type="text"
                placeholder="Nhập tên công việc"
                onChange={(e) =>
                  setTaskEdit({ ...taskEdit, title: e.target.value })
                }
                value={taskEdit.title}
              />
              <div className="modal-edit-buttons">
                <button className="btn-edit" onClick={editTask}>
                  Sửa
                </button>
                <button
                  className="btn-cancel"
                  onClick={() => {
                    setModalEdit(false);
                    setTaskEdit({
                      id: '',
                      title: '',
                      completed: false,
                    });
                  }}
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <h1>Danh sách công việc</h1>
      <div className="add-task">
        <input
          type="text"
          placeholder="Nhập tên công việc"
          onChange={handleNewTaskChange}
          value={newTask}
        />
        <button onClick={addTask}>Thêm</button>
      </div>
      <ul>
        {tasks.length > 0 &&
          tasks.map((task) => (
            <li key={task.id} className={task.completed ? 'completed' : ''}>
              <div>
                <input
                  type="checkbox"
                  onClick={() => checkTask(task.id)}
                  defaultChecked={task.completed}
                />
                <p>{task.title}</p>
              </div>

              <div className="button-group">
                <img
                  width="32"
                  height="32"
                  src="https://www.iconarchive.com/download/i80229/custom-icon-design/flatastic-1/edit.ico"
                  onClick={() => {
                    setModalEdit(true);
                    setTaskEdit(task);
                  }}
                />{' '}
                <img
                  width="32"
                  height="32"
                  src="https://cdn-icons-png.flaticon.com/512/3817/3817209.png"
                  onClick={() => {
                    setModalDelete(true);
                    setTaskDelete(task);
                  }}
                />
              </div>
            </li>
          ))}
        <h3 className="summary">
          Công việc đã hoàn thành:{' '}
          {tasks.filter((task) => task.completed).length}/{tasks.length}
        </h3>
        {tasks.length === 0 && (
          <li>
            <img src="https://t4.ftcdn.net/jpg/05/86/21/03/360_F_586210337_WOGOw0l7raEB8F61Muc4hWbvVcyQdk9Z.jpg" />
          </li>
        )}
      </ul>
    </div>
  );
}

export default App;

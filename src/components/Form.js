import React, {useState , useEffect} from 'react';
import {BiListCheck} from 'react-icons/bi';
import List from './List';
import Alert from './Alert';

const getLocalStorage = () => {
    let taskList = localStorage.getItem('taskList');
    if(taskList) {
        return JSON.parse(localStorage.getItem('taskList'))
    }else {
        return []
    }
};

function Form() {
    const [taskInput, setTaskInput] = useState('');
    const [taskList , setTaskList] = useState([]);
    const [editingTask , setEditingTask] = useState(false);
    const [editID , setEditID] = useState(null);
    const [alert , setAlert] = useState({display:false , message:'', type:''});

    const submitForm = (e) => {
        e.preventDefault();
        
        if(!taskInput) {
            //
            showAlert(true, 'Item is required', 'error');
        }else if(taskInput && editingTask) {
            setTaskList(
                taskList.map((item) => {
                    if(item.id == editID) {
                        return {...item, task:taskInput}
                    }
                    return item
                })
            );
            setEditID(null);
            setEditingTask(false);
            showAlert(true, 'Edit success', 'edit');
        }else {
            showAlert(true,`Wow!, It's very cool`, 'success');
            setTaskInput("");

            const newTaskList = {id: new Date().getTime().toString() , task:taskInput};
            setTaskList([...taskList, newTaskList]);
        }
    };

    const showAlert = (display=false , message='', type='') => {
        setAlert({display,message,type});
    };

    const clearAll = () => {
        setTaskList([]);
        showAlert(true,'Clear!','success');
    };

    const removeTask = (id) => {
        setTaskList(taskList.filter((item) => item.id !== id))
    };

    const editTask = (id) => {
        const findTask = taskList.find((item) => item.id == id);
        setTaskInput(findTask.task);
        setEditingTask(true);
        setEditID(id);
    };

    useEffect(() => {
        localStorage.setItem('taskList', JSON.stringify(taskList))
    }, [taskList]);

  return (
    <div className='form-container'>
        <h1 className="title">
            <span>Todo-List</span>
            <span><BiListCheck/></span>
        </h1>
        <form onSubmit={submitForm }>
        <h4 className='all-task'>All task <span>{taskList.length}</span></h4>
            {alert.display && (<Alert {...alert} taskList={taskList} removeAlert={showAlert} />)}
            <input type="text" placeholder='Add a new task' onChange={(e) => setTaskInput(e.target.value)}/>
            <button className={`submit-btn ${editingTask== true && `edit-submit`}`} type='submit'>{editingTask ? 'Edit Task' : 'Add Task'}</button>
        </form>
        {taskList.length >= 1 && (
            <>
            <List tasks={taskList} removeTask={removeTask} editTask={editTask}/>
                <button
                    className="clear-btn"
                    onClick={clearAll}>
                    Clear All
                </button>
            </>
        )}
    </div>
  )
}

export default Form
import React from 'react';
import {BiTrash ,BiEditAlt} from 'react-icons/bi';

function List({tasks , removeTask , editTask}) {
  return (
    <div className='list-container'>
        {tasks.map((item) => {
            const {id , task} = item;
            return (
                <div className="task-list" key={id}>
                    <h4>{task}</h4>
                    <div className="buttons">
                        <button className="edit-btn" onClick={() => editTask(id)}>
                            <BiEditAlt />
                        </button>
                        <button className="remove-btn" onClick={() => removeTask(id)}>
                            <BiTrash />
                        </button>
                    </div>
                </div>
            );
        })}
    </div>
  )
}

export default List;
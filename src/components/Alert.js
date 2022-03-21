import React, {useEffect} from 'react'

function Alert({message , type , taskList , removeAlert}) {
    useEffect(() => {
        const timeOut = setTimeout(() => {
            removeAlert();
        } , 1500)
        return () => clearTimeout(timeOut)
    },[taskList]);

  return (
    <div className={`alert alert-${type}`}>
        <h3>{message}</h3>
    </div>
  )
}

export default Alert;
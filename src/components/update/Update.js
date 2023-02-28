import React, {useState,useEffect} from 'react';

function Update(props) {
    const [data, setData] = useState();
    const [newdata, setNewdata] = useState(data?.task);
    console.log('idddd', data?.id);

    useEffect(
        () => {
                setNewdata(data?.task);
        },[data?.task]
    )
    useEffect (() => {
            if(props.taskID){
                fetch(`http://localhost:3005/todo/${props.taskID}`)
                .then(
                    (ans) => {
                        return ans.json();
                    }
                ).then(
                    (result) => {
                            setData(result);
                    }
                )
            }
    }, [props.taskID])

    function PassID(idValue){
            if(idValue){
                if(newdata){
                    var myHeaders = new Headers();
                        myHeaders.append("Content-Type", "application/json");
        
                        var raw = JSON.stringify({
                        "task": newdata
                        });
        
                        var requestOptions = {
                        method: 'PUT',
                        headers: myHeaders,
                        body: raw,
                        redirect: 'follow'
                        };
        
                        fetch(`http://localhost:3005/todo/${idValue}`, requestOptions)
                        .then(response => response.text())
                        .then(result => {console.log(result)
                            props.APIcall();
                            setNewdata("");
                            props.displayValue();
                        })
                        .catch(error => console.log('error', error));
                    }
                    else{
                        alert('Data is empty');
                    }
                }
    }
        
  return (
    <div className="updateTask">
        <input
            className="inputField"
            type="text"
            placeholder="Enter your task"
            value={newdata}
            onChange={(e) => {setNewdata(e.target.value);}}
        />
        <button className="btn"
            onClick={() => {PassID(data?.id)}}>Submit
        </button>
    </div>
  )
}

export default Update
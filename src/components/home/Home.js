import React, {useState, useEffect} from 'react';
import './Home.css';
import Update from '../update/Update';

function Home(props) {
    const [data,setData] = useState([]);
    const [task, setTask] = useState("");
    const [updateID, setUpdateID] = useState();
    const [disp, setDisp] = useState(false);

    const CallAPI = () => {
       fetch("http://localhost:3005/todo")
      .then((resp) => {
          return resp.json();
      })
      .then((det) => {
          setData(det);
      })
    }
    useEffect(
        () => {
            CallAPI();
        },[]
    )
    function UpdateData(param){
        setUpdateID(param);
        setDisp(true);
    }
    async function DeleteData(param){
        let a = await fetch("http://localhost:3005/todo/" + param, {
            method: "delete",
        });
        let res = await a.json();
        console.log(res);
        CallAPI();
        // .then(
        //     (resp) => {
        //         console.log(resp);
        //         CallAPI();
        //     }
        // )
        // .catch(
        //     (error) => {
        //         console.log(error.message);
        //     }
        // );
        
    }
    console.log("iiiii", updateID);
    // console.log("eeee",task);
    function SubmitData(){
        if(task){
            var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                "task": task
                });

                var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
                };

                fetch("http://localhost:3005/todo", requestOptions)
                .then(response => response.text())
                .then(result => {console.log(result)
                    CallAPI();
                    setTask("");
                })
                .catch(error => console.log('error', error));
        }
        else{
            alert("Enter task");
        }
    }
 
  return (
    <div className='homeMain'>
        {disp?<Update taskID = {updateID && updateID} APIcall = {CallAPI} displayValue = {() => setDisp(false)}/>:""}
        <h2 className='homeTitle'>ToDo List</h2>
        <div className='submitTask'>
            <input
            type="text"
            value={task}
            placeholder="Enter your task"
            onChange={(e) => {
                setTask(e.target.value);
            }}/>
            <button className="btn" onClick={
                SubmitData
            }>Submit</button>
        </div>
        <div className='homeContent'>
            {
                data.map(
                    (element,index) => {
                        return(
                            <div className='homeData' key={index}>
                                <h3 className='homeElement'><span className='homeNumber'>{index+1}</span>) {element.task}</h3>
                                <button className="btn" onClick={() => {UpdateData(element.id)}}>Update</button>
                                <button className="btn" onClick={() => {DeleteData(element.id)}}>Delete</button>
                            </div>
                        )
                    }
                )
            }
        </div>
    </div>
  )
}

export default Home
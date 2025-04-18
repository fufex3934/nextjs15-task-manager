'use client'
import { useState, useEffect } from "react";
import Image from 'next/image'
export default function Home() {
  const [tasks, setTasks] = useState([]); //array to store tasks
  const [newTask, setNewTask] = useState(""); //store new task title as string
  const [newDescription, setNewDescription] = useState("");
  const [filter, setFilter] = useState(false); //store the current selected filter for Filter Section
  const [activeTask, setActiveTask] = useState(null); //store which task is selected but user to perform actions like delete tasks
  const [newTaskMenu, setNewTaskMenu] = useState(false); //Store states of new Task menu

  useEffect(() => {
    fetchTasks();
  }, []);

  //A function to call API in order to fetch Tasks from db and make it visible on the UI
   const fetchTasks = async () => {
    const res = await fetch("/pages/api/tasks"); //We us this method to call Api with desired routes, and store api response
    const data = await res.json();
    setTasks(data);
  };

  //A function to call API in order to add new Task to DB
  const addTask = async () => {
    if (!newTask) return;
    await fetch("/pages/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTask, description: newDescription }),
    });
    setNewTask('');//clear newTask
    setNewDescription('');//clear newDescription
    fetchTasks();//call fetchTasks function
  };
  

  //A function to call Api in order to change the states of Task,like done, in progress and etc.
  const toggleTask = async(id,status)=>{
    await fetch(`/pages/api/tasks?id=${id}`,{
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({status:status})
    });
    fetchTasks();
  };

  // A function to call Api in order to delete a task with desired task id

  const deleteTask = async()=>{
    await fetch(`/pages/api/tasks?id=${id}`,{method:'DELETE'});
    fetchTasks();
  };

  // A function to filtering  the tasks in the UI
  const filteredTasks = tasks.filter((task)=>{
    if(filter === 'all')return true;
    return task.status === filter;
  });

  // and the UI part
  return(
    <div className="bg-slate-50">
        {/* Header Section to show profile picture and add-new task button */}
        <div className="grid grid-flow-col justify-between px-3 mb-4 pt-3">
            <div className="text-black">

               <Image
               src={'/favicon.png'}
               width={60}
               height={30}
               className="rounded-full"
               alt="logo"
               />
            </div>
            <button className="text-white bg-black px-6 py-3 rounded-full text-2xl"
            onClick={()=>setNewTaskMenu(true)}
            >+</button>

        </div>

      {/* Section add New Task */}

    </div>
  )
}

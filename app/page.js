'use client'

import Board from "@/components/Board"
import { useState } from "react"

export default function Home() {

  const [columns, setColumns] = useState([])
  const [tasks, setTasks] = useState([])

  

  function addNewColumn() {
    const column = {id: Math.floor(Math.random() * 100000), title: "New Column"}
    setColumns((prev) => [...prev, column])
  }

  function addNewTask(columnId) {
    const task = {id: tasks.length, columnId: columnId, title: "New Task"}
    setTasks((prev) => [...prev, task])
  }

  function deleteColumn(columnId) {
    setColumns((prev) => prev.filter((column) => column.id != columnId))
    setTasks((prev) => prev.filter((task) => task.columnId != columnId))
  }

  function updateColumnTitle(columnId, title) {
    
    setColumns((prev) => prev.map(column => {
      if(column.id === columnId) {
        return {...column, title: title}
      }
      return column
    }))
  }


  return (
    <main className="flex min-h-screen items-center justify-center bg-black1">
      <Board columns={columns} addNewColumn={addNewColumn} tasks={tasks} addNewTask={addNewTask} updateColumnTitle={updateColumnTitle} deleteColumn={deleteColumn}/>
    </main>
  )
}

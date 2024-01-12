"use client";

import React, { useMemo } from "react";
import Column from "./Column";

import { SortableContext } from "@dnd-kit/sortable";
import { useState } from "react";
import DndWrapper from "./DndWrapper";
import ModalWindow from "./ModalWindow";

const Board = () => {
  const [columns, setColumns] = useState([]);
  const [tasks, setTasks] = useState([]);

  function addNewColumn() {
    const column = {
      id: Math.floor(Math.random() * 100000),
      title: "New Column",
    };
    setColumns((prev) => [...prev, column]);
  }

  function addNewTask(columnId) {
    const task = {
      id: tasks.length + 1,
      columnId: columnId,
      title: "New Task",
    };
    setTasks((prev) => [...prev, task]);
  }

  function deleteColumn(columnId) {
    setColumns((prev) => prev.filter((column) => column.id != columnId));
    setTasks((prev) => prev.filter((task) => task.columnId != columnId));
  }

  function updateColumnTitle(columnId, title) {
    setColumns((prev) =>
      prev.map((column) => {
        if (column.id === columnId) {
          return { ...column, title: title };
        }
        return column;
      })
    );
  }

  const columnsId = useMemo(
    () => columns.map((column) => column.id),
    [columns]
  );

  return (
    <>
      <section className="w-[95%] md:w-[80%]">
        <button
          className="grey-button max-w-[160px] mb-5 mx-auto"
          onClick={addNewColumn}
        >
          Add new column
        </button>

        <DndWrapper
          columns={columns}
          tasks={tasks}
          setColumns={setColumns}
          setTasks={setTasks}
        >
          <div className="flex gap-5 overflow-scroll snap-x scroll-smooth pb-5">
            <SortableContext items={columnsId}>
              {columns?.map((column) => (
                <Column
                  key={column?.id}
                  column={column}
                  tasks={tasks}
                  updateColumnTitle={updateColumnTitle}
                  addNewTask={addNewTask}
                  deleteColumn={deleteColumn}
                />
              ))}
            </SortableContext>
          </div>
        </DndWrapper>
      </section>
      {/* <ModalWindow /> */}
    </>
  );
};

export default Board;

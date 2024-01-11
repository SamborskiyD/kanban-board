"use client";

import React, { useMemo } from "react";
import Column from "./Column";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import { useState } from "react";
import { createPortal } from "react-dom";

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
    const task = { id: tasks.length, columnId: columnId, title: "New Task" };
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

  const [draggedColumn, setDraggedColumn] = useState({});

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  function onDragStart(event) {
    if (event.active.data.current?.type === "Column") {
      setDraggedColumn(event.active.data.current?.column);
    }
  }

  function onDragEnd(event) {
    const { active, over} = event

    if(!over) return

    const activeColumnIndex = columns.findIndex((column) => column.id === active.id)
    const overColumnIndex = columns.findIndex((column) => column.id === over.id)

    if (activeColumnIndex === overColumnIndex) return

    setColumns((prev) => {
      return arrayMove(prev, activeColumnIndex, overColumnIndex)
    })

  }

  return (
    <section className="w-[80%]">
      <button
        className="grey-button max-w-[160px] mb-5 mx-auto"
        onClick={addNewColumn}
      >
        Add new column
      </button>

      <DndContext
        sensors={sensors}
        modifiers={[restrictToHorizontalAxis]}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <div className="flex gap-5 overflow-scroll pb-5">
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

        {createPortal(
          <DragOverlay>
            {draggedColumn && (
              <Column
                column={draggedColumn}
                tasks={tasks}
                deleteColumn={deleteColumn}
              />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </section>
  );
};

export default Board;

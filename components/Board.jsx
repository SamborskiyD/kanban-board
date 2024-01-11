import React, { useMemo } from "react";
import Column from "./Column";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import { useState } from "react";
import { createPortal } from "react-dom";

const Board = ({
  columns,
  addNewColumn,
  tasks,
  addNewTask,
  deleteColumn,
  updateColumnTitle,
}) => {
  
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

  function onDragEnd() {}

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
      >
        <div className="flex gap-5 overflow-scroll no-scrollbar">
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
              <Column column={draggedColumn} tasks={tasks} deleteColumn={deleteColumn} />
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </section>
  );
};

export default Board;

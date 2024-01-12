import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import Card from "./Card";
import Column from "./Column";

import { useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";

const DndWrapper = ({columns, tasks, setColumns, setTasks, children }) => {

  const [draggedColumn, setDraggedColumn] = useState(null);
  const [draggedTask, setDraggedTask] = useState(null);

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
      return;
    } else if (event.active.data.current?.type === "Task") {
      setDraggedTask(event.active.data.current?.task);
      return;
    }
  }

  function onDragEnd(event) {
    setDraggedColumn(null);
    setDraggedTask(null);

    const { active, over } = event;

    if (!over) return;
    if (active.data.current?.type !== "Column") return;

    const activeColumnIndex = columns.findIndex(
      (column) => column.id === active.id
    );
    const overColumnIndex = columns.findIndex(
      (column) => column.id === over.id
    );

    if (activeColumnIndex === overColumnIndex) return;

    setColumns((prev) => {
      return arrayMove(prev, activeColumnIndex, overColumnIndex);
    });
  }

  function onDragOver(event) {
    const { active, over } = event;

    if (!over) return;

    const isActiveElemATask = active.data.current?.type === "Task";
    const isOverElemATask = over.data.current?.type === "Task";
    const isOverElemAColumn = over.data.current?.type === "Column";

    if (!isActiveElemATask) return;

    const activeElemIndex = tasks.findIndex((task) => task.id === active.id);
    const overElemIndex = tasks.findIndex((task) => task.id === over.id);

    if (isActiveElemATask && isOverElemATask) {
      setTasks((prev) => {
        prev[activeElemIndex].columnId = prev[overElemIndex].columnId;
        return arrayMove(prev, activeElemIndex, overElemIndex);
      });
    } else if (isActiveElemATask && isOverElemAColumn) {
      setTasks((prev) => {
        prev[activeElemIndex].columnId = over.id;
        return arrayMove(prev, activeElemIndex, activeElemIndex);
      });
    }
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      {children}

      <DragOverlay>
        {draggedColumn && <Column column={draggedColumn} tasks={[]} />}
        {draggedTask && <Card task={draggedTask} />}
      </DragOverlay>
    </DndContext>
  );
};

export default DndWrapper;

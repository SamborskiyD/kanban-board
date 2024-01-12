import React from "react";
import Card from "./Card";
import { useState, useMemo } from "react";
import { TrashIcon, EditIcon, SaveIcon } from "./icons";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Column = ({
  column,
  tasks,
  addNewTask,
  deleteColumn,
  updateColumnTitle,
}) => {
  const [editMode, setEditMode] = useState(false);

  const tasksId = useMemo(() => tasks.map((task) => task.id), [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const columnDragStyle = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={columnDragStyle}
        className="w-full min-w-[300px] max-w-[600px] min-h-[70vh] max-h-[90vh] bg-black2 p-4 opacity-50 rounded-lg border-2 border-violet"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={columnDragStyle}
      className="w-full min-w-[300px] max-w-[600px] min-h-[70vh] max-h-[70vh] snap-center flex flex-col justify-between bg-black2 p-4 rounded-lg"
    >
      <div
        {...attributes}
        {...listeners}
        className=" mb-4 flex justify-between items-center gap-10 cursor-grab"
      >
        {editMode ? (
          <input
            type="text"
            name="title"
            onChange={(e) => updateColumnTitle(column.id, e.target.value)}
            autoFocus
            value={column.title}
            id="title"
            className="w-full bg-black1 outline-none border-2 border-borderGrey py-2 px-4 rounded-lg text-sm font-semibold text-white"
          />
        ) : (
          <h2 className=" text-white font-semibold">{column.title}</h2>
        )}

        <div className=" flex items-center gap-4">
          {editMode ? (
            <SaveIcon onClickHandler={() => setEditMode((prev) => !prev)} />
          ) : (
            <EditIcon onClickHandler={() => setEditMode((prev) => !prev)} />
          )}
          <TrashIcon onClickHandler={() => deleteColumn(column.id)} />
        </div>
      </div>

      <SortableContext items={tasksId}>
        <div className="flex flex-col h-full gap-3 overflow-y-scroll pr-2">
          {tasks
            ?.filter((task) => task.columnId == column.id)
            .map((task, index) => (
              <Card key={index} task={task} />
            ))}
        </div>
      </SortableContext>

      <button className="violet-button" onClick={() => addNewTask(column.id)}>
        Add new task
      </button>
    </div>
  );
};

export default Column;

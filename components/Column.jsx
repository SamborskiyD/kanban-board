import React from "react";
import Card from "./Card";
import { useState } from "react";
import { TrashIcon, EditIcon, SaveIcon } from "./icons";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Column = ({
  column,
  tasks,
  addNewTask,
  deleteColumn,
  updateColumnTitle,
}) => {
  
  const [editMode, setEditMode] = useState(false);

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
      {...attributes}
      {...listeners}
      className="w-full min-w-[300px] max-w-[600px] min-h-[70vh] max-h-[80vh] flex flex-col justify-between bg-black2 p-4 rounded-lg"
    >
      <div className=" mb-4 flex justify-between items-center gap-10">
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

      <div className="flex flex-col h-full gap-3 no-scrollbar overflow-scroll">
        {tasks
          ?.filter((task) => task.columnId == column.id)
          .map((task, index) => (
            <Card key={index} {...task} />
          ))}
      </div>

      <button className="violet-button" onClick={() => addNewTask(column.id)}>
        Add new task
      </button>
    </div>
  );
};

export default Column;

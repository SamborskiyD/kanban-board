import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const Card = ({ task }) => {

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
  });

  const taskDragStyle = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={taskDragStyle}
        className="min-h-16 bg-black1 rounded-lg border-2 opacity-50 border-violet"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={taskDragStyle}
      {...attributes}
      {...listeners}
      id={task.id}
      className="px-4 py-5 min-h-16 bg-black1 rounded-lg flex items-center gap-4 cursor-pointer transition-all duration-200 hover:shadow-[4px_8px_20px_0px_rgba(0,0,0,0.2)]"
    >
      <div className="flex items-center gap-4 w-full text-grey1">
        <p className="text-sm text-violet">#{task.id}</p>
        <p className="">{task.title}</p>
      </div>
    </div>
  );
};

export default Card;

import { format }                         from "date-fns";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { FaClock }                        from "react-icons/fa";
import { FC, useState }                   from "react";

import { Event }                          from "../stores/event.store";

import { DeleteEvent }                    from "./delete-event.component";
import { EventEditModal }                 from "./edit-event.component";

export type EventComponentProps = {
  event: Event;
};

export const EventComponent: FC<EventComponentProps> = ({ event }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);

  const clickEdit = (e: any) => {
    e.preventDefault();
    setEdit(true);
  };

  const clickDelete = (e: any) => {
    e.preventDefault();
    setDeleteOpen(true);
  };

  return (
    <>
      <EventEditModal initialData={event} isOpen={edit} onClose={() => setEdit(false)}/>
      <DeleteEvent isOpen={deleteOpen} id={event.id} onClose={() => setDeleteOpen(false)}/>
      <div
        key={event.id}
        className="bg-white h-fit flex p-4 rounded-lg shadow-sm justify-between items-start"
      >

        <div className="flex gap-4">
          <div className="w-20 h-20 bg-blue-100 flex items-center justify-center rounded text-2xl font-bold text-blue-600">
            {new Date(event.eventDate).getDate()}
          </div>
          <div className="space-y-1">
            <h4 className="text-lg font-semibold text-gray-800">
              {event.name}
            </h4>
            <span className="text-xs text-green-600 font-semibold">
              {event.importance}
            </span>
            <p className="text-sm text-gray-600">{event.description}</p>
            <div className="flex gap-2 mt-2 flex-wrap">
              <span className="flex items-center gap-1 text-sm bg-gray-100 px-2 py-1 rounded-full">
                <FaClock className="text-xs" />
                {format(new Date(event.eventDate), "HH:mm")}
              </span>
            </div>
          </div>
        </div>
        <div className="flex h-full my-auto items-center justify-center gap-3">
          <button className="text-red-500 hover:text-red-700" onClick={clickDelete} >
            <AiOutlineDelete size={20} />
          </button>
          <button className="text-blue-500 hover:text-blue-700" onClick={clickEdit}>
            <AiOutlineEdit size={20} />
          </button>
        </div>
      </div>
    </>
  );
};

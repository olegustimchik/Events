import { AiOutlineDelete } from "react-icons/ai";
import { RxCross1 }        from "react-icons/rx";
import { FC }              from "react";

import { useAuthStore }    from "../stores/auth.store";
import { useEventStore }   from "../stores/event.store";

export type DeleteEventProps = {
  isOpen : boolean;
  id     : string;
  onClose: () => void;
};

export const DeleteEvent: FC<DeleteEventProps> = ({ id, isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  const removeEvent = useEventStore(state => state.removeEvent);
  const token = useAuthStore(state => state.accessToken);
  const handleDelete = (id: string) => {
    if (!token) {
      return;
    }
    removeEvent(id, token);
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center px-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl font-bold"
        >
          ×
        </button>

        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-start">Are you sure you want to delete this event?</h2>
        <div className="flex flex-row-reverse w-full gap-2 revers">
          <button
            onClick={() => handleDelete(id)}
            className="text-red-500 hover:text-red-700 delete-button flex justify-center items-center p-2 border rounded-lg border-red-100 hover:border-red-500 hover:bg-red-50"
          >
            <AiOutlineDelete size={20} />
          </button>
          <button
            onClick={() => onClose()}
            className="text-blue-500 hover:text-blue-700 flex justify-center items-center p-2 border rounded-lg border-blue-100 hover:border-blue-500 hover:bg-blue-50"
          >
            <RxCross1 size={20} />
          </button>

        </div>
      </div>
    </div>
  );
};

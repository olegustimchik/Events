import React, { useState, FC }   from "react";

import { SelectionInput }        from "../UI/inputs/selection.input";
import { TextAreaInput }         from "../UI/inputs/text-area.input";
import { TextInput }             from "../UI/inputs/text.input";
import { importanceOptions }     from "../constants";
import { useAuthStore }          from "../stores/auth.store";
import {  useEventStore, Event } from "../stores/event.store";

export type EditEventProps = {
  isOpen     : boolean;
  onClose    : () => void;
  initialData: Event;
};

export const  EventEditModal: FC<EditEventProps> = ({ initialData, isOpen, onClose }) => {
  const updateEvent = useEventStore(state => state.update);
  const token = useAuthStore(state => state.accessToken);
  const [importance, setImportance] = useState<string>(initialData.importance);
  const [desc, setDesc] = useState<string>(initialData.description);
  const [name, setName] = useState<string>(initialData.name);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      return;
    }
    updateEvent(initialData.id, {
      name, description: desc, eventDate: initialData.eventDate, importance,
    }, token);
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-center items-center px-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl font-bold"
        >
          ×
        </button>

        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Edit Event</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <TextInput id="name" placeholder="Name" value={name} setValue={setName} valid={true}/>
          <TextAreaInput id="desc" placeholder="Description" value={desc} setValue={setDesc} valid={true}/>
          <SelectionInput id="event-importance" label="Importance" options={importanceOptions} value={importance} setValue={setImportance}/>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded px-4 py-2"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

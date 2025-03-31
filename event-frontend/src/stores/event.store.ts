import { create }         from "zustand";

import { baseUrl }        from "../constants";
import { toSearchParams } from "../utils/utils";

import { useErrorStore }  from "./error.store";

export type Event = {
  id         : string;
  name       : string;
  description: string;
  importance : string;
  createdAt  : string;
  eventDate  : string;
};

export type AddEvent = {
  name       : string;
  description: string;
  importance : string;
  eventDate  : string;
};

export type EventUpdate = {
  name       : string;
  description: string;
  importance : string;
  eventDate  : string;
};

export type GetEventsFilter = {
  name      : string | undefined;
  from      : string | undefined;
  to        : string | undefined;
  importance: string | undefined;
};

type EventState = {
  events     : Array<Event>;
  total      : number;
  fetchEvents: (take: number, skip: number, filter: GetEventsFilter, token: string) => Promise<void>;
  addEvent   : (event: AddEvent, token: string) => void;
  removeEvent: (id: string, token: string) => void;
  update     : (id: string, newEvent: EventUpdate, token: string) => void;
};

export const useEventStore = create<EventState>((set, get) => ({
  events     : [],
  total      : 0,
  fetchEvents: async (take: number, skip: number, filter: GetEventsFilter, token: string) => {
    const setError = useErrorStore.getState().setError;
    const clearError = useErrorStore.getState().clearError;
    try {
      clearError();
      const filterString = toSearchParams(filter);
      const res = await fetch(`${baseUrl}/event/list?take=${take}&skip=${skip}&${filterString}`, {
        method : "GET",
        headers: { Authorization: `Bearer ${token}` },

      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Can't fetch data");
      }
      set({ events: data.data, total: data.total });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  },

  addEvent: async (event: AddEvent, token: string)  => {
    const setError = useErrorStore.getState().setError;
    const clearError = useErrorStore.getState().clearError;
    try {
      clearError();
      const res = await fetch(`${baseUrl}/event/`, {
        method : "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body   : JSON.stringify(event),

      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Can't fetch data");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  },

  removeEvent: async (id: string, token: string) => {
    const setError = useErrorStore.getState().setError;
    const clearError = useErrorStore.getState().clearError;
    try {
      clearError();
      const res = await fetch(`${baseUrl}/event/${id}`, {
        method : "DELETE",
        headers: { Authorization: `Bearer ${token}` },

      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Can't fetch data");
      }
      const oldTotal = get().total;
      set(state => ({ events: state.events.filter(event => event.id !== data.id), total: oldTotal - 1 }));
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  },
  update: async (id: string, newEvent: EventUpdate, token: string) => {
    const setError = useErrorStore.getState().setError;
    const clearError = useErrorStore.getState().clearError;
    try {
      clearError();
      const res = await fetch(`${baseUrl}/event/${id}`, {
        method : "PUT",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body   : JSON.stringify(newEvent),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Can't fetch data");
      }
      set(state => ({ events: state.events.filter(event => event.id !== data.id) }));
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  },
}));

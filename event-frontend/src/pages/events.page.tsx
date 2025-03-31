import { formatISO }               from "date-fns";
import Calendar                    from "react-calendar";
import { useEffect, useState, FC } from "react";

import { SearchInput }             from "../UI/inputs/search.input";
import { SelectionInput }          from "../UI/inputs/selection.input";
import { AddEventModal }           from "../components/add-event.component";
import { EventComponent }          from "../components/event.component";
import { importanceOptions }       from "../constants";
import { useAuthStore }            from "../stores/auth.store";
import { useEventStore }           from "../stores/event.store";

import "./styles/calendar.css";

export const EventList: FC = () => {
  const take = 5;
  const token = useAuthStore(state => state.accessToken);
  const fetchEvents = useEventStore(state => state.fetchEvents);
  const events = useEventStore(state => state.events);
  const total = useEventStore(state => state.total);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [search, setSearch] = useState<string>("");
  const [importance, setImportance] = useState<string>("ALL");
  const [page, setPage] = useState(1);
  const [skip, setSkip] = useState(0);
  const maxPage = Math.ceil(total / take);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!token) return;

    const from = new Date(selectedDate);
    from.setHours(0, 0, 0, 0);
    const to = new Date(selectedDate);
    to.setHours(23, 59, 59, 0);
    fetchEvents(take, skip, {
      name      : search ? search : undefined,
      from      : formatISO(from),
      to        : formatISO(to),
      importance: importance === "ALL" ? undefined : importance,
    }, token);
  }, [selectedDate, page, token, importance, search]);

  const onAddClick = (e: any) => {
    setOpen(true);
  };

  const nextPage = () => {
    if (page < maxPage) {
      setPage(page + 1);
      setSkip(page * take);
    }
  };

  const previousPage = () => {
    if (page > 1) {
      setPage(page - 1);
      setSkip((page - 2) * take);
    }
  };

  return (
    <>
      <AddEventModal  initialData={{
        name: "", description: "", eventDate: formatISO(selectedDate), importance: "",
      }} isOpen={open} onClose={() => {
        setOpen(false);
      }}/>
      <div className="max-w-5xl mx-auto px-4 py-6 bg-white rounded-3xl">
        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Your Events
        </h2>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-start gap-6 mb-8">
          <div className="flex flex-col gap-4 ">
            <SelectionInput label="Importance"options={[{ name: "All types", value: "ALL" }, ...importanceOptions]} id="importance" value={importance} setValue={setImportance}/>
            <SearchInput id="search" placeholder="Search" value={search} setValue={setSearch} />
          </div>
          <div className="bg-white w-2/3">
            <Calendar
              onChange={date => {
                if (date instanceof Date) {
                  setSelectedDate(date);
                }
                setPage(1); // reset page when date changes
              }}
              value={selectedDate}
              minDetail="month"
              maxDetail="month"
              className="!border-none h-full rounded-2xl shadow bg-white p-4 calendar-custom"
            />
          </div>
        </div>

        {/* Events */}
        <button type="submit" className="h-12 w-80 bg-blue-700 text-white py-2 hover:border-1 rounded-full hover:border-blue-400 hover:text-gray-700 hover:bg-white" onClick={onAddClick}>
          { "Add new event"}
        </button>
        {events.length === 0 ? (
          <p className="text-gray-500 text-center">No events for this date.</p>
        ) : (
          <div className="space-y-4 mb-6">
            {events.map(event =>  <EventComponent key={event.id} event={event}/>)}
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => previousPage()}
            disabled={page === 1}
            className="text-blue-600 hover:underline disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            &laquo; Previous
          </button>
          <span className="text-sm text-gray-600">
            Page
            {page}
          </span>
          <button
            onClick={() => {
              if (events.length === take) {
                nextPage();
              }
            }}
            disabled={events.length < take}
            className="text-blue-600 hover:underline disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            Next &raquo;
          </button>
        </div>
      </div>
    </>
  );
};

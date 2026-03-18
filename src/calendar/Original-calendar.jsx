import React, {useEffect, useState} from 'react';
import {DayPilot, DayPilotCalendar, DayPilotNavigator} from "@daypilot/daypilot-lite-react";
import "./Calendar.css";

const styles = {
  wrap: {
    display: "flex"
  },
  left: {
    marginRight: "10px"
  },
  main: {
    flexGrow: "1"
  }
};

const Calendar = () => {
  const [calendar, setCalendar] = useState(null);
  const [events, setEvents] = useState([]);
  const [startDate, setStartDate] = useState("2026-07-05");
  const [form, setForm] = useState({start: "", end: "", text: ""});

  const config = {
    viewType: "Week",
    durationBarVisible: false,
    timeRangeSelectedHandling: "Enabled",
    headerDateFormat: "dd/MM",
    durationBarVisible: false,
    onTimeRangeSelected: async args => {
      const modal = await DayPilot.Modal.prompt("Create a new event:", "Event 1");
      calendar.clearSelection();
      if (!modal.result) { return; }
      calendar.events.add({
        start: args.start,
        end: args.end,
        id: DayPilot.guid(),
        text: modal.result
      });
    },
    onEventClick: async args => {
      await editEvent(args.e);
    },
    contextMenu: new DayPilot.Menu({
      items: [
        {
          text: "Delete",
          onClick: async args => {
            calendar.events.remove(args.source);
          },
        },
        {
          text: "-"
        },
        {
          text: "Edit...",
          onClick: async args => {
            await editEvent(args.source);
          }
        }
      ]
    }),
    onBeforeEventRender: args => {
      args.data.areas = [
        {
          top: 3,
          right: 3,
          width: 20,
          height: 20,
          symbol: "icons/daypilot.svg#minichevron-down-2",
          fontColor: "#fff",
          toolTip: "Show context menu",
          action: "ContextMenu",
        },
        {
          top: 3,
          right: 25,
          width: 20,
          height: 20,
          symbol: "icons/daypilot.svg#x-circle",
          fontColor: "#fff",
          action: "None",
          toolTip: "Delete event",
          onClick: async args => {
            calendar.events.remove(args.source);
          }
        }
      ];

      onEventMoved: async args => { await fetch("/api/events/move", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: parseInt(args.e.id(), 10),
        start: args.newStart,
        end: args.newEnd
      })
      });
      }


      const participants = args.data.participants;
      if (participants > 0) {
        // show one icon for each participant
        for (let i = 0; i < participants; i++) {
          args.data.areas.push({
            bottom: 5,
            right: 5 + i * 30,
            width: 24,
            height: 24,
            action: "None",
            image: `/avatars/avatar${i+1}.png`,
            style: "border-radius: 50%; border: 2px solid #fff; overflow: hidden;",
            onClick: async args => {
              const form = [
                {name: `Participant ${i+1}`},
                {image: `/avatars/avatar${i+1}.png`}
              ];
              await DayPilot.Modal.form(form);
            }
          });
        }
      }
    }
  };

  const editEvent = async (e) => {
    const modal = await DayPilot.Modal.prompt("Update event text:", e.text());
    if (!modal.result) { return; }
    e.data.text = modal.result;
    calendar.events.update(e);
  };

  useEffect(() => {
  if (!calendar) return;

  const fetchEvents = async () => {
    const start = startDate + "T00:00:00"; // adjust to your calendar range
    const end = DayPilot.Date.addDays(startDate, 7).toString("yyyy-MM-ddTHH:mm:ss");

    const response = await fetch(`/api/events?start=${start}&end=${end}`);
    const data = await response.json();

    // DayPilot expects `id` as string
    const formattedEvents = data.map(e => ({
      id: e.id.toString(),
      text: e.text,
      start: e.start,
      end: e.end,
      backColor: e.color || undefined
    }));

    setEvents(formattedEvents);
  };

  fetchEvents();
}, [calendar, startDate]);

  const handleCreate = async () => {
    const payload = {
    text: form.text,
    start: form.start,
    end: form.end
  };

  const response = await fetch("/api/events/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const newEvent = await response.json();

  setEvents(prev => [
    ...prev,
    {
      id: newEvent.id.toString(),
      text: newEvent.text,
      start: newEvent.start,
      end: newEvent.end
    }
  ]);

  setForm({ start: "", end: "", text: "" }); // reset form
};

// BEFORE JOINING BACK&FRONT :
//   const newEvent = {
//     id: DayPilot.guid(),
//     text: form.text,
//     start: form.start,
//     end: form.end
//   };

//   setEvents(prev => [...prev, newEvent]);
// };

  return (
    <div className="calendar-layout">
      <section className='left-column'>
      <div className="navigator-container">
        <DayPilotNavigator
          selectMode={"Week"}
          showMonths={1}
          skipMonths={2}
          selectionDay={startDate}
          onTimeRangeSelected={ args => {
            setStartDate(args.day);
          }}
        />
      </div>
      <div className="event-form">
        <h3>Book slot</h3>

        <div className="form-group">
          <label>Start</label>
          <input
            type="datetime-local"
            value={form.start}
            onChange={(e) => setForm({...form, start: e.target.value})}
          />
        </div>
        <div className="form-group">
          <label>End</label>
          <input
            type="datetime-local"
            value={form.end}
            onChange={(e) => setForm({...form, end: e.target.value})}
          />
        </div>
        <div className="form-group">
          <label>Message</label>
          <input
            type="text"
            placeholder="addtional info"
            value={form.text}
            onChange={(e) => setForm({...form, text: e.target.value})}
          />
        </div>

        <button onClick={handleCreate}>Create</button>
      </div>
      </section>
      <div className="calendar-main">
        <DayPilotCalendar
          {...config}
          events={events}
          startDate={startDate}
          controlRef={setCalendar}
        />
      </div>
    </div>
  );
}

export default Calendar;

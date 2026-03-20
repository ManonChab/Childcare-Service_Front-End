import React, { useEffect, useState } from "react";
import {DayPilot, DayPilotCalendar, DayPilotNavigator,} from "@daypilot/daypilot-lite-react";
import "./Calendar.css";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "../Context/Theme/ThemeContext"; // adjust path
import { CreateSlot } from "../Components/Atoms/CreateSlot/CreateSlot";
import { Button, Dialog, DialogTitle, DialogContent } from "@mui/material";

const Calendar = () => {
    const [calendar, setCalendar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [slots, setSlots] = useState([]);
    const [startDate, setStartDate] = useState("2026-07-05");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [form, setForm] = useState({ start: "", end: "", text: "" });

  // --- Fetch slots from backend ---
    const fetchSlots = async () => {
    if (!calendar) return;

    const start = new DayPilot.Date(startDate);
    const end = start.addDays(7);

    const startStr = start.toString("yyyy-MM-ddTHH:mm:ss");
    const endStr = end.toString("yyyy-MM-ddTHH:mm:ss");

    const response = await fetch(`/api/events?start=${startStr}&end=${endStr}`);
    if (!response.ok) {
    const text = await response.text();
    throw new Error(text);
        console.log(text);
    }

    const data = await response.json();


    const formatted = data.map((s) => ({
        id: s.id.toString(),
        text: s.text,
        start: s.start,
        end: s.end,
        backColor: s.color || undefined,
    }));

    setSlots(formatted);
};

    useEffect(() => {
    fetchSlots();
    }, [calendar, startDate]);

  // --- Create new slot ---
    const handleCreate = async (formData) => {
        setLoading(true);
        setError(null);

    try {
        const response = await fetch("/api/events/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
        });

        if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
        }

    const newSlot = await response.json();

    setSlots(prev => [...prev, {
        id: newSlot.id.toString(),
        text: newSlot.text,
        start: newSlot.start,
        end: newSlot.end
    }]);
    setForm({ start: "", end: "", text: "" }); // reset form
    } catch (err) {
    setError(err.message); // 🔥 no more alert
    } finally {
        setLoading(false);
    }
};


  // --- Update slot ---
    const editSlot = async (e) => {
    const modal = await DayPilot.Modal.prompt("Update slot text:", e.text());
    if (!modal.result) return;

    const payload = {
    id: parseInt(e.id(), 10),
    text: modal.result,
    start: e.start().toString(),
    end: e.end().toString()
    };

    await fetch("/api/events/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
    });

    e.data.text = modal.result;
    calendar.events.update(e);
};

  // --- Delete slot ---
    const deleteSlot = async (e) => {
    await fetch(`/api/events/${e.id()}`, {
        method: "DELETE"
    });

    calendar.events.remove(e);
};

  // --- Calendar configuration ---
    const config = {
    viewType: "Week",
    durationBarVisible: false,
    headerDateFormat: "dd/MM",
    onTimeRangeSelected: async (args) => {
        const modal = await DayPilot.Modal.prompt(
        "Create a new slot:",
        "New Slot",
        );
        calendar.clearSelection();
        if (!modal.result) return;

        const payload = {
            text: modal.result,
            start: args.start.toString(),
            end: args.end.toString(),
        };

        const response = await fetch("/api/events/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        });

        const newSlot = await response.json();
        calendar.events.add({
        id: newSlot.id.toString(),
        start: newSlot.start,
        end: newSlot.end,
        text: newSlot.text,
        });
    },
    onEventClick: async (args) => editSlot(args.e),
    onEventMoved: async (args) => {
        await fetch("/api/events/move", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id: parseInt(args.e.id(), 10),
            start: args.newStart.toString(),
            end: args.newEnd.toString(),
        }),
        });
    },
    contextMenu: new DayPilot.Menu({
        items: [
        { text: "Delete", onClick: async (args) => deleteSlot(args.source) },
        { text: "-", disabled: true },
        { text: "Edit...", onClick: async (args) => editSlot(args.source) },
        ],
    })
}

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
        <div className="calendar-layout">
            
                <div className="navigator-container">
                    <DayPilotNavigator
                        selectMode="Week"
                        showMonths={1}
                        skipMonths={2}
                        selectionDay={startDate}
                        onTimeRangeSelected={(args) => setStartDate(args.day)}
                    />
                </div>

                <Button  className="slot-button"
                variant="contained"
                color="primary"
                sx={{ m: 2 }}
                onClick={() => {
                    setSelectedDate(null); // no specific date yet
                    setIsModalOpen(true);
                }}
                >
                    Create New Slot
                </Button>
                <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)} disableEnforceFocus={false}
                    >
                    <CreateSlot 
                        onCreate={(data) => {
                            handleCreate(data);
                            setIsModalOpen(false);
                        }}
                        loading={loading}
                        error={error}
                        initialDate={selectedDate} // optional, pre-fill date
                    />
                </Dialog>

                <div className="calendar-main">
                    <DayPilotCalendar
                    {...config}
                    events={slots}
                    startDate={startDate}
                    controlRef={setCalendar}
                    onTimeRangeSelected={(args) => {
                    setSelectedDate(args.start); // pass clicked date
                    setIsModalOpen(true);        // open modal
                    // optionally, prevent default behavior
                    args.preventDefault();}}
                    />
                </div>
            </div>
        </ThemeProvider>
    );
};

export default Calendar;

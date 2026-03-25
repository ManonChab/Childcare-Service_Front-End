import React, { useEffect, useState } from "react";
import {DayPilot, DayPilotCalendar, DayPilotNavigator,} from "@daypilot/daypilot-lite-react";
import "./Calendar.css";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "../Context/Theme/ThemeContext"; // adjust path
import { CreateSlot } from "../Components/Atoms/CreateSlot/CreateSlot";
import { Button, Dialog, DialogTitle, DialogContent } from "@mui/material";
import Logo from "../Components/Atoms/Logo/Logo";
import { createSlot } from "../calendar/api/slots";

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

    const response = await fetch(`/api/v1/events?start=${startStr}&end=${endStr}`);
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
    backColor:
        s.status === "REQUESTED" ? "#cccccc" :
        s.status === "CONFIRMED" ? "#4caf50" :
        s.status === "REJECTED" ? "#f44336" :
        undefined
    }));

    setSlots(formatted);
};

    useEffect(() => {
    fetchSlots();
    }, [calendar, startDate]);

    const formatDate = (dateStr) => {
    const d = new Date(dateStr);

    if (isNaN(d)) {
        console.error("INVALID DATE", dateStr);
        return null;
    }

    return d.toISOString().slice(0, 19);
};

  // --- Create new slot ---
    const handleCreate = async (formData) => {
        console.log("HANDLE CREATE CALLED", formData);
    setLoading(true);
    setError(null);

    try {
        const payload = {
            text: formData.text,
            start: formatDate(formData.start),
            end: formatDate(formData.end),
            userId: 1
        };
        console.log("PAYLOAD", payload);

        console.log("BEFORE FETCH");

        const newEvent = await createSlot(payload);

        console.log("AFTER FETCH", newEvent);

        setSlots(prev => [
            ...prev,
            {
                id: newEvent.id.toString(),
                text: newEvent.text,
                start: newEvent.start,
                end: newEvent.end
            }
        ]);

    if (!formData.start || !formData.end || !formData.text) {
    console.log("FORM INVALID", formData);
    return;
}

    } catch (err) {
        console.error("CREATE ERROR", err);
        setError(err.message);
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

    await fetch("/api/v1/events/update", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
    });

    e.data.text = modal.result;
    calendar.events.update(e);
};

  // --- Delete slot ---
    const deleteSlot = async (e) => {
    await fetch(`/api/v1/events/${e.id()}`, {
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

        const response = await fetch("/api/v1/events", {
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
        await fetch("/api/v1/events/move", {
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
                    <Logo className="logo"/>
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
                        onCreate={async (data) => {
                        console.log("ON CREATE CALLED", data);

                        await handleCreate(data); // 👈 wait for it

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

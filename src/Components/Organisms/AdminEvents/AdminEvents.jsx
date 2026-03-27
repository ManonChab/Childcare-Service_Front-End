import React, { useEffect, useState } from "react";
import style from "./AdminEvents.module.css"
import Button from "../../Atoms/Button/Button";
import AlertModal from "../../Atoms/AlertModal/AlertModal";
import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";



    const AdminEvents = () => {
    const [events, setEvents] = useState([]);
    const [filter, setFilter] = useState("ALL");
    const [eventToDelete, setEventToDelete] = useState(null);

    const filteredEvents = events.filter(e => {
        if (filter === "REQUESTED") return e.status === "REQUESTED";
        if (filter === "CONFIRMED") return e.status === "CONFIRMED";
        if (filter === "REJECTED") return e.status === "REJECTED";
        return true;
    });

    const fetchEvents = () => {
        fetch("http://localhost:8080/api/v1/events") 
        .then(res => res.json())
        .then(data => setEvents(Array.isArray(data) ? data : [data]));
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleDelete = (id) => {
    fetch(`/api/v1/events/${id}`, {
        method: "DELETE"
    })
    .then(() => {
        setEvents(prev => prev.filter(e => e.id !== id));
    })
    .catch(err => console.error(err));
};

    const updateStatus = (event, action) => {
        fetch(`/api/v1/events/${event.id}/${action}`, {
        method: "PUT"
        })
        .then(() => {
            setEvents(prev =>
            prev.map(e =>
                e.id === event.id
                ? { ...e, status: action === "approve" ? "CONFIRMED" : "REJECTED" }
                : e
            )
            );
        })
        .catch(err => console.error(err));
    };

    return (
        <>
            <section className={style.filter}>
                <FormControl
                size="small"
                sx={{
                    minWidth: 120,
                    backgroundColor: "white",
                    borderRadius: "6px",
                    marginBottom: 2,
                    marginTop: 2
                }}
            >
                <InputLabel>Filter</InputLabel>

                <Select
                    value={filter}
                    label="Filter"
                    onChange={(e) => setFilter(e.target.value)}
                >
                    <MenuItem value="ALL">All</MenuItem>
                    <MenuItem value="APPROVED">Approved</MenuItem>
                    <MenuItem value="REJECTED">Rejected</MenuItem>
                    <MenuItem value="PENDING">Pending</MenuItem>
                    <MenuItem value="PASSED">Passed</MenuItem>
                </Select>
            </FormControl>
        </section>
        
            <div className={style.page}>
        {filteredEvents.map(e => (
            <div
            key={e.id}
            className={`${style.event} ${
                e.status === "CONFIRMED"
                ? style.confirmed
                : e.status === "REJECTED"
                ? style.rejected
                : ""
            }`}
            >
            <section className={style.actions}>
            <button
                className={style.deleteBtn}
                onClick={() => setEventToDelete(e)}
            >
                🗑️
            </button>
            <AlertModal
            event={eventToDelete}
            onCancel={() => setEventToDelete(null)}
            onConfirm={(id) => {
                handleDelete(id);
                setEventToDelete(null);
            }}
        />
            </section>

            <section className={style.text}>
                <p className={style.text}>From: {new Date(e.start).toLocaleString()}</p>
                <p className={style.text}>To: {new Date(e.end).toLocaleString()}</p>
                <p className={style.text}>{e.text}</p>
                <p className={style.author}> - {e.user?.firstName || "Unknown"} - </p>
            </section>
            <section className={style.decision}>
                <Button label="Approve" type="approve" onClick={() => updateStatus(e, "approve")} />
                <Button label="Reject" type="reject" onClick={() => updateStatus(e, "reject")} />
            </section>
            </div>
        ))}
        </div>
        </>
    );
    };

export default AdminEvents;
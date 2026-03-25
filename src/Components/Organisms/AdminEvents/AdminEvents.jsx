import React, { useEffect, useState } from "react";
import style from "./AdminEvents.module.css"


    const AdminEvents = () => {
    const [events, setEvents] = useState([]);
    const [filter, setFilter] = useState("ALL");

    const filteredEvents = events.filter(e => {
        if (filter === "REQUESTED") return e.status === "REQUESTED";
        if (filter === "CONFIRMED") return e.status === "CONFIRMED";
        if (filter === "REJECTED") return e.status === "REJECTED";
        return true;
    });

    const fetchEvents = () => {
        fetch("http://localhost:8080/api/v1/events") // fix endpoint
        .then(res => res.json())
        .then(data => setEvents(Array.isArray(data) ? data : [data]));
    };

    useEffect(() => {
        fetchEvents();
    }, []);

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
        <div>
        {filteredEvents.map(e => (
            <div key={e.id} className={style.event}>
                <section>
                    <p>Start: {new Date(e.start).toLocaleString()}</p>
                    <p>End: {new Date(e.end).toLocaleString()}</p>
                    <p>{e.text}</p>
                    <p>{e.user?.firstName || "Unknown"}</p>
                </section>
                <section className={style.decision}>
                    <button onClick={() => updateStatus(e, "approve")}>Approve</button>
                    <button onClick={() => updateStatus(e, "reject")}>Reject</button>
                </section>
            </div>
        ))}
        </div>
    );
    };

export default AdminEvents;
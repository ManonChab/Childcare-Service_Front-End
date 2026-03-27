import  api  from "../../Service/api";

export const getSlots = (start, end) =>
    fetch(`/api/v1/events?start=${start}&end=${end}`).then(r => r.json());

export const createSlot = (data) =>
    fetch("/api/v1/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
    }).then(async (r) => {
        if (!r.ok) {
            const text = await r.text();
            throw new Error(text);
        }
        return r.json();
    });


export const updateSlot = (data) =>
    fetch("/api/v1/events/update", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
    });

export const deleteSlot = (id) =>
  fetch(`/api/v1/events/${id}`, { method: "DELETE" });

export const API = "http://localhost:8080/api/v1/events";
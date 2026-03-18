// api/slots.js
export const getSlots = (start, end) =>
    fetch(`/api/events?start=${start}&end=${end}`).then(r => r.json());

export const createSlot = (data) =>
    fetch("/api/events/create", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
    }).then(r => r.json());

export const updateSlot = (data) =>
    fetch("/api/events/update", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
    });

export const deleteSlot = (id) =>
  fetch(`/api/events/${id}`, { method: "DELETE" });
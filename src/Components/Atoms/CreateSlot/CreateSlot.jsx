import style from "./CreateSlot.module.css"
import React, { useState, useEffect  } from "react";
import { Snackbar, Alert } from "@mui/material";

export const CreateSlot = ({ onCreate, loading, error }) => {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({
        start: "",
        end: "",
        text: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("FORM SUBMITTED", form);
        onCreate(form); // 🔥 send data to parent
        setForm({ start: "", end: "", text: "" });
    };

    useEffect(() => {
    if (error) {
        setOpen(true);
    }
    }, [error]);


    return (
        <form className={style.eventForm} onSubmit={handleSubmit}>
            <h3>Create Slot</h3>
            <div className={style.formGroup}>
                <label>Start</label>
                <input
                type="datetime-local"
                value={form.start}
                onChange={(e) => setForm({ ...form, start: e.target.value })}
                                />
            </div>
            <div className={style.formGroup}>
                <label>End</label>
                <input
                type="datetime-local"
                value={form.end}
                onChange={(e) => setForm({ ...form, end: e.target.value })}
                />
            </div>
            <div className={style.formGroup}>
                <label>Message</label>
                <input
                type="text"
                value={form.text}
                onChange={(e) => setForm({ ...form, text: e.target.value })}
                                />
            </div>

            <Snackbar open={open} autoHideDuration={4000} onClose={() => setOpen(false)}>
                <Alert severity="error" onClose={() => setOpen(false)}>
                    {error}
                </Alert>
            </Snackbar>

            <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create"}
            </button>

        </form>
    )





}
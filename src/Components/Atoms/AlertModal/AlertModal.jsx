import Button from "../Button/Button";
import style from "./AlertModal.module.css"


const AlertModal = ({ event, onConfirm, onCancel }) => {
    if (!event) return null;

    return (
        <div className={style.overlay}>
            <div className={style.modal}>
                <h3>Delete event?</h3>
                <p>From: {new Date(event.start).toLocaleString()}</p>
                <p>To: {new Date(event.end).toLocaleString()}</p>
                <p>{event.text}</p>
                <p> - {event.user?.firstName || "Unknown"} - </p>

                <div className={style.buttons}>
                    <Button onClick={onCancel} label={"cancel"}/>
                    <Button onClick={() => onConfirm(event.id)} label={"delete"}/>
                </div>
            </div>
        </div>
    );
};

export default AlertModal;
import { useState, useContext } from "react";
import { UserContext } from "../../../Context/UserContext"; 
import ReviewForm from "../../Organisms/ReviewForm/ReviewForm";
import style from "./ReviewPopUp.module.css";

const ReviewPopup = () => {
  const { isLogged } = useContext(UserContext); 
  const [open, setOpen] = useState(false);

  if (!isLogged) return null;

  return (
    <div>
      <button className={style.reviewButton} onClick={() => setOpen(true)}>
        Leave a review
      </button>

      {open && (
        <div className={style.overlay} onClick={() => setOpen(false)}>
          <div className={style.modal} onClick={(e) => e.stopPropagation()}>
            <button className={style.close} onClick={() => setOpen(false)}>
              ✖
            </button>

            <ReviewForm onSuccess={() => setOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewPopup;
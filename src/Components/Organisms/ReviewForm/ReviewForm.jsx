import { useState, useContext } from "react";
import { UserContext } from "../../../Context/UserContext"
import style from "../ReviewForm/ReviewForm.module.css";

const ReviewForm = ({ onSuccess }) => {
    const { user, isLogged, openAuthModal } = useContext(UserContext);
    const [text, setText] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");
    const [anonymous, setAnonymous] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isLogged || !user) {
        setError("You must be logged in to submit a review.");
        openAuthModal(); // optional: open login modal
        return;
        }

    const payload = {
        review: text,
        show: false,
        user: {
        id: user.id,
        firstName: anonymous ? "Anonymous" : user.firstname,
        },
    };

    fetch("http://localhost:8080/api/v1/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to submit review");
        return res.json();
      })
      .then(() => {
        setSuccess(true);
        setText("");
        if (onSuccess) onSuccess();

      })
      .catch((err) => {
        console.error(err);
        setError("Failed to submit review. Try again.");
      });
  };

  if (success) {
    return (
      <div className={style.box}>
        <p>Your review has been submitted correctly.</p>
      </div>
    );
  }

return (
    <div className={style.box}>
        <h3>Leave a review</h3>
        <form className={style.form} onSubmit={handleSubmit}>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
                placeholder="Write your review..."
                className={style.textBox}
            />
            <label style={{ marginTop: "10px", fontSize: "0.9rem" }}>
          <input
            type="checkbox"
            checked={anonymous}
            onChange={(e) => setAnonymous(e.target.checked)}
            style={{ marginRight: "5px" }}
          />
          Submit anonymously
        </label>
            <button className={style.submit} type="submit">
            Submit
            </button>
        </form>
    {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
    );
};

export default ReviewForm;

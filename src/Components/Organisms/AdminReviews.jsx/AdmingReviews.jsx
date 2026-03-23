import { useEffect, useState } from "react";

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = () => {
    fetch("http://localhost:8080/api/v1/reviews")
      .then(res => res.json())
      .then(data => setReviews(Array.isArray(data) ? data : [data]));
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const toggleShow = (review) => {
    fetch(`http://localhost:8080/api/v1/reviews/${review.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...review,
        show: !review.show,
      }),
    })
      .then(() => fetchReviews())
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Admin - Reviews</h2>

      {reviews.map((r) => (
        <div key={r.id} style={{ border: "1px solid grey", margin: "10px", padding: "10px" }}>
          <p>{r.review}</p>
          <p>{r.user?.firstName || "Anonymous"}</p>

          <button onClick={() => toggleShow(r)}>
            {r.show ? "Hide" : "Show"}
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminReviews;
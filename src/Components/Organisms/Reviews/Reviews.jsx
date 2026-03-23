import { useEffect, useState } from "react";
import style from "../Reviews/Reviews.module.css"

const Recommendations = () => {
  const [reviews, setReviews] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/reviews")
      .then(res => res.json())
      .then(data => {
        const filtered = (Array.isArray(data) ? data : [data])
          .filter(r => r.show)
          .map(r => ({
            id: r.id,
            text: r.review,
            author: r.user?.firstName || "Anonymous"
          }));

        setReviews(filtered);
      })
      .catch(err => console.error(err));
  }, []);

  if (!reviews.length) {
    return <p>No reviews available</p>;
  }

  const next = () => {
    setIndex((i) => (i === reviews.length - 1 ? 0 : i + 1));
  };

  const prev = () => {
    setIndex((i) => (i === 0 ? reviews.length - 1 : i - 1));
  };

  const current = reviews[index];

  return (
    <div className={style.box}>
      {reviews.length > 1 && <button onClick={prev} className={style.arrows}>{"<"}</button>}

      <div className={style.text}>
        <p className={style.phrase}>"{current.text}"</p>
        <p className={style.autor}>- {current.author}</p>
      </div>

      {reviews.length > 1 && <button onClick={next} className={style.arrows}>{">"}</button>}
    </div>
  );
};

export default Recommendations;
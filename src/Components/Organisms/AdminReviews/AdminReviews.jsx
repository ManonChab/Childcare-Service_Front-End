import { useEffect, useState } from "react";
import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import Title from "../../Atoms/Title/Title";
import Logo from "../../Atoms/Logo/Logo";
import style from "../AdminReviews/AdminReviews.module.css";
import SliderButton from "../../Atoms/SliderButton/SliderButton";

const AdminReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [filter, setFilter] = useState("ALL");

  const filteredReviews = reviews.filter(r => {
  if (filter === "SHOWN") return r.show === true;
  if (filter === "HIDDEN") return r.show === false;
  return true;
});

  const fetchReviews = () => {
    fetch("http://localhost:8080/api/v1/reviews")
      .then(res => res.json())
      .then(data => setReviews(Array.isArray(data) ? data : [data]));
  };

  useEffect(() => {
    fetchReviews();
  }, []);

const toggleShow = (review, newValue) => {
  const endpoint = newValue ? "approve" : "reject";

  fetch(`http://localhost:8080/api/v1/reviews/${review.id}/${endpoint}`, {
    method: "PUT",
  })
    .then(() => {
      setReviews(prev =>
        prev.map(r =>
          r.id === review.id ? { ...r, show: newValue } : r
        )
      );
    })
    .catch(err => console.error(err));
};

  return (
    <div className={style.page}>
      <header className={style.header}>
        <Logo/>
        <Title title="Reviews"/>
      </header>
      <FormControl size="small" sx={{ minWidth: 80, maxWidth: 120, backgroundColor: "white", borderRadius: "6px",  }}>
        <InputLabel sx={{ fontSize: "1rem",}}>Filter</InputLabel>
        <Select value={filter} label="Filter" onChange={(e) => setFilter(e.target.value)} sx={{ fontSize: "1rem",}}>
            <MenuItem value="ALL" sx={{ fontSize: "1rem",}}>All</MenuItem>
            <MenuItem value="SHOWN" sx={{ fontSize: "1rem",}}>Shown</MenuItem>
            <MenuItem value="HIDDEN" sx={{ fontSize: "1rem",}}>Hidden</MenuItem>
        </Select>
      </FormControl>
      {filteredReviews.map((r) => (
        <div key={r.id} className={style.review}>
          <section className={style.text}>
            <p>{r.review}</p>
            <p className={style.autor}> - {r.user?.firstName || "Anonymous"} - </p>
          </section>
          <SliderButton
            checked={r.show}
            onToggle={(e, value) => toggleShow(r, value)}
          />
        </div>
      ))}
    </div>
  );
};

export default AdminReviews;
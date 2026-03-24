import React, { useEffect, useRef, useState } from "react";
import "./TitleCards.css";
import cards_data from "../../assets/cards/Cards_data";
import { Link } from "react-router-dom";

const TitleCards = ({ title, category }) => {

    const [apiData, setApiData] = useState([])

    const token = import.meta.env.VITE_TMDB_TOKEN;

  const cardsRef = useRef();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };


  const handleWheel = (event) => {
    console.log("Scroll detected!", event.deltaY);
    if (event.deltaX !== 0) return;
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {

    fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}`, options)
    .then((res) => res.json())
    .then((res) => {
      // Log and Set in the SAME block
      console.log("TMDB Data Received:", res.results);
      if (res.results) {
        setApiData(res.results);
      }
    })
    .catch((err) => console.error(err));

    const element = cardsRef.current;
    if (!element) return;

    const handleWheel = (e) => {
      if (e.deltaX !== 0) return;
      e.preventDefault();
      element.scrollLeft += e.deltaY;
    };

    element.addEventListener("wheel", handleWheel, { passive: false });

    return () => element.removeEventListener("wheel", handleWheel);
  }, [category]);

  return (
    <div className="title-cards">
      <h2>{title ? title : "Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData && apiData.map((card, index) => {
          return (
            <Link to={`/player/${card.id}`} className="card" key={index}>
              <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt="" />
              <p>{card.original_title}</p>
            </Link>
          )
        })}
      </div>
    </div>
  );
};

export default TitleCards;

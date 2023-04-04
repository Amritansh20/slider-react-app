import list from "./data";
import { useState, useEffect } from "react";
import { FaQuoteRight } from "react-icons/fa";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
const Carousel = () => {
  const [people] = useState(list);
  const [currentPerson, setCurrentPerson] = useState(0);
  const handelRight = () => {
    setCurrentPerson((oldPerson) => {
      const newPerson = (oldPerson + 1) % list.length;
      return newPerson;
    });
  };
  const handelLeft = () => {
    setCurrentPerson((oldPerson) => {
      const newPerson = (oldPerson - 1 + list.length) % list.length;
      return newPerson;
    });
  };

  useEffect(() => {
    let sliderID = setInterval(() => {
      handelRight();
    }, 2000);
    return () => {
      clearInterval(sliderID);
    };
  }, [currentPerson]);
  return (
    <section className="carousel-container">
      {people.map((person, index) => {
        const { id, title, image, quote, name } = person;
        return (
          <article
            className="slide"
            key={id}
            style={{
              transform: `translate(${100 * (index - currentPerson)}%`,
              opacity: index === currentPerson ? 1 : 0,
              visibility: index === currentPerson ? "visible" : "hidden",
            }}
          >
            <img src={image} alt={name} className="person-image"></img>
            <h4 className="name">{name}</h4>
            <p className="title">{title}</p>
            <p className="text">{quote}</p>
            <FaQuoteRight className="icon"></FaQuoteRight>
          </article>
        );
      })}
      <button type="button" className="prev" onClick={handelLeft}>
        <FiChevronLeft></FiChevronLeft>
      </button>
      <button type="button" className="next" onClick={handelRight}>
        <FiChevronRight></FiChevronRight>
      </button>
    </section>
  );
};
export default Carousel;

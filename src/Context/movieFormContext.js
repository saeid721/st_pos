import React, { createContext, useState, useContext } from "react";

const MovieFormContext = createContext();

export const MovieFormProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    // First form fields
    title: "",
    description: "",
    video_access: "",
    imbd_rating: "",
    imdb_votes: "",
    upcoming: "",
    thumbnail: null,
    cover: null,
    release_date: "",
    duration: "",
    content_rating: "",
    industry_id: null,
    meta_title: "",
    meta_description: "",
    meta_keywords: "",

    // Second form fields
    languages: [],
    genres: [],
    cast: [],
    directors: [],
    tags: [],
  });

  const updateFormData = (newData) => {
    setFormData((prevData) => ({ ...prevData, ...newData }));
  };

  return (
    <MovieFormContext.Provider value={{ formData, updateFormData }}>
      {children}
    </MovieFormContext.Provider>
  );
};

export const useMovieForm = () => useContext(MovieFormContext);

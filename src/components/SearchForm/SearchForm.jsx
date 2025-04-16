import { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import style from './SearchForm.module.css'

const SearchForm = ({ onSubmit }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(query.trim());
  };

  return (
    <div className={style.search}>
    <form className={style.form} onSubmit={handleSubmit}>
      <button className={style.button} type="submit">
        <IoIosSearch className={style.icon} />
      </button>
      <input
      className={style.input}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
      />
    </form>
    </div>
  );
};

export default SearchForm;

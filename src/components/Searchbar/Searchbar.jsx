import { useState } from 'react';
import css from 'components/Searchbar/Searchbar.module.css';
import PropTypes from 'prop-types';

import Notiflix from 'notiflix';

export function Searchbar({ onSubmit }) {
  const [imageQuery, setImageQuery] = useState('');

  const hendleSearchChange = event => {
    setImageQuery(event.currentTarget.value.toLowerCase());
  };

  const hendleSubmit = event => {
    event.preventDefault();
    if (imageQuery.trim() === '') {
      Notiflix.Notify.failure('Please write what you want to find!');
      return;
    }
    onSubmit(imageQuery);
    setImageQuery('');
  };

  return (
    <header className={css.searchbar}>
      <form onSubmit={hendleSubmit} className={css.searchForm}>
        <button className={css.searchForm_button} type="submit">
          <span className={css.searchForm_button_label}>Search</span>
        </button>
        <input
          className={css.searchForm_input}
          type="text"
          autoFocus
          value={imageQuery}
          onChange={hendleSearchChange}
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

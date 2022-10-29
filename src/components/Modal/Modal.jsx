import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import css from 'components/Modal/Modal.module.css';

const modalRoot = document.querySelector('#modal-root');
export function Modal({ largeImageURL, description, onClose }) {
  useEffect(() => {
    window.addEventListener('keydown', keyDown);
  });

  useEffect(() => {
    return window.removeEventListener('keydown', keyDown);
  });

  const hendleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  const keyDown = event => {
    if (event.code === 'Escape') {
      onClose();
    }
  };

  return createPortal(
    <div onClick={hendleOverlayClick} className={css.overlay}>
      <div className={css.modal}>
        <img src={largeImageURL} alt={description} />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

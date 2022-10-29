import css from 'components/ImageGallery/ImageGalleryItem/ImageGalleryItem.module.css';
import { useState } from 'react';
import { Modal } from 'components/Modal/Modal';
import PropTypes from 'prop-types';

export function ImageGalleryItem({ image }) {
  const [showModal, setShowModal] = useState(false);
  const hendleModal = () => {
    setShowModal(!showModal);
  };

  const { webformatURL, tags, largeImageURL } = image;
  return (
    <>
      <li onClick={hendleModal} className={css.imageGalleryItem}>
        <img
          className={css.imageGalleryItem_image}
          src={webformatURL}
          alt={tags}
          loading="lazy"
        />
      </li>
      {showModal && (
        <Modal
          largeImageURL={largeImageURL}
          description={tags}
          onClose={hendleModal}
        />
      )}
    </>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
};

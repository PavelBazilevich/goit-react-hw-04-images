import { useState, useEffect } from 'react';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { fetchImages } from 'components/SeviceApi/Api';

import css from 'components/App/App.module.css';
import { Searchbar } from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';

export function App() {
  const [imageQuery, setImageQuery] = useState('');
  const [page, setPage] = useState(null);
  const [error, setError] = useState('');
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [isLoadMoreShown, setIsLoadMoreShown] = useState(false);

  const hendleFormSubmit = imageQuery => {
    setImageQuery(imageQuery);
    setImages([]);
    setPage(1);
    setIsLoading(true);
    setError('');
  };

  useEffect(() => {
    const fetchImg = async () => {
      setIsLoading(true);
      try {
        function randomInteger(min, max) {
          // получить случайное число от (min-0.5) до (max+0.5)
          let rand = min - 0.5 + Math.random() * (max - min + 1);
          return Math.round(rand);
        }
        const fetchedImages = await fetchImages(randomInteger(1, 50));
        setImages(fetchedImages.hits);
      } catch (e) {
        setError('Sorry, failed to download. Please try again.');
        throw e;
      } finally {
        setIsLoading(false);
      }
    };
    fetchImg();
  }, []);

  useEffect(() => {
    if (imageQuery === '') {
      return;
    }

    const fetchImg = async () => {
      setIsLoading(true);
      try {
        const fetchedImages = await fetchImages(imageQuery, page);
        setImages(prevImages => [...prevImages, ...fetchedImages.hits]);
        // потрібно подумати ще над функціоналом показу кнопки (LOAD MORE)
        // setIsLoadMoreShown(images.length > fetchedImages.totalHits);
        if (fetchedImages.totalHits === 0) {
          setError('Sorry, there are no images you were looking for.');
        }
      } catch (e) {
        setError('Sorry, failed to download. Please try again.');
        throw e;
      } finally {
        setIsLoading(false);
      }
    };
    if (imageQuery) {
      fetchImg();
    }
  }, [imageQuery, page]);

  const hendelLoadMor = () => {
    setPage(prevPage => prevPage + 1);
    setIsLoading(true);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={hendleFormSubmit} />
      {isLoading ? (
        <Loader isLoading={isLoading} />
      ) : (
        <ImageGallery images={images} />
      )}
      {error && <h1>{error}</h1>}

      {!(images.length < 12) && page !== null && (
        <Button onClick={hendelLoadMor} />
      )}
    </div>
  );
}

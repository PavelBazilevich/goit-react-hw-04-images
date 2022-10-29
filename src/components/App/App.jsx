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
  const [isLoadMoreShown, setIsLoadMoreShown] = useState(false);

  // state = {
  //   page: null,
  //   error: '',
  //   images: [],
  //   isLoading: false,
  //   isLoadMoreShown: false,
  // };

  const hendleFormSubmit = imageQuery => {
    setImageQuery(imageQuery);
    setImages([]);
    setPage(1);
    setIsLoading(true);
    // this.setState({ imageQuery, images: [], page: 1, isLoading: true });
  };

  useEffect(() => {
    console.log('componentDidMount');
    if (!isLoading) {
      fetchImages();
    }
  }, []);

  // componentDidMount() {
  //   if (!this.state.isLoading) {
  //     this.fetchImages();
  //   }
  // }

  useEffect(() => {
    console.log('componentDidUpdate');

    if (isLoading) {
      fetchImages();
    }
  }, [fetchImages, isLoading]);

  // componentDidUpdate() {
  //   if (this.state.isLoading) {
  //     this.fetchImages();
  //   }
  // }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function fetchImages() {
    const searchQuery = imageQuery;
    const searchPage = page;
    try {
      const fetchedImages = await fetchImages(searchQuery, searchPage);
      // const imagess = [...images, ...fetchedImages.hits];
      // setImages(prevImages => prevImages, ...fetchedImages.hits);
      setImages([fetchedImages.hits]);

      // setImages([...images, ...fetchedImages.hits]);
      setIsLoadMoreShown(images.length < fetchedImages.totalHits);
      setError(
        images.length === 0
          ? 'Sorry, there are no images you were looking for.'
          : ''
      );
      // this.setState({
      //   images: images,
      //   isLoadMoreShown: images.length < fetchedImages.totalHits,
      //   error:
      //     images.length === 0
      //       ? 'Sorry, there are no images you were looking for.'
      //       : '',
      // });
    } catch {
      setError('Sorry, failed to download. Please try again.');
      // this.setState({
      //   error: 'Sorry, failed to download. Please try again.',
      // });
    } finally {
      setIsLoading(false);
      // this.setState({ isLoading: false });
    }
  }

  const hendelLoadMor = () => {
    setPage(prevPage => prevPage + 1);
    setIsLoading(true);
    // this.setState(prevState => ({
    //   page: prevState.page + 1,
    //   isLoading: true,
    // }));
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

      {!(images.length < 12) && <Button onClick={hendelLoadMor} />}
    </div>
  );
}

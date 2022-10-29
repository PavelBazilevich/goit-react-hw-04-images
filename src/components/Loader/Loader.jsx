import { CirclesWithBar } from 'react-loader-spinner';
import PropTypes from 'prop-types';

export const Loader = ({ isLoading }) => {
  return (
    <CirclesWithBar
      color="rgb(36, 114, 240)"
      loading={isLoading}
      height="400"
      width="400"
      aria-label="Loading Spinner"
      data-testid="loader"
      wrapperStyle={{ margin: 'auto' }}
    />
  );
};

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

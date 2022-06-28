import React from 'react';
import {render} from '@testing-library/react';
import {BrowserRouter} from 'react-router-dom';
import {createMemoryHistory} from 'history';

const customRender = (ui, options = {}) => {
  const history = options.history ? options.history : createMemoryHistory();
  const location = options.location ? options.location : {};
  const AllTheProviders = ({children}) => {
    return (
      <BrowserRouter location={location} history={history}>
        {children}
      </BrowserRouter>
    );
  };
  return render(ui, {wrapper: AllTheProviders.bind(options), ...options});
};

// re-export everything
export * from '@testing-library/react';
// override render method
export {customRender as render};

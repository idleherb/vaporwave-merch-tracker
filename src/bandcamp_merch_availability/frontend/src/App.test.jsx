import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import App from './App';

describe('App', () => {
  it('should display the application', async() => {
    const { findByText } = render(<App />);

    const actual = await findByText('Hello, World!');
    expect(actual).not.toBeNull();
  });
});

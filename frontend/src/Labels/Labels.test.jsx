import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Labels from './Labels';

describe('Labels', () => {
  it('should display 2 labels, one selected', () => {
    const labels = [
      {
        name: 'aurawire',
      },
      {
        name: 'Dream Catalogue',
        selected: true,
      },
    ];
    const { queryByText } = render(<Labels labels={labels} />);

    /* eslint-disable no-unused-expressions */
    notNull(queryByText(labels[0].name));
    notNull(queryByText(labels[1].name));
  });

  function notNull(elem) {
    expect(elem).not.toBeNull();
  }
});

import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Labels from './Labels';

describe('Labels', () => {
  it('should display 2 labels, one selected', async () => {
    const labels = [
      {
        name: 'aurawire',
        count: 2,
      },
      {
        name: 'Dream Catalogue',
        count: 5,
        selected: true,
      },
    ];
    const { findByText } = render(<Labels labels={labels} />);

    /* eslint-disable no-unused-expressions */
    notNull(await findByText(`${labels[0].name} (${labels[0].count})`));
    notNull(await findByText(`${labels[1].name} (${labels[1].count})`));
  });

  function notNull(elem) {
    expect(elem).not.toBeNull();
  }
});

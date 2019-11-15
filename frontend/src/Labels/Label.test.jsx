import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Label from './Label';

describe('Label', () => {
  it('should have name', async () => {
    const name = 'foo';
    const { queryByText } = render(<Label name={name} selected />);

    /* eslint-disable no-unused-expressions */
    expect(queryByText(name)).not.toBeNull();
  });
});

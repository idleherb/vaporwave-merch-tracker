import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import MerchItem from './MerchItem';

describe('MerchItem', () => {
  it('should display attributes', async () => {
    const attributes = {
      label: 'aurawire',
      artist: 'Renjā',
      title: 'Xenon',
      release_date: '20180727',
      timestamp: '2019-11-09T06:03:18.962686',
      url: 'https://aurawire.bandcamp.com/album/xenon',
    };
    const { findByText } = render(<MerchItem attributes={attributes}/>);

    expect(await findByText(attributes.label)).not.toBeNull;
    expect(await findByText(attributes.artist)).not.toBeNull;
    expect(await findByText(attributes.title)).not.toBeNull;
    expect(await findByText(attributes.release_date)).not.toBeNull;
    expect(await findByText(attributes.timestamp)).not.toBeNull;
    expect(await findByText(attributes.url)).not.toBeNull;
  });
});
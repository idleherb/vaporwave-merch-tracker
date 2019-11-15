import React from 'react';
import * as PropTypes from 'prop-types';
import styles from './Labels.module.scss';

import Label from './Label';

Labels.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    selected: PropTypes.boolean,
  })).isRequired,
};

function Labels(props) {
  const { labels } = props;

  return (
    <header className={styles.header}>
      <ul className={styles.labels}>
        {labels.map((label) => {
          const { name, selected, cb } = label;
          return <Label
            name={name}
            selected={selected}
            key={name}
            cb={cb}
          />
        })}
      </ul>
    </header>
  );
}

export default Labels;

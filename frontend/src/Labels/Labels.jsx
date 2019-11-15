import React from 'react';
import * as PropTypes from 'prop-types';
import styles from './Labels.module.scss';

import Label from './Label';

Labels.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.shape({
    afterChange: PropTypes.func,
    count: PropTypes.number.isRequired,
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
          const {
            afterChange, count, name, selected,
          } = label;
          return (
            <Label
              afterChange={afterChange}
              count={count}
              name={name}
              selected={selected}
              key={name}
            />
          );
        })}
      </ul>
    </header>
  );
}

export default Labels;

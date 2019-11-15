import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import styles from './Label.module.scss';

Label.propTypes = {
  afterChange: PropTypes.func,
  count: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool,
};

Label.defaultProps = {
  afterChange: undefined,
  selected: false,
};

function Label(props) {
  const { afterChange, count, name, selected } = props;
  const [checked, setChecked] = useState(selected);

  function handleChange(event) {
    setChecked(event.target.checked);
    if (afterChange) {
      afterChange();
    }
  }

  return (
    /* eslint-disable jsx-a11y/label-has-associated-control */
    <li className={styles.container}>
      <label className={`${checked ? styles.selected : ''} ${styles.filterChip}`}>
        {name} ({count})
        <input type="checkbox" checked={checked} onChange={handleChange} />
        <span className={styles.checkmark} />
      </label>
    </li>
  );
}

export default Label;

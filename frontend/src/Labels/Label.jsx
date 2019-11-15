import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import styles from './Label.module.scss';

Label.propTypes = {
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool,
};

Label.defaultProps = {
  selected: false,
};

function Label(props) {
  const { name, selected, cb } = props;
  const [checked, setChecked] = useState(selected);

  function handleChange(event) {
    setChecked(event.target.checked);
    cb();
  }

  return (
    /* eslint-disable jsx-a11y/label-has-associated-control */
    <li className={styles.container}>
      <label className={`${checked ? styles.selected : ''} ${styles.filterChip}`}>
        {name}
        <input type="checkbox" checked={checked} onChange={handleChange} />
        <span className={styles.checkmark} />
      </label>
    </li>
  );
}

export default Label;

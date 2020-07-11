// @flow

import React from 'react';

type Props = {
  addTag: (string) => void,
  removeTag: (string) => void,
  name: string,
};

/**
 * @component
 * Checkbox to filter by a specific tag
 * Only products that match all selected tags are shown
 */
const Tag = ({ name, addTag, removeTag }: Props) => (
  <label>
    <input
      type="checkbox"
      onChange={(event) => {
        const { checked, value } = event.target;
        if (checked) {
          addTag(value);
        } else {
          removeTag(value);
        }
      }}
      value={name}
    />{' '}
    {name}
  </label>
);

export default Tag;

// @flow

import React from 'react';
import Tag from './Tag';
import './TagsFilter.css';

type Props = {
  addTag: (string) => void,
  removeTag: (string) => void,
  tags: string[],
};

/**
 * @component
 * Checkboxes to filter by tag
 * Only products that match all selected tags are shown
 */
const TagsFilter = ({ tags, addTag, removeTag }: Props) => (
  <div className="Filters-row">
    {tags.map((tag) => (
      <span key={tag} className="Tag-container">
        <Tag name={tag} addTag={addTag} removeTag={removeTag} />
      </span>
    ))}
  </div>
);

export default TagsFilter;

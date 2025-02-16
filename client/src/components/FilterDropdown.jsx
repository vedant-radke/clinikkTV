import React from "react";

const FilterDropdown = ({ setMediaType }) => {
  return (
    <select onChange={(e) => setMediaType(e.target.value)}>
      <option value="">All</option>
      <option value="video">Videos</option>
      <option value="audio">Audios</option>
    </select>
  );
};

export default FilterDropdown;

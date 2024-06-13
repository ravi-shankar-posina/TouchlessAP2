import React, { useState } from "react";

const EditableCell = ({ value, onSave }) => {
  const [editing, setEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);

  const handleInputChange = (e) => {
    setEditedValue(e.target.value);
  };

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    onSave(editedValue);
    setEditing(false);
  };

  const handleCancelClick = () => {
    setEditedValue(value);
    setEditing(false);
  };

  return (
    <td>
      {editing ? (
        <>
          <input
            type="number"
            value={editedValue}
            onChange={handleInputChange}
          />
          <button onClick={handleSaveClick}>Save</button>
          <button onClick={handleCancelClick}>Cancel</button>
        </>
      ) : (
        <>
          {value}
          <button onClick={handleEditClick}>Edit</button>
        </>
      )}
    </td>
  );
};

export default EditableCell;

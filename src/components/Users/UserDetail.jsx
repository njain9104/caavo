import React from "react";
import "./UserDetail.css";

const UserDetail = (props) => {
  const { user, onUserSelect } = props;
  const { id: userId, name: userName, Image: userImage, isSelected } = user;

  const onUserClick = () => onUserSelect(userId);

  return (
    <div className="card">
      <div onClick={onUserClick}>
        <img className="header" src={userImage} alt={userName} />
        <div className="container">
          <label>{userName}</label>
          {isSelected && <div>SELECTED</div>}
        </div>
      </div>
    </div>
  );
};

export default UserDetail;

import React from "react";
import UserDetail from "../Users/UserDetail";
import "./Groups.css";

const CreateGroup = (props) => {
  const {
    users,
    groupDetail,
    onChange,
    onUserSelect,
    onCreate,
    onRemove,
    onHideCreateGroup,
    onSortUsers,
    sortCriteria,
  } = props;

  const onCreateClick = () => onCreate(groupDetail);

  const { groupName, groupDescription, groupId, groupImage } = groupDetail;

  const onRemoveGroup = () => onRemove(groupId);

  return (
    <div>
      <span>CREATE GROUP</span>
      <button type="button" onClick={onHideCreateGroup}>
        CLOSE CREATE GROUP
      </button>
      {!!groupId && <div>GROUP ID: {groupId}</div>}
      <button onClick={onSortUsers}>
        {sortCriteria === "ASC"
          ? "SORT USERS BY ASCENDING"
          : "SORT USERS BY DESCENDING"}
      </button>
      <form>
        <input
          type="file"
          name="groupImage"
          accept="image/png, image/jpeg"
          onChange={onChange}
        />
        {!!groupImage && <img src={groupImage} alt={groupName} />}
        <input
          type="text"
          name="groupName"
          value={groupName || ""}
          placeholder="group name"
          onChange={onChange}
          autoComplete="off"
        />
        <input
          type="text"
          name="groupDescription"
          value={groupDescription || ""}
          placeholder="group description"
          onChange={onChange}
          autoComplete="off"
        />
        {users?.map((user) => (
          <UserDetail key={user.id} user={user} onUserSelect={onUserSelect} />
        ))}
        <button className="primaryBtn" type="button" onClick={onCreateClick}>
          {!groupId ? "CREATE" : "UPDATE"}
        </button>
        {!!groupId && (
          <button
            className="secondaryBtn"
            type="button"
            onClick={onRemoveGroup}
          >
            REMOVE
          </button>
        )}
      </form>
    </div>
  );
};

export default CreateGroup;

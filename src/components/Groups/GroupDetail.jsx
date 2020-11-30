import React from "react";

const GroupDetail = (props) => {
  const { group, onShowGroupDetail } = props;

  const onGroupDetail = () => onShowGroupDetail(group.groupId);

  const selectedUsers = group.users.filter((user) => user.isSelected);

  const { groupId, groupImage, groupName, groupDescription } = group;

  return (
    <div>
      <hr />
      <div>Group ID: {groupId}</div>
      {!!groupImage && <img src={groupImage} alt={groupName} />}
      <div>Group Name: {groupName}</div>
      <div> Group Description: {groupDescription}</div>
      <div>TOTAL GROUP USERS: {selectedUsers.length}</div>
      <button type="button" onClick={onGroupDetail}>
        SHOW GROUP DETAIL
      </button>
      <hr />
    </div>
  );
};

export default GroupDetail;

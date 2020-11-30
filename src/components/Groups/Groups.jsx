import React from "react";
import GroupDetail from "./GroupDetail";

const Groups = (props) => {
  const { onShowCreateGroup, groupList, onShowGroupDetail } = props;
  return (
    <div>
      <button type="button" onClick={onShowCreateGroup}>
        CREATE GROUP
      </button>
      <div>GROUPS LIST</div>
      {groupList.length ? (
        groupList.map((group) => (
          <GroupDetail
            key={group.groupId}
            group={group}
            onShowGroupDetail={onShowGroupDetail}
          />
        ))
      ) : (
        <div>No groups are created yet </div>
      )}
    </div>
  );
};

export default Groups;

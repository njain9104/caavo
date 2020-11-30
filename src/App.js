import { useEffect, useState } from "react";
import axios from "axios";
import CreateGroup from "./components/Groups/CreateGroup";
import "./App.css";
import Fallback from "./components/Fallback";
import Groups from "./components/Groups/Groups";
import { cloneDeep } from "lodash";

const App = () => {
  const [groupList, setGroupList] = useState([]);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [groupId, setGroupId] = useState(1);
  const [groupDetail, setGroupDetail] = useState({});
  const [users, setUsers] = useState([]);
  const [apiError, setAPIError] = useState(null);
  const [sortCriteria, setSortCriteria] = useState("ASC");

  useEffect(() => {
    axios
      .get(
        "https://s3-ap-southeast-1.amazonaws.com/he-public-data/users49b8675.json"
      )
      .then((response) => setUsers(response.data))
      .catch((err) => setAPIError(err));
  }, []);

  const resetUsers = () => {
    const usersCopy = cloneDeep(users);
    usersCopy.forEach((userCopy) => (userCopy.isSelected = false));
    setUsers([...usersCopy]);
  };

  const onEditGroup = (group) => {
    const groupListCopy = cloneDeep(groupList);
    const usersCopy = cloneDeep(users);
    const updatedGroupList = groupListCopy.map((groupCopy) => {
      let selectedGroup = { ...groupCopy };
      if (selectedGroup.groupId === group.groupId) {
        selectedGroup = {
          ...groupCopy,
          groupName: group.groupName,
          groupDescription: group.groupDescription,
          groupId: group.groupId,
          users: [...usersCopy],
        };
      }
      return { ...selectedGroup };
    });
    setGroupList([...updatedGroupList]);
    setShowCreateGroup(false);
    resetUsers();
  };

  const onCreateNewGroup = (group) => {
    const usersCopy = cloneDeep(users);
    const updatedGroupDetails = { ...groupDetail };
    updatedGroupDetails.groupName = group.groupName;
    updatedGroupDetails.groupDescription = group.groupDescription;
    updatedGroupDetails.groupId = groupId;
    updatedGroupDetails.users = [...usersCopy];
    setGroupList([...groupList, { ...updatedGroupDetails }]);
    setGroupId(groupId + 1);
    setShowCreateGroup(false);
    resetUsers();
  };

  const onCreate = (group) => {
    if (group.groupId) onEditGroup(group);
    else onCreateNewGroup(group);
  };

  const onUserSelect = (userId) => {
    const usersCopy = cloneDeep(users);
    const updatedUsers = usersCopy.map((userCopy) => {
      let selectedUser = { ...userCopy };
      if (selectedUser.id === userId) {
        selectedUser = { ...userCopy, isSelected: !selectedUser.isSelected };
      }
      return { ...selectedUser };
    });
    setUsers([...updatedUsers]);
  };

  const onChange = (event) => {
    const updatedGroupDetail = { ...groupDetail };
    if (event.target.name === "groupImage") {
      updatedGroupDetail.groupImageFile = event.target.files[0];
      updatedGroupDetail.groupImage = URL.createObjectURL(
        event.target.files[0]
      );
    }
    updatedGroupDetail[event.target.name] = event.target.value;
    setGroupDetail({ ...updatedGroupDetail });
  };

  const onShowCreateGroup = () => {
    setGroupDetail({});
    setShowCreateGroup(true);
  };

  const onHideCreateGroup = () => setShowCreateGroup(false);

  const onShowGroupDetail = (id) => {
    const selectedGroup = groupList.find((group) => group.groupId === id);
    setGroupDetail({
      groupId: selectedGroup.groupId,
      groupName: selectedGroup.groupName,
      groupDescription: selectedGroup.groupDescription,
      groupImageFile: selectedGroup.groupImageFile,
      groupImage: selectedGroup.groupImage,
    });
    const groupUsersCopy = cloneDeep(selectedGroup.users);
    setUsers([...groupUsersCopy]);
    setShowCreateGroup(true);
  };

  const onSortUsers = () => {
    const usersCopy = cloneDeep(users);
    let sortedUsers;
    if (sortCriteria === "ASC") {
      setSortCriteria("DESC");
      sortedUsers = usersCopy.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });
    } else {
      setSortCriteria("ASC");
      sortedUsers = usersCopy.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA > nameB) return -1;
        if (nameA < nameB) return 1;
        return 0;
      });
    }
    setUsers([...sortedUsers]);
  };

  const onRemove = (groupId) => {
    const groupListCopy = cloneDeep(groupList);
    const updatedGroupList = groupListCopy.filter(
      (group) => group.groupId !== groupId
    );
    setGroupList([...updatedGroupList]);
    setShowCreateGroup(false);
    resetUsers();
  };

  return (
    <div className="App">
      {!showCreateGroup && (
        <Groups
          groupList={groupList}
          onShowCreateGroup={onShowCreateGroup}
          onShowGroupDetail={onShowGroupDetail}
        />
      )}
      {showCreateGroup && (
        <div>
          <CreateGroup
            users={users}
            onUserSelect={onUserSelect}
            onCreate={onCreate}
            onHideCreateGroup={onHideCreateGroup}
            onChange={onChange}
            groupDetail={groupDetail}
            onSortUsers={onSortUsers}
            sortCriteria={sortCriteria}
            onRemove={onRemove}
          />
        </div>
      )}
      {apiError && <Fallback />}
    </div>
  );
};

export default App;

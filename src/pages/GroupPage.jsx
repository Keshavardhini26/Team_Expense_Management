import { useContext, useEffect, useState } from 'react';
import GroupCard from '../components/group/GroupCard';
import GroupForm from '../components/group/GroupForm';
import MemberList from '../components/group/MemberList';
import { AppContext } from '../context/AppContext';

const GroupPage = () => {
  const { groups, setGroups, addHistoryEvent } = useContext(AppContext);
  const [selectedGroup, setSelectedGroup] = useState(groups[0] || null);

  const handleAddGroup = (group) => {
    setGroups((prev) => [group, ...prev]);
    addHistoryEvent('Group Created', `Group ${group.name} created with ${group.members.length} members.`);
  };

  const handleDeleteGroup = (groupId) => {
    const targetGroup = groups.find((group) => group.id === groupId);
    if (!targetGroup) return;

    setGroups((prev) => prev.filter((group) => group.id !== groupId));
    addHistoryEvent('Group Deleted', `Group ${targetGroup.name} was deleted.`);
  };

  useEffect(() => {
    if (!groups.length) {
      setSelectedGroup(null);
      return;
    }

    if (!selectedGroup || !groups.some((group) => group.id === selectedGroup.id)) {
      setSelectedGroup(groups[0]);
    }
  }, [groups, selectedGroup]);

  return (
    <div className="stack-gap-lg">
      <div className="page-header">
        <h1>Group Management</h1>
      </div>
      <div className="grid-two">
        <GroupForm onSubmit={handleAddGroup} />
        <MemberList members={selectedGroup?.members || []} />
      </div>
      <section className="grid-two">
        {groups.map((group) => (
          <GroupCard
            key={group.id}
            group={group}
            onSelect={setSelectedGroup}
            onDeleteGroup={handleDeleteGroup}
          />
        ))}
      </section>
    </div>
  );
};

export default GroupPage;

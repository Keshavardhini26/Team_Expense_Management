import { useState } from 'react';

const GroupForm = ({ onSubmit }) => {
  const [groupName, setGroupName] = useState('');
  const [members, setMembers] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!groupName.trim()) return;

    onSubmit({
      id: Date.now(),
      name: groupName,
      members: members
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean),
      totalSpent: 0,
      pendingApprovals: 0,
      tripLocked: false
    });

    setGroupName('');
    setMembers('');
  };

  return (
    <form className="content-card panel-pad stack-gap" onSubmit={handleSubmit}>
      <h3>Create Group</h3>
      <input
        className="input"
        placeholder="Group name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
      />
      <input
        className="input"
        placeholder="Members comma separated"
        value={members}
        onChange={(e) => setMembers(e.target.value)}
      />
      <button className="btn btn-primary" type="submit">
        Add Group
      </button>
    </form>
  );
};

export default GroupForm;

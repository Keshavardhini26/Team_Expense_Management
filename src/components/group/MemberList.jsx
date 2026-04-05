const MemberList = ({ members }) => {
  return (
    <section className="content-card panel-pad">
      <h3>Members</h3>
      <ul className="plain-list">
        {members?.length ? (
          members.map((member) => <li key={member}>{member}</li>)
        ) : (
          <li>No members selected.</li>
        )}
      </ul>
    </section>
  );
};

export default MemberList;

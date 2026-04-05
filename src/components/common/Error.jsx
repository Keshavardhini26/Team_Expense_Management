const Error = ({ message = 'Unable to load this section right now.' }) => {
  return (
    <div className="content-card panel-pad" style={{ borderColor: '#efcccc' }}>
      <h3 style={{ color: 'var(--danger-600)' }}>Error</h3>
      <p>{message}</p>
    </div>
  );
};

export default Error;

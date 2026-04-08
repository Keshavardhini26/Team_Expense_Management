import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/common/Modal';
import useAuth from '../hooks/useAuth';
import authService from '../services/authService';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [rememberMe, setRememberMe] = useState(true);
  const [googlePickerOpen, setGooglePickerOpen] = useState(false);
  const [knownGoogleEmails, setKnownGoogleEmails] = useState(() => authService.getKnownEmails());
  const [newGoogleEmail, setNewGoogleEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(form.email, form.password);
    navigate('/dashboard');
  };

  const openGooglePicker = () => {
    setKnownGoogleEmails(authService.getKnownEmails());
    setGooglePickerOpen(true);
  };

  const handleGoogleEmailPick = async (email) => {
    const normalized = email.trim().toLowerCase();
    if (!normalized) return;

    authService.rememberEmail(normalized);
    setKnownGoogleEmails(authService.getKnownEmails());
    setGooglePickerOpen(false);
    await login(normalized, 'google-oauth');
    navigate('/dashboard');
  };

  const handleAddGoogleEmail = (e) => {
    e.preventDefault();
    const normalized = newGoogleEmail.trim().toLowerCase();
    if (!normalized || !normalized.includes('@')) return;

    const updated = authService.rememberEmail(normalized);
    setKnownGoogleEmails(updated);
    setNewGoogleEmail('');
  };

  return (
    <div className="login-shell">
      <section className="login-hero" aria-hidden="true">
        <div className="login-hero-badge">Welcome</div>
        <h2>Manage team expenses smarter.</h2>
        <p>Your trip budgets, approvals, and settlements in one place.</p>
        <div className="login-hero-figure">
          <div className="figure-head" />
          <div className="figure-body" />
          <div className="figure-phone" />
        </div>
      </section>

      <section className="login-form-wrap panel-pad stack-gap">
        <div className="login-brand-row">
          <div className="login-brand-mark" />
          <strong>TEMS</strong>
          <button className="btn btn-muted login-signup" type="button">
            Sign Up
          </button>
        </div>

        <div className="stack-gap">
          <h2>Sign in</h2>
          <p>Please login to continue to your account.</p>
        </div>

        <form className="stack-gap" onSubmit={handleSubmit}>
          <input
            className="input"
            type="email"
            placeholder="E-mail"
            value={form.email}
            onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
            required
          />
          <input
            className="input"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
            required
          />

          <div className="login-meta-row">
            <label className="login-remember">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Keep me signed in</span>
            </label>
            <button className="login-link-btn" type="button">
              Forgot Password?
            </button>
          </div>

          <button className="btn btn-primary login-submit" type="submit">
            Sign in
          </button>

          <div className="login-divider" role="presentation">
            <span>or</span>
          </div>

          <button className="btn btn-google login-submit" type="button" onClick={openGooglePicker}>
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path
                d="M21.35 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.23a4.48 4.48 0 0 1-1.94 2.94v2.44h3.14c1.84-1.7 2.92-4.2 2.92-7.39z"
                fill="#4285F4"
              />
              <path
                d="M12 22c2.63 0 4.84-.87 6.46-2.36l-3.14-2.44c-.87.58-1.99.93-3.32.93-2.55 0-4.72-1.72-5.49-4.03H3.27v2.52A9.76 9.76 0 0 0 12 22z"
                fill="#34A853"
              />
              <path
                d="M6.51 14.1a5.87 5.87 0 0 1 0-3.72V7.86H3.27a9.75 9.75 0 0 0 0 8.76l3.24-2.52z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.87c1.43 0 2.72.49 3.73 1.46l2.8-2.8A9.4 9.4 0 0 0 12 2 9.76 9.76 0 0 0 3.27 7.86l3.24 2.52C7.28 7.59 9.45 5.87 12 5.87z"
                fill="#EA4335"
              />
            </svg>
            <span>Sign in with Google</span>
          </button>
        </form>
      </section>

      <Modal open={googlePickerOpen} title="Choose Google Account" onClose={() => setGooglePickerOpen(false)}>
        <div className="stack-gap">
          <p>Continue with one of your saved accounts or add another email.</p>

          <div className="google-account-list stack-gap">
            {knownGoogleEmails.length ? (
              knownGoogleEmails.map((email) => (
                <button
                  key={email}
                  type="button"
                  className="google-account-btn"
                  onClick={() => handleGoogleEmailPick(email)}
                >
                  <span className="google-account-avatar">{email.charAt(0).toUpperCase()}</span>
                  <span>{email}</span>
                </button>
              ))
            ) : (
              <div className="content-card panel-pad">No saved Google accounts yet.</div>
            )}
          </div>

          <form className="stack-gap" onSubmit={handleAddGoogleEmail}>
            <input
              className="input"
              type="email"
              placeholder="Add another email"
              value={newGoogleEmail}
              onChange={(e) => setNewGoogleEmail(e.target.value)}
            />
            <div className="row-gap">
              <button className="btn btn-primary" type="submit">
                Add Another Email
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default LoginPage;

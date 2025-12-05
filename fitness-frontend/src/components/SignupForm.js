import React, { useState } from 'react';

const SignupForm = ({ onSubmit, onSuccess }) => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    weight: '',
    height: '',
    goal: 'weightloss', // Default value
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    // Convert numbers to correct type for API
    const dataToSend = {
      ...form,
      weight: parseFloat(form.weight) || null,
      height: parseFloat(form.height) || null,
    };

    try {
      await onSubmit(dataToSend);
      setSuccess('Signup successful! Redirecting to login...');
      setForm({ name: '', email: '', password: '', weight: '', height: '', goal: 'weightloss' });
      setTimeout(() => {
        if (onSuccess) onSuccess();
      }, 2000);
    } catch (error) {
      const errorMsg = typeof error === 'string' ? error : error?.message || 'Signup failed';
      setError(errorMsg);
      console.error('Signup form error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error" style={{marginBottom: '1rem'}}>{error}</div>}
      {success && <div className="success" style={{marginBottom: '1rem', backgroundColor: '#d4edda', color: '#155724', padding: '1rem', borderRadius: '5px', border: '1px solid #c3e6cb'}}>{success}</div>}
      <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
      <h3>Fitness Profile (Optional)</h3>
      <input type="number" name="weight" placeholder="Weight (kg)" value={form.weight} onChange={handleChange} />
      <input type="number" name="height" placeholder="Height (cm)" value={form.height} onChange={handleChange} />
      <select name="goal" value={form.goal} onChange={handleChange}>
        <option value="weightloss">Weight Loss</option>
        <option value="fatloss">Fat Loss</option>
        <option value="musclebuilding">Muscle Building</option>
      </select>
      <button type="submit" disabled={loading}>
        {loading ? 'Signing up...' : 'Sign Up'}
      </button>
    </form>
  );
};

export default SignupForm;
// components/EmailForm.js
import { useState } from 'react';

const EmailForm = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/save-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        console.log('Email saved successfully');
      } else {
        console.error('Failed to save email');
      }
    } catch (error) {
      console.error('Error saving email:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Save Email</button>
    </form>
  );
};

export default EmailForm;

import { useRef, useState } from 'react';
import { GoMail } from 'react-icons/go';
import { BsArrowRight } from 'react-icons/bs';

export default function NewsLetterSignUpForm() {
  const inputRef = useRef(null);
  const [isSubscribed, setIsSubscribed] = useState(false); // Track subscription status
  const [isAlreadySubscribed, setIsAlreadySubscribed] = useState(false); // Track if email is already subscribed
  const [error, setError] = useState(''); // Track subscription error
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  const subscribeUser = async (e) => {
    e.preventDefault();

    setIsLoading(true); // Set loading state while fetch is in progress

    // this is where your mailchimp request is made
    const res = await fetch('/api/subscribeUser', {
      body: JSON.stringify({
        email: inputRef.current.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    setIsLoading(false); // Reset loading state after fetch is complete

    if (res.ok) {
      const data = await res.json();
      if (data.error === 'Email is already subscribed') {
        setIsAlreadySubscribed(true);
        setError('');
      } else if (data.error === '') {
        setIsSubscribed(true);
        setError('');
      } else {
        setError(data.error);
        setIsSubscribed(false);
        setIsAlreadySubscribed(false);
      }
    } else {
      setError('There was an error subscribing to the newsletter.');
      setIsSubscribed(false);
      setIsAlreadySubscribed(false);
    }
  };

  return (
    <>
      <form onSubmit={subscribeUser} className='gpt-waitlist-form'>
        <input
          className='gpt-waitlist-input'
          type="email"
          id="email-input"
          name="email"
          placeholder="Enter Your Email..."
          ref={inputRef}
          required
          autoCapitalize="off"
          autoCorrect="off"
        />
        <GoMail className='gpt-div-mail-icon' />
        <button type="submit" value="" name="subscribe" className='gpt-waitlist-input-btn'>
          Join Waitlist <BsArrowRight className='gpt-btn-arrow' />
        </button>
      </form>

      {/* Conditional rendering of the loading spinner */}
      {isLoading && <div className="loading-spinner">Loading...</div>}

      {/* Conditional rendering of the thank you message */}
      {isSubscribed && <p>Thank you for subscribing!</p>}
      {isAlreadySubscribed && <p>You are already subscribed!</p>}
      {error && <p>{error}</p>}
    </>
  );
}

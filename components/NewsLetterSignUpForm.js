import { useRef, useState } from 'react';
import { GoMail } from 'react-icons/go';
import { BsArrowRight } from 'react-icons/bs';

export default function NewsLetterSignUpForm() {
  const formRef = useRef(null);
  const [isSubscribed, setIsSubscribed] = useState(false); // Track subscription status
  const [isAlreadySubscribed, setIsAlreadySubscribed] = useState(false); // Track if email is already subscribed
  const [error, setError] = useState(''); // Track subscription error
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  const subscribeUser = async (e) => {
    e.preventDefault();
    formRef.current.reset(); // Reset the form using the ref
  
    setIsLoading(true);
    setIsSubscribed(true);
  
    // Reset setIsSubscribed to false after 3 seconds
    setTimeout(() => {
      setIsSubscribed(false);
    }, 3000); // 3000 milliseconds = 3 seconds
  
    setIsLoading(false);
  };
  return (
    <>
      <form onSubmit={subscribeUser} ref={formRef} className='gpt-waitlist-form'>
        <input
          className='gpt-waitlist-input'
          type="email"
          id="email-input"
          name="email"
          placeholder="Enter Your Email..."
          // ref={inputRef}
          required
          autoCapitalize="off"
          autoCorrect="off"
        />
        <GoMail className='gpt-div-mail-icon' />
        <button type="submit" value="" name="subscribe" className='gpt-waitlist-input-btn'>
          Join
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

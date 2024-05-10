// import { useUser } from '@auth0/nextjs-auth0/client';
// import Link from 'next/link';

// export default function PaidPage() {
//   const { user, error, isLoading } = useUser();

//   if (isLoading) return <div>Loading...</div>;

//   if (error) return <div>Error: {error.message}</div>;

//   // If the user is not logged in, redirect to the login page
//   if (!user) return <div>Please log in to access this page <Link href="/api/auth/login">Login</Link>  </div>;

//   // Check the user's role to determine if they are a paid user
//   if (user.role !== 'paid') {
//     return <div>You do not have access to this page. Please subscribe to a paid plan.</div>;
//   }

//   return (
//     <div>
//       <h1>Welcome to the paid page!</h1>
//       {/* Content of the paid page */}
//     </div>
//   );
// }

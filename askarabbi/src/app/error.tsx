'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif', direction: 'rtl' }}>
      <h2>אופס! משהו השתבש</h2>
      <p>אנחנו מצטערים, אירעה שגיאה בלתי צפויה בצד השרת.</p>
      <p>ניתן לנסות <button onClick={() => reset()} style={{color: 'blue', textDecoration: 'underline', background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: 'inherit', fontSize: 'inherit'}}>לרענן את הדף</button> או לחזור ל<Link href="/"><a>דף הבית</a></Link>.</p>
      <p style={{ fontSize: '2rem', marginTop: '20px' }}>🛠️📜</p>
      {error?.digest && <p style={{fontSize: '0.8rem', color: 'grey'}}>מזהה שגיאה: {error.digest}</p>}
    </div>
  );
} 
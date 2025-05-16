import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif', direction: 'rtl' }}>
      <h1>404 - דף לא נמצא</h1>
      <p>מצטערים, הדף שחיפשת אינו קיים.</p>
      <p>אולי תרצה לחזור ל<Link href="/"><a>דף הבית</a></Link> או לשאול <Link href="/ask"><a>שאלה חדשה</a></Link>?</p>
      <p style={{ fontSize: '4rem', marginTop: '30px' }}>🕍</p>
    </div>
  );
} 
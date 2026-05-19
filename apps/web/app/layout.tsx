import './globals.css';
import { Providers } from './providers';

export const metadata = {
  title: 'Secure Attendance Console',
  description: 'Enterprise dashboard for attendance verification and fraud monitoring.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

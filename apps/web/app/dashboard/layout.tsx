'use client';

import { PageChrome } from '../../components/console-ui';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageChrome>{children}</PageChrome>
  );
}


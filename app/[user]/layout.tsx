interface Props {
  children: React.ReactNode;
  params: Promise<{ user: string }>;
}

export default async function UserLayout({ children, params }: Props) {
  const { user } = await params;

  // User pages use rose-pine as default since we don't have per-user themes
  return (
    <div
      data-theme="rose-pine"
      data-font="geist-mono"
      className="min-h-screen bg-[var(--bg)]"
      style={{ fontFamily: 'var(--font-body)' }}
    >
      {children}
    </div>
  );
}

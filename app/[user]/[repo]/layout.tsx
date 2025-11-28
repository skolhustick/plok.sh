import { getRepoConfig, DEFAULT_CONFIG } from '@/lib/config';
import { resolveTheme, resolveFont } from '@/lib/themes';

interface Props {
  children: React.ReactNode;
  params: Promise<{ user: string; repo: string }>;
}

export default async function RepoLayout({ children, params }: Props) {
  const { user, repo } = await params;
  
  const configResult = await getRepoConfig(user, repo);
  const config = configResult.ok ? configResult.value.config : DEFAULT_CONFIG;
  
  const theme = resolveTheme(config.theme);
  const font = resolveFont(config.font);

  return (
    <div
      data-theme={theme}
      data-font={font}
      className="min-h-screen bg-[var(--bg)]"
      style={{ fontFamily: 'var(--font-body)' }}
    >
      {children}
    </div>
  );
}

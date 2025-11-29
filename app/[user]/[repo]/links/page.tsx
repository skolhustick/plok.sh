import { Shell } from '@/components/Shell';
import { LinksPage } from '@/components/LinksPage';
import { getLinksConfig } from '@/lib/links';
import { getRepoConfig, DEFAULT_CONFIG } from '@/lib/config';

interface Props {
  params: Promise<{ user: string; repo: string }>;
}

export const revalidate = 300; // 5 minutes

export async function generateMetadata({ params }: Props) {
  const { user, repo } = await params;
  const [configResult, linksConfig] = await Promise.all([
    getRepoConfig(user, repo),
    getLinksConfig(user, repo),
  ]);
  
  const config = configResult.ok ? configResult.value.config : DEFAULT_CONFIG;
  const title = linksConfig.title || 'Links';

  return {
    title: `${title} - ${config.title || repo} - plok.sh`,
    description: linksConfig.description || `Links from ${user}/${repo}`,
  };
}

export default async function LinksRoutePage({ params }: Props) {
  const { user, repo } = await params;

  const [configResult, linksConfig] = await Promise.all([
    getRepoConfig(user, repo),
    getLinksConfig(user, repo),
  ]);

  const config = configResult.ok ? configResult.value.config : DEFAULT_CONFIG;

  return (
    <Shell
      breadcrumbs={[
        { label: user, href: `/${user}` },
        { label: repo, href: `/${user}/${repo}` },
        { label: 'links' },
      ]}
      customerGaId={config?.ga_id ?? undefined}
      noWrapper
    >
      <div className="max-w-md mx-auto px-6 py-12">
        <LinksPage
          title={linksConfig.title}
          description={linksConfig.description}
          links={linksConfig.links}
          user={user}
          repo={repo}
        />
      </div>
    </Shell>
  );
}

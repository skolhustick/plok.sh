import { Shell } from '@/components/Shell';
import { TerminalLoaderWave } from '@/components/TerminalLoader';

export default function RepoLoading() {
  return (
    <Shell noWrapper>
      <TerminalLoaderWave />
    </Shell>
  );
}

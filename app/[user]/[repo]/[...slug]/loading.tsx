import { Shell } from '@/components/Shell';
import { TerminalLoaderWave } from '@/components/TerminalLoader';

export default function PostLoading() {
  return (
    <Shell noWrapper>
      <TerminalLoaderWave />
    </Shell>
  );
}

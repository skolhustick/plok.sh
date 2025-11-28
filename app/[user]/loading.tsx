import { Shell } from '@/components/Shell';
import { TerminalLoaderWave } from '@/components/TerminalLoader';

export default function UserLoading() {
  return (
    <Shell noWrapper>
      <TerminalLoaderWave />
    </Shell>
  );
}

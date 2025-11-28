export const THEME_LIST = [
  'github-light',
  'github-dark',
  'one-dark',
  'gruvbox-dark',
  'gruvbox-light',
  'solarized-dark',
  'solarized-light',
  'nord',
  'dracula',
  'tokyo-night',
  'monokai',
  'rose-pine',
  'rose-pine-moon',
  'rose-pine-dawn',
] as const;

export type ThemeName = (typeof THEME_LIST)[number];

export const FONT_LIST = ['system', 'inter', 'jetbrains', 'geist-mono'] as const;

export type FontName = (typeof FONT_LIST)[number];

export const DEFAULT_THEME: ThemeName = 'rose-pine';
export const DEFAULT_FONT: FontName = 'geist-mono';

/**
 * Resolve theme name with fallback to default
 */
export function resolveTheme(input: string | undefined | null): ThemeName {
  if (input && THEME_LIST.includes(input as ThemeName)) {
    return input as ThemeName;
  }
  return DEFAULT_THEME;
}

/**
 * Resolve font name with fallback to default
 */
export function resolveFont(input: string | undefined | null): FontName {
  if (input && FONT_LIST.includes(input as FontName)) {
    return input as FontName;
  }
  return DEFAULT_FONT;
}

/**
 * Map blog theme to Shiki theme name
 */
export function mapThemeToShikiTheme(themeName: ThemeName): string {
  const mapping: Record<ThemeName, string> = {
    'github-light': 'github-light',
    'github-dark': 'github-dark',
    'one-dark': 'one-dark-pro',
    'gruvbox-dark': 'vitesse-dark',
    'gruvbox-light': 'vitesse-light',
    'solarized-dark': 'solarized-dark',
    'solarized-light': 'solarized-light',
    nord: 'nord',
    dracula: 'dracula',
    'tokyo-night': 'tokyo-night',
    monokai: 'monokai',
    'rose-pine': 'rose-pine',
    'rose-pine-moon': 'rose-pine-moon',
    'rose-pine-dawn': 'rose-pine-dawn',
  };
  return mapping[themeName] || 'github-dark';
}

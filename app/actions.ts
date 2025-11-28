'use server';

import { revalidatePath } from 'next/cache';

export async function refreshUserPage(username: string) {
  revalidatePath(`/${username}`);
}

export async function refreshRepoPage(username: string, repo: string) {
  revalidatePath(`/${username}/${repo}`);
}

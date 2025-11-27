import type { Result, ResultOk, ResultErr, ErrorCode } from '@/types/blog';

export function ok<T>(value: T): ResultOk<T> {
  return { ok: true, value };
}

export function err(
  code: ErrorCode,
  message: string,
  meta?: Record<string, unknown>
): ResultErr {
  return {
    ok: false,
    error: { code, message, meta },
  };
}

export function isOk<T>(result: Result<T>): result is ResultOk<T> {
  return result.ok;
}

export function isErr<T>(result: Result<T>): result is ResultErr {
  return !result.ok;
}

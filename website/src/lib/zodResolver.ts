import type { Resolver } from "react-hook-form";

interface ParsableSchema<TOutput> {
  parseAsync(data: unknown): Promise<TOutput>;
}

// Zod v4 compatible resolver for react-hook-form
export function zodResolver<T extends Record<string, unknown>>(
  schema: ParsableSchema<T>,
): Resolver<T> {
  return async (values) => {
    try {
      const data = await schema.parseAsync(values);
      return { values: data, errors: {} };
    } catch (error: unknown) {
      const issues =
        (error as { issues?: unknown[] })?.issues ??
        (error as { errors?: unknown[] })?.errors;

      if (Array.isArray(issues)) {
        const fieldErrors: Record<string, { message: string; type: string }> =
          {};
        for (const issue of issues as Array<{
          path: Array<string | number>;
          message: string;
          code: string;
        }>) {
          const path = issue.path.join(".") || "root";
          if (!fieldErrors[path]) {
            fieldErrors[path] = { message: issue.message, type: issue.code };
          }
        }
        return { values: {} as T, errors: fieldErrors };
      }

      throw error;
    }
  };
}

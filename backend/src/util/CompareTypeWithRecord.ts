export function CompareTypeWithRecord<T>(
  type: T,
  record: Record<keyof T, any>,
): void {
  for (const key in record) {
    if (!(key in (type as object))) {
      throw new Error(`Field '${key}' is not present in the type.`);
    }
  }
}

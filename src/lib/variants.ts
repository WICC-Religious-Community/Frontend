/**
 * Minimal, dependency-free variant builder (a small `class-variance-authority`
 * equivalent) so components get type-safe variant props without adding a
 * runtime dependency.
 */

type VariantSet = Record<string, Record<string, string>>;

type VariantSelection<T extends VariantSet> = {
  [K in keyof T]?: keyof T[K];
};

interface CvaConfig<T extends VariantSet> {
  base?: string;
  variants: T;
  defaultVariants?: VariantSelection<T>;
  compoundVariants?: Array<VariantSelection<T> & { className: string }>;
}

export function cva<T extends VariantSet>(config: CvaConfig<T>) {
  return (props?: VariantSelection<T> & { className?: string }): string => {
    const classes: string[] = [];
    if (config.base) classes.push(config.base);

    for (const key in config.variants) {
      const group = config.variants[key];
      const selected = (props?.[key] ?? config.defaultVariants?.[key]) as
        | string
        | undefined;
      if (selected && group[selected]) classes.push(group[selected]);
    }

    if (config.compoundVariants) {
      for (const { className, ...rules } of config.compoundVariants) {
        const ruleEntries = rules as unknown as VariantSelection<T>;
        const matches = (Object.keys(ruleEntries) as Array<keyof T>).every((key) => {
          const selected = props?.[key] ?? config.defaultVariants?.[key];
          return selected === ruleEntries[key];
        });
        if (matches) classes.push(className);
      }
    }

    if (props?.className) classes.push(props.className);
    return classes.join(" ");
  };
}

export type VariantProps<T extends (...args: never[]) => string> = Omit<
  NonNullable<Parameters<T>[0]>,
  "className"
>;

import meta from "./imageMeta.json";

type Meta = Record<string, { ar: number; lqip: string }>;
const imageMeta = meta as Meta;

export function aspect(name: string) {
  return imageMeta[name]?.ar ?? 1.5;
}

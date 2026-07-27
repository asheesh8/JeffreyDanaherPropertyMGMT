export const VIEWS = [
  { id: "home", n: "01", label: "Index" },
  { id: "services", n: "02", label: "Services" },
  { id: "about", n: "03", label: "About" },
  { id: "work", n: "04", label: "Work" },
  { id: "contact", n: "05", label: "Contact" },
] as const;

export type ViewId = (typeof VIEWS)[number]["id"];

export const isViewId = (v: string): v is ViewId => VIEWS.some((x) => x.id === v);

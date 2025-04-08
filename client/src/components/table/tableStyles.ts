export type Column = {
  id: "name" | "location" | "adress" | "phone" ;
  label: string;
  backgroundColor?: string;
  align?: "right";
  format?: (value: number) => string;
};

export const columns: readonly Column[] = [
  {
    id: "name",
    label: "Name",
    backgroundColor: "var(--background-color)",
  },
  {
    id: "location",
    label: "location",
    backgroundColor: "var(--background-color)",
  },
  
  {
    id: "adress",
    label: "adress",
    align: "right",
    backgroundColor: "var(--background-color)",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "phone",
    label: "phone",
    align: "right",
    backgroundColor: "var(--background-color)",
    format: (value: number) => value.toFixed(2),
  },
];

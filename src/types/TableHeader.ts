export type TableHeadType = {
  title: string;
  key: string;
  align?: "left" | "right" | "center";
  sortable?: boolean;
  sortKey?: string;
};
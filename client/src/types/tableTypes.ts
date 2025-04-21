export type TableContentProps<T> = {
  data: T[];
  headers: { name: string; label: string }[];
  onEdit: (item: T) => void;
  onDelete: (_id: string) => void;
};

export type HeaderProps = {
  data: { name: string; label: string }[];
};

export type TContainerProps<T extends { _id: string }> = {
  data: T[];
  headers: { name: string; label: string }[];
  onEdit: (item: T) => void;
  onDelete: (_id: string) => void;
};

export type TablePaginationComponentProps = {
  currentPage: number;
  numOfPages: number;
  handlePageChange: (
    event: React.ChangeEvent<unknown>,
    newPage: number
  ) => void;
};

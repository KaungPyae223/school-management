const TableHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <thead>
      <tr className="border-b ">{children}</tr>
    </thead>
  );
};

export default TableHeader;

interface TableRowProps {
  children: React.ReactNode;
}

const TableRow = ({ children }: TableRowProps) => {
  return (
    <tr className="hover:bg-muted transition-colors group">
      {children}
    </tr>
  );
};

export default TableRow;

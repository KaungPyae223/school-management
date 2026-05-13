import { Card, CardContent } from "../ui/card";

const Table = ({ children }: { children: React.ReactNode }) => {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-0">
        <div className="relative overflow-x-auto">
          <table className="w-full overflow-x-auto text-sm">{children}</table>
        </div>
      </CardContent>
    </Card>
  );
};

export default Table;

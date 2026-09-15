import { ScrollArea } from "../../../../components/ui/scroll-area";
import DashboardCard from "../../../../components/card-utils/DashboardCard";
import { CardContent, CardFooter } from "../../../../components/ui/card";
import { BookOpen } from "lucide-react";
import { Button } from "../../../../components/ui/button";
import { useNavigate } from "react-router-dom";
import DataShow from "../../../../components/data/DataShow";
import DashboardTodayClassesCard from "./DashboardTodayClassesCard";

const DashboardTodayClassesContainer = ({ data }: { data: any }) => {
  const navigate = useNavigate();

  return (
    <DashboardCard
      title={"Today's Schedule"}
      description={"Active classes scheduled for today"}
    >
      <DataShow
        isLoading={false}
        dataLength={1}
        emptyTitle="No today's classes"
        emptyDescription="There are no classes scheduled for today"
        emptyIcon={BookOpen}
        className="border-0 shadow-none ring-0"
      >
        <CardContent className="p-0 flex-1">
          <ScrollArea className="h-96 px-4 pb-0">
            <div className="space-y-3 ">
              {data.map((item: any) => (
                <DashboardTodayClassesCard data={item} key={item.id} />
               
              ))}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="py-2.5 mt-auto text-xs flex justify-around text-center items-center">
          <Button
            onClick={() => navigate("/timetable")}
            size="sm"
            className="w-full "
            variant="outline"
          >
            Open Full Timetable View
          </Button>
        </CardFooter>
      </DataShow>
    </DashboardCard>
  );
};

export default DashboardTodayClassesContainer;

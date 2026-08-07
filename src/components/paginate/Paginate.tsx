import { useTranslation } from "react-i18next";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import type { ResponseDataType } from "../../types/ResponseTypes";
import { useSetQueryParams } from "../../hooks/use-set-query-params";
import { Card, CardContent } from "../ui/card";
import { cn } from "../../lib/utils";

interface Props {
  meta: ResponseDataType["meta"];
}

const Paginate: React.FC<Props> = ({ meta }) => {
  const { t, i18n } = useTranslation();

  const isMyanmar = i18n.language === "my";

  const start = meta?.page * meta?.limit - meta?.limit + 1;
  const end =
    meta?.page * meta?.limit < meta?.total_data
      ? meta?.page * meta?.limit
      : meta?.total_data;

  let startPage = Math.max(meta?.page - 2, 1);
  const endPage = Math.min(startPage + 5, meta?.total_pages);
  if (endPage - startPage < 5) {
    startPage = Math.max(endPage - 5, 1);
  }

  const pages = [];

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  const updateQueryParams = useSetQueryParams();

  const changePage = (page: number) => {
    updateQueryParams({
      page: page,
    });
  };

  return (
    <Card className="shadow-sm">
      <CardContent className="flex flex-col-reverse gap-4 px-6 md:flex-row items-center md:justify-between">
        {/* Page info */}
        <div className="flex items-center gap-4">
          {isMyanmar ? (
            <div className="text-sm text-muted-foreground flex items-center ">
              စုစုပေါင်း{" "}
              <span className="mx-1 font-medium text-foreground">
                {meta?.total_data}
              </span>{" "}
              ခုအနက်{" "}
              <span className="mx-1 font-medium text-foreground">{start}</span>{" "}
              မှ <span className="mx-1 font-medium text-foreground">{end}</span>{" "}
              အထိ
            </div>
          ) : (
            <div className="text-sm text-muted-foreground flex items-center ">
              {t("pagination.showing")}
              <span className="mx-1 font-medium text-foreground">{start}</span>
              {t("pagination.to")}
              <span className="mx-1 font-medium text-foreground">{end}</span>
              {t("pagination.of")}
              <span className="mx-1 font-medium text-foreground">
                {meta?.total_data}
              </span>
              {t("pagination.results")}
            </div>
          )}
          <div className="min-h-5 hidden sm:block border-l-2 border-l-gray-400" />
          <div className=" py-1.5 sm:flex items-center gap-2 hidden">
            <p className="text-sm text-muted-foreground whitespace-nowrap">
              {t("pagination.rowsPerPage")}
            </p>
            <Select
              onValueChange={(e) =>
                updateQueryParams({
                  limit: Number(e),
                  page: 1,
                })
              }
              defaultValue={meta?.limit.toString()}
            >
              <SelectTrigger size="sm">
                <SelectValue placeholder={t("pagination.limit")} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{t("pagination.limit")}</SelectLabel>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                  <SelectItem value="100">100</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Pagination */}
        {meta?.total_pages != 1 && (
          <Pagination>
            <PaginationContent className="md:ms-auto">
              {meta?.page != 1 && (
                <PaginationItem onClick={() => changePage(meta?.page - 1)}>
                  <PaginationPrevious
                    size="sm"
                    className="hover:bg-primary/10 rounded-lg cursor-pointer"
                  />
                </PaginationItem>
              )}

              <PaginationItem className="space-x-1.5">
                {pages.map((page) => (
                  <PaginationLink
                    size="sm"
                    key={page}
                    onClick={() => changePage(page)}
                    isActive={meta?.page === page}
                    className={cn(
                      page === meta?.page
                        ? "bg-primary hover:bg-primary/80 hover:text-primary-foreground text-primary-foreground"
                        : "hover:bg-primary/10 cursor-pointer",
                    )}
                  >
                    {page}
                  </PaginationLink>
                ))}
              </PaginationItem>

              {meta?.page != meta?.total_pages && (
                <PaginationItem onClick={() => changePage(meta?.page + 1)}>
                  <PaginationNext
                    size="sm"
                    href="#"
                    className="hover:bg-primary/10 rounded-lg cursor-pointer"
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        )}
      </CardContent>
    </Card>
  );
};

export default Paginate;

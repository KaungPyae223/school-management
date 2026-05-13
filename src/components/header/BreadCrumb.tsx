import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import useBreadCrumbStore from "../../stores/useBreadCrumbStroe";
import React from "react";
import { AnimatePresence, m } from "framer-motion";

const BreadCrumb = () => {
  const { params } = useBreadCrumbStore();

  return (
    <AnimatePresence >
      {params.length > 0 && (
        <m.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2.5"
        >
          {params.length > 0 && (
            <div className="h-4 w-px bg-accent-foreground/40" />
          )}
          <Breadcrumb>
            <BreadcrumbList>
              {params.map((param, index) => {
                const isLast = index === params.length - 1;
                return (
                  <React.Fragment key={index}>
                    <BreadcrumbItem>
                      {isLast ? (
                        <BreadcrumbPage>{param.name}</BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink href={param.link}>
                          {param.name}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                    {!isLast && <BreadcrumbSeparator />}
                  </React.Fragment>
                );
              })}
            </BreadcrumbList>
          </Breadcrumb>
        </m.div>
      )}
    </AnimatePresence>
  );
};

export default BreadCrumb;

import { useEffect } from "react";
import useBreadCrumbStore from "../stores/useBreadCrumbStroe";

const useAddBreadcrumb = ({
  title = "",
  params = [],
}: {
  title?: string;
  params?: { name: string; link: string }[];
}) => {
  const { setTitle, setParams } = useBreadCrumbStore();

  useEffect(() => {
    setTitle(title || "");
    setParams(params || []);
  }, [title, params, setTitle, setParams]);
};

export default useAddBreadcrumb;

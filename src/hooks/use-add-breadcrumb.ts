import { useEffect } from "react";
import useBreadCrumbStore from "../stores/useBreadCrumbStroe";
import { useTranslation } from "react-i18next";

const useAddBreadcrumb = ({
  title = "",
  params = [],
}: {
  title?: string;
  params?: { name: string; link: string }[];
}) => {
const { setTitle, setParams } = useBreadCrumbStore();
  const { t } = useTranslation();

  useEffect(() => {
    setTitle(title || "");
    setParams(params || []);
  }, [setTitle, setParams, t]);
};

export default useAddBreadcrumb;

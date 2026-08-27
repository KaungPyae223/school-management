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
  const { i18n } = useTranslation();

  useEffect(() => {
    setTitle(title || "");
    setParams(params || []);
  }, [setTitle, setParams, i18n.language]);
};

export default useAddBreadcrumb;

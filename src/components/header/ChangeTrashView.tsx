import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router";
import { useSetQueryParams } from "../../hooks/use-set-query-params";
import { Button } from "../ui/button";
import { Archive, Trash2 } from "lucide-react";

const ChangeTrashView = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  const isTrashView = searchParams.get("trash");
  const updateParams = useSetQueryParams();

  const toggleTrashView = () => {
    if (isTrashView) {
      updateParams({ trash: null });
    } else {
      updateParams({ trash: true });
    }
  };

  return (
    <Button
      variant={isTrashView ? "destructive" : "outline"}
      onClick={toggleTrashView}
      className="gap-2"
    >
      {isTrashView ? (
        <>
          <Archive className="w-4 h-4" /> {t("general.normalView")}
        </>
      ) : (
        <>
          <Trash2 className="w-4 h-4" /> {t("general.trash")}
        </>
      )}
    </Button>
  );
};

export default ChangeTrashView;

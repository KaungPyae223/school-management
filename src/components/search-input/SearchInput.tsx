import { useTranslation } from "react-i18next";
import { Search } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { useSetQueryParams } from "../../hooks/use-set-query-params";
import { useSearchParams } from "react-router";
import { useState, useEffect, useMemo } from "react";
import { debounce } from "lodash";

const SearchInput = () => {
  const { t } = useTranslation();

  const updateQueryParams = useSetQueryParams();
  const [searchParams] = useSearchParams();

  const currentSearch = searchParams.get("search") ?? "";

  const [searchTerm, setSearchTerm] = useState<string>(currentSearch);

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        updateQueryParams({ search: value });
      }, 750),
    [updateQueryParams],
  );

  useEffect(() => {
    if (currentSearch !== searchTerm) {
      debouncedSearch(searchTerm);
    }

    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm]);

  return (
    <InputGroup className="max-w-xs" data-tour="search">
      <InputGroupInput
        placeholder={t("general.searchPlaceholder")}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <InputGroupAddon>
        <Search />
      </InputGroupAddon>
    </InputGroup>
  );
};

export default SearchInput;

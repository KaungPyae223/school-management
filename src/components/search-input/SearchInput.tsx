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

const SearchInput = ({
  searchParam = "search",
  placeholder = "Search...",
}: {
  searchParam?: string;
  placeholder?: string;
}) => {
  const updateQueryParams = useSetQueryParams();
  const [searchParams] = useSearchParams();

  const currentSearch = searchParams.get(searchParam) ?? "";

  const [searchTerm, setSearchTerm] = useState<string>(currentSearch);

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        updateQueryParams({ [searchParam]: value });
      }, 750),
    [],
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
    <InputGroup className="max-w-xs">
      <InputGroupInput
        placeholder={placeholder}
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

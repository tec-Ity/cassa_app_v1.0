import React, { useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SearchInput from "./SearchInput";
import { getObjects, selectQuery, setQuery } from "../../redux/fetchSlice";
export default function SearchComp({
  fetchObjs,
  placeholder,
  style = {
    borderColor: null,
    borderColorHover: null,
    borderColorFocused: null,
  },
  realTime = false,
  onSelect,
}) {
  const dispatch = useDispatch();
  const query = useSelector(selectQuery(fetchObjs.flag));
  const [selected, setSelected] = React.useState(false);
  const searchParam = useMemo(
    () => fetchObjs.searchParam || "search",
    [fetchObjs.searchParam]
  );

  useEffect(() => {
    console.log("query", query);
    console.log("fetchObjs", fetchObjs);
    query && dispatch(getObjects({ fetchObjs }));
    onSelect && query && selected && onSelect(query[searchParam]);
  }, [dispatch, fetchObjs, query]);

  return (
    <SearchInput
      style={style}
      realTime={realTime}
      clearOnSelect={false}
      placeholder={placeholder}
      handleChange={(code, select) => {
        if (code && select) setSelected(true);
        else setSelected(false);
        //1 no code in search but has previouse search
        //2 has code provided
        if ((!code && query && query[searchParam]) || code)
          dispatch(
            setQuery({ fetchObjs, query: { [searchParam]: code || "" } })
          );
      }}
    />
  );
}

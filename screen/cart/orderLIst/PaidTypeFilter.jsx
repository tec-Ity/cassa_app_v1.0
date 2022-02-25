import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchObjs as fetchObjsPaidType } from "../../../config/module/setting/payment/type/paidTypeConf";
import { getObjects, selectObjects, setQuery } from "../../../redux/fetchSlice";
import CusFilter from "../../../component/filter/CusFilter";

export default function PaidTypeFilter({ fetchObjs }) {
  const dispatch = useDispatch();
  const paidTypes = useSelector(selectObjects(fetchObjsPaidType.flag));

  React.useEffect(() => {
    dispatch(getObjects({ fetchObjs: fetchObjsPaidType }));
  }, [dispatch]);

  const handleClick = React.useCallback(
    (id) => {
      console.log(id);
      dispatch(setQuery({ fetchObjs, query: { Paidtypes: [id] } }));
    },
    [dispatch, fetchObjs]
  );

  const items = React.useMemo(
    () =>
      paidTypes?.map((paidType) => ({
        content: paidType.code,
        handleClick: () => handleClick(paidType._id),
        hover: true,
      })),
    [handleClick, paidTypes]
  );
  console.log(paidTypes);
  return <CusFilter title="支付方式" items={items} />;
}

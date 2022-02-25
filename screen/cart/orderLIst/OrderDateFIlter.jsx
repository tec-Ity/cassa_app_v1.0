import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setQuery } from "../../../redux/fetchSlice";
import moment from "moment";

import CusFilter from "../../../component/filter/CusFilter";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Input, Text, ListItem, Icon, Button } from "react-native-elements";
import { View } from "react-native";

export default function OrderDateFilter({ fetchObjs }) {
  const dispatch = useDispatch();
  const [range, setRange] = useState({
    start: { date: new Date(), text: "" },
    end: { date: new Date(), text: "" },
  });
  const [showDatePicker, setShowDatePicker] = useState(null);

  const handleSelRange = () => {
    if (range.start.date && range.end.date) {
      const startDate = moment(range.start.date);
      const endDate = moment(range.end.date);
      if (
        startDate._isValid &&
        endDate._isValid &&
        startDate.isBefore(endDate)
      ) {
        dispatch(
          setQuery({
            fetchObjs,
            query: {
              upd_after: startDate.format("MM/DD/YYYY"),
              upd_before: endDate.format("MM/DD/YYYY"),
            },
          })
        );
      }
    }
  };

  const handleSelPeriod = React.useCallback(
    (period) => () => {
      // console.log(period);
      if (period > 0) {
        let curTime = new Date().getTime();
        let startDate = curTime - (period - 1) * 3600 * 24 * 1000;
        startDate = moment(startDate).format("MM/DD/YYYY");
        dispatch(
          setQuery({
            fetchObjs,
            query: { upd_after: startDate, upd_before: null },
          })
        );
      }
    },
    [dispatch, fetchObjs]
  );

  const handleInputChange = (type) => (text) => {
    let date = moment(text, "MM/DD/YYYY");
    // console.log(type, text, date, date._isValid);
    if (date._isValid) date = date.toDate();
    else date = new Date();
    setRange({ ...range, [type]: { date, text } });
  };

  const items = React.useMemo(
    () => [
      { content: "今日（默认）", handleClick: handleSelPeriod(1), hover: true },
      { content: "近一周", handleClick: handleSelPeriod(7), hover: true },
      { content: "近一个月", handleClick: handleSelPeriod(30), hover: true },
      { content: "近三个月", handleClick: handleSelPeriod(90), hover: true },
      {
        content: "范围日期",
        extraContent: (
          <View style={{ width: "100%", alignItems: "center" }}>
            <ListItem containerStyle={{ paddingTop: 0 }}>
              <Text>起始日期</Text>
              <Input
                value={range.start.text}
                placeholder="MM/DD/YYYY"
                rightIcon={
                  <Icon
                    name="event"
                    onPress={() => setShowDatePicker("start")}
                  />
                }
                containerStyle={{
                  width: "70%",
                  borderWidth: 1,
                  height: 50,
                }}
                inputStyle={{ width: "100%" }}
                onChangeText={handleInputChange("start")}
              />
            </ListItem>
            <ListItem containerStyle={{ paddingTop: 0 }}>
              <Text>结束日期</Text>
              <Input
                value={range.end.text}
                placeholder="MM/DD/YYYY"
                rightIcon={
                  <Icon name="event" onPress={() => setShowDatePicker("end")} />
                }
                containerStyle={{
                  width: "70%",
                  borderWidth: 1,
                  height: 50,
                }}
                inputStyle={{ width: "100%" }}
                onChangeText={handleInputChange("end")}
              />
            </ListItem>
            <Button
              title="确认"
              containerStyle={{ width: "80%" }}
              onPress={handleSelRange}
            />
          </View>
        ),
      },
    ],
    [handleSelPeriod, range]
  );
  return (
    <>
      <CusFilter title={"日期"} items={items} defaultSel={0} />
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={range[showDatePicker].date}
          mode={"date"}
          is24Hour={true}
          display="default"
          onChange={(e, date) => {
            date &&
              setRange({
                ...range,
                [showDatePicker]: {
                  date,
                  text: moment(date).format("MM/DD/YYYY"),
                },
              });
            setShowDatePicker(null);
          }}
        />
      )}
    </>
  );
}

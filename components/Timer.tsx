import { useFocusEffect } from "@react-navigation/core";
import React, { useCallback, useRef, useState } from "react";
import { View, Text, Dimensions } from "react-native";

interface Props {
  setTime?: Function;
}

const Timer = (props: Props) => {
  const [time, setTime] = useState<string>("");
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const mounted = useRef(false);
  //OVO GORE U STATE POTRPAJ BUDALETINO NE MOZE OVAKO WTF

  useFocusEffect(
    useCallback(() => {
      if (!mounted.current) {
        countTime();
        mounted.current = true;
      } else {
        countTime();
      }
    }, [time])
  );

  function countTime() {
    setTimeout(() => {
      setSeconds(seconds + 1);

      if (seconds === 60) {
        setSeconds(0);
        setMinutes(minutes + 1);
      }

      if (minutes === 60) {
        setMinutes(0);
        setHours(hours + 1);
      }

      const time = `${hours < 1 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes
      }:${seconds < 10 ? `0${seconds}` : seconds}`;

      setTime(time);

      props.setTime!(time);
    }, 1000);
  }

  return (
    <View style={{ marginTop: 15 }}>
      <Text style={{ textAlign: "center", fontSize: 30, fontWeight: "bold" }}>
        {time}
      </Text>
    </View>
  );
};

export default Timer;

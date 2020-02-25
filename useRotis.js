import React, { useState } from "react";
import { AsyncStorage } from "react-native";

const ctx = React.createContext({ current: null, rotis: [] });

const useStore = () => {
  const [current, setCurrent] = useState(null);
  const [rotis, setRotis] = useState([]);
  const [didInit, setDidInit] = useState(false);

  // bootstrap store
  async function wrap() {
    try {
      const storeCurrent = JSON.parse(await AsyncStorage.getItem("current"));
      const storeRotis = JSON.parse(await AsyncStorage.getItem("rotis"));

      if (storeCurrent !== null) {
        setCurrent(storeCurrent);
      }
      if (storeRotis.length) {
        setRotis(storeRotis);
      }
      setDidInit(true);
    } catch (error) {
      console.log("Error saving Roti: ", error);
    }
  }

  if (!didInit) {
    wrap();
  }

  // update storage on change
  React.useEffect(() => {
    async function wrap() {
      try {
        await AsyncStorage.setItem("current", JSON.stringify(current));
        await AsyncStorage.setItem("rotis", JSON.stringify(rotis));
      } catch (error) {
        console.log("Error saving Roti: ", error);
      }
    }

    wrap();
  }, [current, rotis]);

  return [{ current, rotis }, setCurrent, setRotis];
};

export const useRotis = () => React.useContext(ctx);

export const RotiProvider = ({ children }) => {
  const store = useStore();

  return <ctx.Provider value={store}>{children}</ctx.Provider>;
};

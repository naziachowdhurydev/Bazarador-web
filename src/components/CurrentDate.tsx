"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getClientDate = () =>
  new Date().toLocaleDateString("bn-BD", { dateStyle: "full" });
const getServerDate = () => "";

const CurrentDate = () => (
  <>{useSyncExternalStore(subscribe, getClientDate, getServerDate)}</>
);

export default CurrentDate;

import { useState, useContext, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { FormContext } from "@/lib/contexts/ApplyContext";

const DEVICE_ID_KEY = "@@TAMWEEL_USER_DEVICE_ID";

export const useUserIdentifiers = () => {
  const [deviceId, setDeviceId] = useState<string>(() => {
    // --- Device ID (localStorage) ---
    const stored = localStorage.getItem(DEVICE_ID_KEY);
    if (stored) return stored;
    const newId = uuidv4();
    localStorage.setItem(DEVICE_ID_KEY, newId);
    return newId;
  });

  return { deviceId };
};

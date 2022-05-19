import { useState, createContext, useMemo } from "react";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [createType, setCreateType] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const values = useMemo(
    () => ({
      createType,
      setCreateType,
      isCreating,
      setIsCreating,
      isEditing,
      setIsEditing,
    }),
    [
      createType,
      setCreateType,
      isCreating,
      setIsCreating,
      isEditing,
      setIsEditing,
    ]
  );

  return <ChatContext.Provider value={values}>{children}</ChatContext.Provider>;
};

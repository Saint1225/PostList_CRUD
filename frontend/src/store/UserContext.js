import { createContext } from "react";

export const UserContext = createContext({
  username: "",
  userId: 0,
  email: "",
  role: "",
});

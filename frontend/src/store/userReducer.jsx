import { useReducer } from "react";
import { UserContext } from "./UserContext.js";

const initialUserProfile = {
  username: "",
  userId: 0,
  email: "",
  role: "",
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE": {
      const userProfile = {
        username: action.username,
        userId: action.userId,
        email: action.email,
        role: action.role,
      };
      return userProfile;
    }
    case "LOGOUT":
      return initialUserProfile;
    default:
      return initialUserProfile;
  }
};

const UserProfileProvider = ({ children }) => {
  const [userProfile, dispatchUserProfile] = useReducer(
    userReducer,
    initialUserProfile
  );

  return (
    <UserContext.Provider value={{ ...userProfile, dispatchUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProfileProvider;

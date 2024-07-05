import { useEffect, useState } from "react";

const useRole = (authTokens: string | null) => {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (authTokens) {
      try {
        const tokens = JSON.parse(authTokens);
        const { access } = tokens;

        const tokenParts = access.split(".");
        if (tokenParts.length !== 3) {
          console.error("Invalid token format");
        } else {
          const encodedPayload = tokenParts[1];
          const decodedPayload = atob(encodedPayload);
          const payload = JSON.parse(decodedPayload);
          const { role } = payload;
          console.log("Role:", role);
          setRole(role);
        }
      } catch (error) {
        console.error("Error parsing authTokens:", error);
      }
    } else {
      console.error("No authTokens found in localStorage");
    }
  }, [authTokens]);

  return role;
};

export default useRole;

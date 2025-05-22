import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosinstance";
import { API_ENDPOINTS } from "../utils/apiPaths";
export const useUserAuth = () => {
  const { user, updateUser, clearUser } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) return;
    let isMounted = true;

    const fetchUserProfile = async () => {
      try {
        const response = await axiosInstance.get(
          API_ENDPOINTS.AUTH.GET_USER_INFO
        );
        if (isMounted) {
          const userData = response.data;
          updateUser(userData);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        if (isMounted) {
          // Redirect to login if user is not authenticated
          navigate("/login");
        }
      }
    };
    fetchUserProfile();
    return () => {
      isMounted = false; // Cleanup function to prevent state update on unmounted component
    };
  }, [updateUser, clearUser, navigate]);
};

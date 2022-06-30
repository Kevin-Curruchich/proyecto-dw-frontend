import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import AuthContext from "./auth-context";

const AuthProvider = (props) => {
  const [cookies, setCookie, removeCookie] = useCookies(["auth_token"]);
  const [currentUser, setCurrentUser] = useState({});
  const [bankAccounts, setBankAccounts] = useState([]);
  const [loadingUserInfo, setLoadingUserInfo] = useState(true);

  const register = (first_name, last_name, email, password) => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/register`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              email,
              password,
              first_name,
              last_name,
            }),
          }
        );
        response = await response.json();
        setCookie("auth_token", response.data.auth_token, {
          expires: new Date(2147483647 * 1000),
        });
        setCurrentUser(response.data);
        resolve(response);
      } catch (e) {
        reject(e);
      }
    });
  };

  const login = (email, password) => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              email,
              password,
            }),
          }
        );
        if (response.status === 200) {
          response = await response.json();
          setCookie("auth_token", response.data.auth_token, {
            expires: new Date(2147483647 * 1000),
          });
          setCurrentUser(response.data);
          resolve(response);
        }
        reject(response.status);
      } catch (e) {
        reject(e);
      }
    });
  };

  const logout = () => {
    return new Promise((resolve, reject) => {
      setCurrentUser({});
      setBankAccounts([]);
      removeCookie("auth_token");
      resolve();
    });
  };

  const refreshBankAccounts = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/getbankaccounts/${cookies.auth_token}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${cookies.auth_token}`,
            },
          }
        );
        let { bankAccounts } = await response.json();
        bankAccounts = bankAccounts.map((bank) => ({
          ...bank,
          VALUE: bank.BANK_ACCOUNT,
          TEXT: `${bank.BANK_ACCOUNT} - ${bank.BANK_NAME}`,
        }));
        setBankAccounts(bankAccounts);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };

  useEffect(() => {
    const getUserInfo = async () => {
      if (
        Object.entries(currentUser).length === 0 &&
        cookies.auth_token &&
        cookies.auth_token !== "undefined"
      ) {
        try {
          const response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/person_info`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${cookies.auth_token}`,
              },
              credentials: "include",
            }
          );
          const data = await response.json();
          data.data[0].auth_token = cookies.auth_token;
          setCurrentUser(data.data[0]);
        } catch (error) {
          console.log(error);
        }
      }
      setLoadingUserInfo(false);
    };
    getUserInfo();
  }, []);

  const authContext = {
    currentUser,
    register,
    login,
    logout,
    bankAccounts,
    refreshBankAccounts,
  };

  return (
    <AuthContext.Provider value={authContext}>
      {!loadingUserInfo && props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

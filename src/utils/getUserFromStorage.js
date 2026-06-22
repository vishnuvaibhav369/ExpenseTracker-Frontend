export const getUserFromStorage = () => {
    const token = JSON.parse(localStorage.getItem("userInfo") || null);
    return token?.token;
}

export const getUserInfoFromStorage = () => {
  return JSON.parse(
    localStorage.getItem("userInfo")
  );
};
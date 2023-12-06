export const getAccessToken = () => {
  const userToken = localStorage.getItem("userToken");
  return userToken;
};

export const getDefaultConfig = () => ({
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAuthenticationConfig = () => ({
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ` + getAccessToken(),
  },
});
// export const getSavedTrackList = async (): Promise<SavedTrackType[]> => {
//     const response = await fetch(`${BASE_URL}me/tracks`, getDefaultConfig())
//     const data = await response.json();
//     return data.items
// }

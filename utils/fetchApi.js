import axios from "axios";

export const baseUrl = "https://shazam-core.p.rapidapi.com";
export const baseUrl2 = "https://simple-youtube-search.p.rapidapi.com/search";

export const fetchApi = async (url, country = "") => {
  let parameters = {};
  const headers = {
    "x-rapidapi-host": "shazam-core.p.rapidapi.com",
    "x-rapidapi-key": "9edfaff019msh94fb7f8c1b28f7ap1620e4jsn70b9f6b9b6c6",
  };

  if (country) {
    parameters = {
      params: { country_code: country },
      headers: headers,
    };
  }

  if (!country) {
    parameters = {
      headers: headers,
    };
  }

  const { data } = await axios.get(url, parameters);

  return data;
};

export const fetchApiYoutube = async (url, myQuery) => {

  const { data } = await axios.get(url, {
    method: "GET",
    params: { query: myQuery, safesearch: "false" },
    headers: {
      "x-rapidapi-host": "simple-youtube-search.p.rapidapi.com",
      "x-rapidapi-key": "9edfaff019msh94fb7f8c1b28f7ap1620e4jsn70b9f6b9b6c6",
    },
  });

  return data;
};

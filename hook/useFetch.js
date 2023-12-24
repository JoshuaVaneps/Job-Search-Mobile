import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
// delete and change to api when done
// import { hardcodedData } from "./hardcodedData";
// couldnt get env variable to work
// import { RAPID_API_KEY } from "react-native-dotenv";
// const rapidApiKey = RAPID_API_KEY;

const useFetch = (endpoint, query) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const options = {
    method: "GET",
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,
    headers: {
      // real api key
      // "X-RapidAPI-Key": "f12646d3a5msh664721f90d182ecp1f28dcjsn80fb24eb1650",
      // test api key
      "X-RapidAPI-Key": "66bb145f18msh034d64a6615fbadp15de7fjsn0a5a7aec3499",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    params: {
      ...query,
    },
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Include params.id in the key when fetching data from AsyncStorage
      const cachedData = await AsyncStorage.getItem(
        `${endpoint}-${query.job_id}`
      );

      if (cachedData !== null) {
        const { data, timestamp } = JSON.parse(cachedData);

        // Check if the timestamp is more than a day old
        const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
        if (Date.now() - timestamp < oneDay) {
          // If the cached data is less than a day old, use it
          setData(data);
          setIsLoading(false);
          return;
        }
      }

      // If there is no cached data or it's more than a day old, fetch from the API
      const response = await axios.request(options);
      const apiData = response.data.data;
      setData(apiData);

      // Include params.id in the key when storing data in AsyncStorage
      await AsyncStorage.setItem(
        `${endpoint}-${query.job_id}`,
        JSON.stringify({ data: apiData, timestamp: Date.now() })
      );
    } catch (error) {
      setError(error);
      alert("there was an error fetching data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useFetch;

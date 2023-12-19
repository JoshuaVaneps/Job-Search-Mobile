import { useState, useEffect } from "react";
import axios from "axios";
// delete and change to api when done
import { hardcodedData } from "./hardcodedData";
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
      "X-RapidAPI-Key": "f12646d3a5msh664721f90d182ecp1f28dcjsn80fb24eb1650",
      "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
    },
    params: {
      ...query,
    },
  };

  const fetchData = async () => {
    setIsLoading(true);

    try {
      // Commenting out the following lines to stop making API calls dont want to waste calls
      // const response = await axios.request(options);
      // setData(response.data.data);

      // Usiung hardcoded data instead
      setData(hardcodedData);
      setIsLoading(false);
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

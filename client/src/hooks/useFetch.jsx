import { useState, useEffect } from "react";

// The API key is imported from a Vite environment variable using import.meta.env.
const API_KEY = import.meta.env.VITE_GIPHY_API;

// This custom hook uses the GIPHY API to fetch a GIF based on a given keyword.
// It returns the URL of the first GIF returned by the API, or a fallback URL if no GIFs were found.
const useFetch = ({ keyword }) => {
  // The gifUrl state holds the URL of the current GIF.
  const [gifUrl, setGifUrl] = useState("");

  // The fetchGifs function is responsible for fetching the GIFs from the GIPHY API.
  const fetchGifs = async () => {
    try {
      // The fetch function is used to make a GET request to the GIPHY API, passing in the API key and the keyword as query parameters.
      const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword.split(" ").join("+")}&limit=1`);

      // The response is parsed as JSON, and only the "data" property is extracted.
      const { data } = await response.json();

      // If there is at least one GIF returned by the API, the URL of the downsized_medium version of the first GIF is extracted and set as the gifUrl state.
      if (data.length > 0) {
        setGifUrl(data[0]?.images?.downsized_medium?.url);
      }
      // If there are no GIFs returned by the API, the gifUrl state is set to a fallback URL.
      else {
        setGifUrl("https://i.pinimg.com/originals/68/a0/9e/68a09e774e98242871c2db0f99307420.gif");
      }
    } catch (error) {
      // If there is an error fetching the GIFs from the API, the gifUrl state is set to the fallback URL.
      setGifUrl("https://i.pinimg.com/originals/68/a0/9e/68a09e774e98242871c2db0f99307420.gif");
    }
  };

  // The useEffect hook is used to call the fetchGifs function whenever the keyword prop changes.
  useEffect(() => {
    if (keyword.trim() !== "") {
      fetchGifs();
    }
  }, [keyword]);

  // The gifUrl state is returned, which can be used in the component that calls this hook to display the GIF.
  return gifUrl;
};

// The useFetch hook is exported so it can be used in other parts of the application.
export default useFetch;

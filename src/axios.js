import axios from "axios";

const instance = axios.create({
  baseURL: "https://us-central1-clone-db7a6.cloudfunctions.net/api", // THE API (cloud function) URL
  // For local host debugging: http://localhost:5001/clone-db7a6/us-central1/api
});

export default instance;

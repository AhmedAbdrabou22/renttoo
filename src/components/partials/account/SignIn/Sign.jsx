import axios from "axios";

const fetchData = async (email, pass) => {
  try {
    const response = await axios.post(
      "https://dev.quickyclean.com.sa/v1/auth/signin",
      {
        username: email,
        password: pass,
      }
    );
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
};

export default fetchData;

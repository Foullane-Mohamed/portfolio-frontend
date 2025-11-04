const API_URL = "http://localhost:4000/graphql";

export const fetchGraphQL = async (query, variables = {}) => {
  try {
    const token = sessionStorage.getItem("jwtToken"); 
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify({ query, variables }),
    });

    const json = await res.json();

    if (json.errors) {
      console.error("GraphQL Errors:", json.errors);
      throw new Error(json.errors[0].message);
    }

    return json.data;
  } catch (error) {
    console.error("Fetch GraphQL Error:", error);
    throw error;
  }
};

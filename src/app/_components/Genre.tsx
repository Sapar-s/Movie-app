import { BaseURL, TOKEN } from "@/utils/constants";

export async function fetchData(endpoint: string) {
  const response = await fetch(
    BaseURL + endpoint,

    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  // console.log(BaseURL);
  return data;
}

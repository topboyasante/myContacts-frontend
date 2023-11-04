import axios from "axios";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";

async function fetchFunction<T>(url: string): Promise<T> {
  const accessToken = Cookies.get("accessToken");
  const { data } = await axios.get<T>(
    `https://mycontacts-backend-fjb8.onrender.com/api/${url}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
    }
  );
  return data;
}

export function useFetchData<T>(url: string, key: string) {
  const { isLoading, data, isError } = useQuery<unknown, unknown, T>({
    queryKey: [key],
    queryFn: () => fetchFunction<T>(url),
  });
  return { isLoading, data, isError };
}

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

function useFetchData<T>(url: string, key: string) {
  const {
    isLoading: isFetchingUser,
    data: UserDetails,
    isError: FetchUserDetailsFailed,
  } = useQuery<unknown, unknown, T>({
    queryKey: [key],
    queryFn: () => fetchFunction<T>(url),
  });

  const {
    isLoading: isFetchingUserToUpdateDetails,
    data: UpdatedUserDetails,
    isError: isFetchingUserToUpdateDetailsFailed,
  } = useQuery<unknown, unknown, T>({
    queryKey: [key],
    queryFn: () => fetchFunction<T>(url),
  });

  const {
    isLoading: isFetchingContacts,
    data: Contacts,
    isError: FetchContactsFailed,
  } = useQuery<unknown, unknown, T>({
    queryKey: [key],
    queryFn: () => fetchFunction<T>(url),
  });

  return {
    isFetchingUser,
    UserDetails,
    FetchUserDetailsFailed,
    isFetchingContacts,
    Contacts,
    FetchContactsFailed,
    isFetchingUserToUpdateDetails,
    UpdatedUserDetails,
    isFetchingUserToUpdateDetailsFailed
  };
}

export default useFetchData;

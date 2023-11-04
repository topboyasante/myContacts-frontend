import axios from "axios";
import { QueryClient, useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

const queryClient = new QueryClient();

function useMutationRequest<T>(url: string, key: string) {
  const accessToken = Cookies.get("accessToken");

  const {
    mutate: PostData,
    data: PostedData,
    isPending: PostedPending,
    isSuccess: PostedSuccess,
  } = useMutation({
    mutationFn: async (payload: T) => {
      const res = await axios.post(
        `https://mycontacts-backend-fjb8.onrender.com/api/${url}`,
        payload,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`${key}`],
      });
    },
  });

  const {
    mutate: UpdateData,
    data: UpdatedData,
    isPending: UpdatedPending,
    isSuccess: UpdatedSuccess,
  } = useMutation({
    mutationFn: async (payload: T) => {
      const res = await axios.put(
        `https://mycontacts-backend-fjb8.onrender.com/api/${url}`,
        payload,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`${key}`],
      });
    },
  });

  const {
    mutate: DeleteData,
    data: DeletedData,
    isPending: DeletedPending,
    isSuccess: DeletedSuccess,
  } = useMutation({
    mutationFn: async () => {
      const res = await axios.delete(
        `https://mycontacts-backend-fjb8.onrender.com/api/${url}`,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`${key}`],
      });
    },
  });

  return {
    PostData,
    PostedData,
    PostedPending,
    PostedSuccess,
    UpdateData,
    UpdatedData,
    UpdatedPending,
    UpdatedSuccess,
    DeleteData,
    DeletedData,
    DeletedPending,
    DeletedSuccess,
  };
}

export default useMutationRequest;

import axios from "axios";
import { QueryClient, useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";

const queryClient = new QueryClient()

function useMutationRequest<T>(url: string,key:string) {
  const accessToken = Cookies.get("accessToken");

  const { mutate, data, isPending, isSuccess } = useMutation({
    mutationFn: async (payload: T) => {
      const res = await axios.post(
        `https://mycontacts-backend-fjb8.onrender.com/api/${url}`,
        payload,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      return res.data;
    },
    onSuccess:()=>{
      queryClient.invalidateQueries({
        queryKey:[key]
      })
    }
  });
  return { mutate, data, isPending, isSuccess };
}

export default useMutationRequest;

import axios, { AxiosError } from "axios";
import { QueryClient, useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const queryClient = new QueryClient();

function useMutationRequest<T>(url: string, key: string) {
  const accessToken = Cookies.get("accessToken");
  const navigate = useNavigate();
  const { reset } = useForm();

  const {
    mutate: AddContact,
    data: NewContactAdded,
    isPending: AddedContactIsPending,
    isSuccess: AddedContactWasSuccessful,
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
      toast.success("Contact Added!");
      reset();
      navigate("/contacts");
    },
    onError: (error: AxiosError<any, any>) => {
      toast.error(`${error?.response?.data.message}`);
    },
  });

  const {
    mutate: EditContact,
    data: EditedContact,
    isPending: EditedContactIsPending,
    isSuccess: EditedContactWasSuccessful,
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
      toast.success("Contact Details Edited!");
      reset();
      navigate("/contacts");
    },
    onError: (error: AxiosError<any, any>) => {
      toast.error(`${error?.response?.data.message}`);
    },
  });

  const {
    mutate: DeleteContact,
    data: DeletedContact,
    isPending: DeletedContactIsPending,
    isSuccess: DeletedContactWasSuccessful,
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
      toast.success("Contact Deleted!");
    },
    onError: (error: AxiosError<any, any>) => {
      toast.error(`${error?.response?.data.message}`);
    },
  });

  const {
    mutate: EditUserData,
    data: EditedUserData,
    isPending: EditedUserDataIsPending,
    isSuccess: EditedUserDataWasSuccessful,
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
      Cookies.remove("accessToken");
      navigate("/auth/sign-in");
      toast.success(
        "Account Details Edited! Please Log in to refresh changes."
      );
    },
    onError: (error: AxiosError<any, any>) => {
      toast.error(`${error?.response?.data.message}`);
    },
  });

  const {
    mutate: DeleteUser,
    data: DeletedUser,
    isPending: DeletedUserIsPending,
    isSuccess: DeletedUserWasSuccessful,
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
      Cookies.remove("accessToken");
      navigate("/auth/sign-in");
      toast.success("Account Deleted!");
    },
    onError: (error: AxiosError<any, any>) => {
      toast.error(`${error?.response?.data.message}`);
    },
  });


  
  const {
    mutate: UpdatePassword,
    data: UpdatedPasssword,
    isPending: UpdatePasswordIsPending,
    isSuccess: UpdatePasswordWasSuccessful,
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
      toast.success("Contact Details Edited!");
      reset();
      navigate("/contacts");
    },
    onError: (error: AxiosError<any, any>) => {
      toast.error(`${error?.response?.data.message}`);
    },
  });

  return {
    AddContact,
    NewContactAdded,
    AddedContactIsPending,
    AddedContactWasSuccessful,
    EditContact,
    EditedContact,
    EditedContactIsPending,
    EditedContactWasSuccessful,
    DeleteContact,
    DeletedContact,
    DeletedContactIsPending,
    DeletedContactWasSuccessful,
    EditUserData,
    EditedUserData,
    EditedUserDataIsPending,
    EditedUserDataWasSuccessful,
    DeleteUser,
    DeletedUser,
    DeletedUserIsPending,
    DeletedUserWasSuccessful,
    UpdatePassword,
    UpdatedPasssword,
    UpdatePasswordIsPending,
    UpdatePasswordWasSuccessful,
  };
}

export default useMutationRequest;

import {
  fetchBaseQuery,
  type BaseQueryApi,
  type FetchArgs,
} from "@reduxjs/toolkit/query";
import { startLoading, stopLoading } from "../layout/uiSlice";
import { toast } from "react-toastify";
import { router } from "../routes/Routes";

const customBaseQuery = fetchBaseQuery({
  baseUrl: "https://localhost:5001/api",
});

type ErrorResponse = string | { title: string } | { errors: string[] };

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

export const baseQueryWithErrorHandling = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  api.dispatch(startLoading()); // start loading

  await sleep();

  const results = await customBaseQuery(args, api, extraOptions);

  api.dispatch(stopLoading());

  if (results.error) {
    console.log(results.error);

    const originalStatus =
      results.error.status === "PARSING_ERROR" && results.error.originalStatus
        ? results.error.originalStatus
        : results.error.status;
    const responseData = results.error.data as ErrorResponse;

    switch (originalStatus) {
      case 400:
        if (typeof responseData === "string") toast.error(responseData);
        else if ("errors" in responseData) {
          throw Object.values(responseData.errors).flat().join(", ");
        } else toast.error(responseData.title);
        break;
      case 401:
        if (typeof responseData === "object" && "title" in responseData)
          toast.error(responseData.title);
        break;
      case 404:
        if (responseData === null) router.navigate("/not-found");
        break;
      case 500:
        if (typeof responseData === "object")
          router.navigate("/server-error", { state: { error: responseData } });
        break;
      default:
        break;
    }
  }
  return results;
};

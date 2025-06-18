import { fetchBaseQuery, type BaseQueryApi, type FetchArgs } from "@reduxjs/toolkit/query";
import { startLoading, stopLoading } from "../layout/uiSlice";

const customBaseQuery = fetchBaseQuery({
  baseUrl: "https://localhost:5001/api",
});

const sleep = () => new Promise(resolve => setTimeout(resolve, 1000));

export const baseQueryWithErrorHandling = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: object) => {
    api.dispatch(startLoading()); // start loading
    await sleep();
    const results  = await customBaseQuery(args, api, extraOptions); 
    api.dispatch(stopLoading());
    if(results.error){
        const {status, data} = results.error;
        console.log({status, data});
    }
    return results;
}
"use client";

import React from "react";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
  MutationCache,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Modal } from "antd";

function Provider({ children }: React.PropsWithChildren) {
  // const client = new QueryClient({

  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        // cache-level queries error handler
        // toast.error(`API Error: ${error message}`);
        console.log("==================queries==================");
        console.log(error);
        console.log("====================================");
      },
    }),
    mutationCache: new MutationCache({
      onError: (error: any) => {
        // cache-level mutations error handler
        // const { mutationKey } = mutation.options;
        console.log("==============global mutation======================");
        console.log(error?.response.data);
        console.log("====================================");

        const exceptionForModal = Object?.values(error?.response?.data)
          ?.flat()
          ?.includes(`you don't have any bulk create processing`);

        if (exceptionForModal) {
          return;
        }
        if (error?.response?.status !== 401) {
          Modal.error({
            title: "Error",
            onOk: () => {},
            content: `${
              error?.response !== undefined
                ? Object?.values(error?.response?.data)
                : "Error request"
            }`,
            okType: "danger",
          });
        }
      },
    }),
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default Provider;

import { useEffect, useState } from "react";
import { AxiosAuth } from "../utils/axios";

export default function useGetResultData<T>(
  url: string,
  loadingStatusChange: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const [resultData, setResultData] = useState<T>();
  useEffect(() => {
    loadingStatusChange(true);
    AxiosAuth.get(url)
      .then((result) => {
        setResultData(result.data.data);
      })
      .catch((error) => {console.log(error)})
      .finally(() => loadingStatusChange(false));
  }, []);

  return resultData;
}

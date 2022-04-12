import {
  useQuery,
} from 'react-query';
const useRetrievingAssetsQuery = () => {
  return useQuery(["useRetrievingAssetsQuery"],
    () => fetch('https://testnets-api.opensea.io/api/v1/assets?order_direction=desc&offset=0&limit=20')
      .then(response => response.json())
      .then(({ assets = [] }) => {
        console.log("assets : ", assets)
        return assets;
      })
  )
}
export default useRetrievingAssetsQuery;
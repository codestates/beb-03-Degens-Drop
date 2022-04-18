import {
  useQuery,
} from 'react-query';
const useRetrievingOwnerAssetsQuery = (owner) => {
  // console.log("owner", owner)
  return useQuery(["useRetrievingOwnerAssetsQuery", owner],
    () => fetch(`https://testnets-api.opensea.io/api/v1/assets?owner=${owner}&order_direction=desc&offset=0&limit=20`)
      .then(response => response.json())
      .then(({ assets = [] }) => {
        console.log("assets : ", assets)
        return assets;
      })
  )
}
export default useRetrievingOwnerAssetsQuery;
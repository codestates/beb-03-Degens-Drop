import {
  useQuery,
} from 'react-query';
const useRetrievingCollectionsQuery = (asset_owner = "") => {
  return useQuery(["useRetrievingCollectionsQuery", asset_owner],
    () => fetch(`https://testnets-api.opensea.io/api/v1/collections?asset_owner=${asset_owner}`)
      .then(response => response.json())
      .then(({ collections = [] }) => {
        console.log(collections)
        return collections;
      })
  )
}
export default useRetrievingCollectionsQuery;
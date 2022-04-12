import {
  useQuery,
} from 'react-query';
const useRetrievingSingleAssetQuery = (contractAddress, token_id) => {
  console.log("owner", contractAddress)
  console.log("token_id", token_id)
  return useQuery(["useRetrievingSingleAssetQuery", contractAddress, token_id],
    () => fetch(`https://testnets-api.opensea.io/api/v1/asset/${contractAddress}/${token_id}/`)
      .then(response => response.json())
      .then(({ assets = [] }) => {
        console.log("assets : ", assets)
        return assets;
      })
  )
}
export default useRetrievingSingleAssetQuery;
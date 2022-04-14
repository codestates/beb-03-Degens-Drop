import {
  useQuery,
} from 'react-query';
const useRetrievingAssetsQuery = (owner, asset_contract_addresses) => {
  let uri = `https://testnets-api.opensea.io/api/v1/assets?`;
  if (owner !== undefined) {
    uri += `&owner=${owner}`;
  }
  if (asset_contract_addresses !== undefined) {
    uri += `&asset_contract_addresses=${asset_contract_addresses}`
  }

  return useQuery(["useRetrievingAssetsQuery", uri],
    () => fetch(uri)
      .then(response => response.json())
      .then(({ assets = [] }) => {
        console.log("assets : ", assets)
        return assets;
      })
  )
}
export default useRetrievingAssetsQuery;
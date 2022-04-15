import {
  useQuery,
} from 'react-query';
import axios from 'axios';
const useRetrievingAssetsOwnerOrContractQuery = (address) => {
  let uri = `https://testnets-api.opensea.io/api/v1/assets?`;
  return useQuery(["useRetrievingAssetsOwnerOrContractQuery", uri],
    async () => {
      if (address !== undefined) {
        const res = await axios.get(uri + `&owner=${address}`);
        const { data: ownerData = {} } = res;
        if (ownerData?.assets?.length > 0) {
          return ["EOA", ownerData];
        }
        else {
          const res = await axios.get(uri + `&asset_contract_addresses=${address}`);
          const { data: contractData = {} } = res;
          return ["CA", contractData];
        }
      }
      else {
        return [];
      }
    })

}
export default useRetrievingAssetsOwnerOrContractQuery;
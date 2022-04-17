import {
  useQuery,
} from 'react-query';
import axios from 'axios';
const useRetrievingMarketListQuery = (nftList) => {
  console.log("nftList", nftList)
  const tokenIdx = 3;
  const contractIdx = 2;
  const priceIdx = 4;
  const dict = {};
  const dict2 = {};

  for (let i = 0; i < nftList.length; i++) {
    const hash = `${nftList[i][contractIdx].toLowerCase()} ${nftList[i][tokenIdx]}`;
    dict2[hash] = nftList[i][priceIdx];
    if (dict.hasOwnProperty(nftList[i][contractIdx])) {
      dict[nftList[i][contractIdx]].push(nftList[i][tokenIdx]);
    }
    else {
      dict[nftList[i][contractIdx]] = [nftList[i][tokenIdx]];
    }
  }
  console.log("dict2", dict2)
  return useQuery(["useRetrievingMarketListQuery"],
    async () => {
      const newNftList = [];
      console.log(dict)
      for (let [contractAddress, tokenList] of Object.entries(dict)) {
        let uri = `https://testnets-api.opensea.io/api/v1/assets?asset_contract_address=${contractAddress}`;
        for (let token_id of tokenList) {
          uri += `&token_ids=${token_id}`;
        }
        const res = await axios(uri);
        console.log("res", res)
        const { assets } = res.data;
        const newAssets = assets.map(obj => {
          console.log(obj?.asset_contract?.address)
          console.log(obj?.token_id)
          const hash = `${obj?.asset_contract?.address} ${obj?.token_id}`;
          console.log('hash', hash);
          obj['tokenPrice'] = dict2[hash];
          return obj;
        });
        newNftList.push(...newAssets);
      }
      return newNftList;
    }
  )
}
export default useRetrievingMarketListQuery;
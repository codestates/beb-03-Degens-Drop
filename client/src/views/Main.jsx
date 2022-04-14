import React from "react";
import useRetrievingAssetsQuery from "hooks/useRetrievingAssetsQuery";
import Cell from "./../components/Cell";
import { Link } from 'react-router-dom';
function Main() {
  const { isError, isLoading, error, data } = useRetrievingAssetsQuery();
  if (isLoading) {
    return <div className='content'><span>Loading...</span></div>
  }

  if (isError) {
    return <div className='content'><span>Error: {error.message}</span></div>
  }
  console.log(data);
  return <div className='content'>
    <div className="row justify-content-center">{
      data.map((asset) => {
        console.log(asset)
        return <Link key={asset.id} to={`/asset/${asset?.asset_contract?.address}/${asset?.token_id}`}>
          <Cell key={asset.id} asset={asset}>{asset.id}</Cell>
        </Link>
      })
    }
    </div>
  </div>;
}
export default Main;

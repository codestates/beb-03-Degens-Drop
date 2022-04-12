import React from "react";
import useRetrievingAssetsQuery from "hooks/useRetrievingAssetsQuery";
import Cell from "./../components/Cell";
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
    <div className="row">{
      data.map((asset) => {
        return <Cell key={asset.id} asset={asset}>{asset.id}</Cell>
      })
    }
    </div>
  </div>;
}
export default Main;

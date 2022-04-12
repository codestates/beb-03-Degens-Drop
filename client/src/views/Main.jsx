import React from "react";
import useRetrievingAssetsQuery from "hooks/useRetrievingAssetsQuery";
import Cell from "./../components/Cell";
function Main() {
  const { isError, isLoading, error, data } = useRetrievingAssetsQuery();
  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }
  console.log(data);
  return <div className='content'>
    <div class="row">{
      data.map(({ id, creator, name, image_url, description }) => {
        return <Cell key={id} name={name} imageDescription={description} imageSrc={image_url}>{id}</Cell>
      })
    }
    </div>
  </div>;
}
export default Main;

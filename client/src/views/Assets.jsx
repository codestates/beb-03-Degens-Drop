import Cell from "components/Cell";
import useRetrievingAssetsOwnerOrContractQuery from "hooks/useRetrievingAssetsOwnerOrContractQuery";
import React from "react";
import { Link, useLocation } from 'react-router-dom';
function Assets() {
    function useQuery() {
        const { search } = useLocation();
        return React.useMemo(() => new URLSearchParams(search), [search]);
    }
    let query = useQuery();
    const { isError, isLoading, error, data } = useRetrievingAssetsOwnerOrContractQuery(query.get('search'));
    if (isLoading) {
        return <div className='content'><span>Loading...</span></div>
    }

    if (isError) {
        return <div className='content'><span>Error: {error.message}</span></div>
    }
    console.log("data", data);
    return <div className='content'>
        <div>search : {data[0]}</div>
        <div className="row justify-content-center">
            {
                data[1]['assets'].map(asset =>
                    <Link key={asset.id} to={`/asset/${asset?.asset_contract?.address}/${asset?.token_id}`}>
                        <Cell key={asset.id} asset={asset}>{asset.id}</Cell>
                    </Link>
                )
            }
        </div>
    </div>;
}
export default Assets;
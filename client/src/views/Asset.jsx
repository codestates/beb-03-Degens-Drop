import React from 'react';
import AssetPage from 'components/AssetPage';
import { useParams } from 'react-router-dom';
import { observer } from "mobx-react";
import useRetrievingSingleAssetQuery from 'hooks/useRetrievingSingleAssetQuery';

const Asset = observer(() => {
    const { asset_contract_address = null, token_id = null } = useParams();
    const { isError, isLoading, error, data } = useRetrievingSingleAssetQuery(asset_contract_address, token_id);
    if (isLoading) {
        return <div className="content">
            <span>Loading...</span>
        </div>
    }
    if (isError) {
        return <div className="content">
            <span>Error: {error.message}</span>
        </div >
    }
    return <div className="content">
        <AssetPage data={data} />
    </div >
});

export default Asset;
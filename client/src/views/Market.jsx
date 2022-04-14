import React, { useEffect, useState } from 'react';
import { observer } from "mobx-react";
import useStores from "hooks/useStore";
import useRetrievingMarketListQuery from 'hooks/useRetrievingMarketListQuery';
import Cell from 'components/Cell';
import { Link } from 'react-router-dom';

const MarketPage = ({ marketList }) => {
    const { isError, isLoading, error, data } = useRetrievingMarketListQuery(marketList);
    if (isLoading) {
        return (
            <span>Loading...</span>
        );
    }
    if (isError) {
        return (
            <span>Error: {error.message}</span>
        );
    }
    console.log("data", data);
    return <>
        <div className="row justify-content-center"> {
            data.map(asset =>
                <Link key={asset.id} to={`/asset/${asset?.asset_contract?.address}/${asset?.token_id}`}>
                    <Cell key={asset.id} asset={asset}>{asset.id}</Cell>
                </Link>
            )}
        </div>
    </>
}


const Market = observer(() => {
    const { blockchainStore } = useStores();
    const [marketList, setMarketList] = useState([]);
    useEffect(() => {
        const getMarketList = async () => {
            const marketList = await blockchainStore.blockchain.marketContract.methods
                .getNfts().call();
            setMarketList(marketList);
        }
        getMarketList();
    }, [])
    return <>
        <div className='content'>
            {marketList.length > 0 && <MarketPage marketList={marketList} />}
        </div>
    </>
});
export default Market;
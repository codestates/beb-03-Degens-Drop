import useStores from "hooks/useStore";
const useFromWei = (wei) => {
    const { blockchainStore } = useStores();
    if (wei === undefined) return wei;
    return blockchainStore.blockchain.web3.utils.fromWei(
        wei,
        "ether"
    );
}
export default useFromWei;
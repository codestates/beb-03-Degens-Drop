import { useContext } from 'react';
import { BlockchainContext } from '../store';
const useStore = () => useContext(BlockchainContext);
export default useStore;

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";


contract Market is Ownable{
    using Counters for Counters.Counter;
    Counters.Counter private _Ids;
    uint256 public feePercent;
    address payable public feeOwner;

    struct NftOnSale {
      uint256 id;
      address payable seller;
      address NFTaddress;
      uint256 tokenId;
      uint256 price;
      bool sold;
    }

    mapping(uint256 => NftOnSale) public onSales;

    event Add(uint256 id, address indexed NftAddress, address indexed seller, uint256 tokenId, uint256 price);
    event Buy(uint256 id, address indexed NftAddress, address indexed seller, address indexed buyer, uint256 tokenId, uint256 price);

    constructor(uint256 _feePercent){
      feePercent = _feePercent;
      feeOwner = payable(msg.sender);
    }
   modifier addCheck(address _NFTaddress, uint256 _tokenId, address seller) {
      require(IERC721(_NFTaddress).ownerOf(_tokenId) == seller, "You don't own this NFT!!");
      require(!_isAdded(_NFTaddress, _tokenId), "This NFT is already added to Market!!");
      _;
    }

    function _isAdded(address _NFTaddress, uint256 _tokenId) internal view returns (bool){      
      for(uint i = 1 ; i <= _Ids.current(); i++){
          if(onSales[i].NFTaddress == _NFTaddress && onSales[i].tokenId == _tokenId){
              return true;
          }
      }
      return false;
    }
    
    //등록
    function addNftToMarket(address _NFTaddress, uint256 _tokenId, uint256 _price) addCheck(_NFTaddress,_tokenId,msg.sender) external {
      _Ids.increment();

      onSales[_Ids.current()] = NftOnSale(_Ids.current(), payable(msg.sender), _NFTaddress, _tokenId, _price, false);

      emit Add(_Ids.current(), _NFTaddress, msg.sender, _tokenId, _price);
    }

     function getNfts() external view returns(NftOnSale[] memory){
            uint count;
            NftOnSale[] memory checkList = new NftOnSale[](_Ids.current());
            for(uint i = 1 ; i <= _Ids.current(); i++){
                if(onSales[i].sold == false){
                    checkList[count] = onSales[i];
                    count++;
                }
            }
            NftOnSale[] memory filteredCheckList = new NftOnSale[](count);
            for(uint i = 0; i<count; i++){
                filteredCheckList[i] = checkList[i];
            }
            return filteredCheckList;
    }
    
    modifier buyCheck(uint256 _price, uint256 _id, address buyer) {
      require(_price >= onSales[_id].price, "Not enough ETH!!");
      require(!onSales[_id].sold, "Already sold!!");
      require(buyer != onSales[_id].seller, "You cannot buy your NFT!!");
      _;
    }
    // 구매
    function buyNft(uint256 _id) buyCheck(msg.value, _id, msg.sender) payable external {
      uint256 price = onSales[_id].price;
      feeOwner.transfer(price*feePercent/100);
      onSales[_id].seller.transfer(price*(100-feePercent)/100);


      onSales[_id].sold = true;
      IERC721(onSales[_id].NFTaddress).safeTransferFrom(onSales[_id].seller, msg.sender, onSales[_id].tokenId, "");
      
      emit Buy(_id, onSales[_id].NFTaddress, onSales[_id].seller, msg.sender, onSales[_id].tokenId, onSales[_id].price);
    }

}
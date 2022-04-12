/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useRef } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";

// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  Input,
  InputGroup,
  NavbarBrand,
  Navbar,
  NavLink,
  Nav,
  Container,
  Modal,
  NavbarToggler,
  ModalHeader,
} from "reactstrap";
import Notify from "react-notification-alert";

import useStores from "hooks/useStore";
import { observer } from "mobx-react";

export default observer((props) => {
  const [collapseOpen, setcollapseOpen] = React.useState(false);
  const [modalSearch, setmodalSearch] = React.useState(false);
  const [color, setcolor] = React.useState("navbar-transparent");
  const notiRef = useRef(null);
  const { blockchainStore } = useStores();
  console.log("blockchainStore: ", blockchainStore);

  React.useEffect(() => {
    window.addEventListener("resize", updateColor);
    // Specify how to clean up after this effect:
    return function cleanup() {
      window.removeEventListener("resize", updateColor);
    };
  });
  // function that adds color white/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && collapseOpen) {
      setcolor("bg-white");
    } else {
      setcolor("navbar-transparent");
    }
  };
  // this function opens and closes the collapse on small devices
  const toggleCollapse = () => {
    if (collapseOpen) {
      setcolor("navbar-transparent");
    } else {
      setcolor("bg-white");
    }
    setcollapseOpen(!collapseOpen);
  };
  // this function is to open the Search modal
  const toggleModalSearch = () => {
    setmodalSearch(!modalSearch);
  };

  const connectToWallet = async () => {
    await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log(blockchainStore.blockchain);
    const accounts = await blockchainStore.blockchain.web3.eth.getAccounts();
    blockchainStore.setAccount(accounts[0]);
    window.ethereum.on("accountsChanged", (accounts) => {
      blockchainStore.setAccount(accounts[0]);
    });

    const options = {
      place: "br",
      message: (
        <div>
          <div>지갑 연결 성공</div>
        </div>
      ),
      type: "success",
      icon: "",
      autoDismiss: 5,
    };
    notiRef.current.notificationAlert(options);
  };
  return (
    <>
      <Navbar className={classNames("navbar-absolute", color)} expand='lg'>
        <Container fluid>
          <div className='navbar-wrapper'>
            <div
              className={classNames("navbar-toggle d-inline", {
                toggled: props.sidebarOpened,
              })}
            >
              <NavbarToggler onClick={props.toggleSidebar}>
                <span className='navbar-toggler-bar bar1' />
                <span className='navbar-toggler-bar bar2' />
                <span className='navbar-toggler-bar bar3' />
              </NavbarToggler>
            </div>
            <NavbarBrand href='#pablo' onClick={(e) => e.preventDefault()}>
              {props.brandText}
            </NavbarBrand>
          </div>
          <NavbarToggler onClick={toggleCollapse}>
            <span className='navbar-toggler-bar navbar-kebab' />
            <span className='navbar-toggler-bar navbar-kebab' />
            <span className='navbar-toggler-bar navbar-kebab' />
          </NavbarToggler>
          <Collapse navbar isOpen={collapseOpen}>
            <Nav className='ml-auto' navbar>
              <InputGroup className='search-bar'>
                <Button color='link' onClick={toggleModalSearch}>
                  <i className='tim-icons icon-zoom-split' />
                  <span className='d-lg-none d-md-block'>Search</span>
                </Button>
              </InputGroup>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color='default'
                  nav
                  onClick={(e) => e.preventDefault()}
                >
                  {/* <div className="photo">
                    <img
                      alt="..."
                      src={require("assets/img/anime3.png").default}
                    />
                  </div> */}
                  <i className='tim-icons icon-single-02' />
                  <b className='caret d-none d-lg-block d-xl-block' />
                  <p className='d-lg-none'>Log out</p>
                </DropdownToggle>
                <DropdownMenu className='dropdown-navbar' right tag='ul'>
                  <NavLink tag='li'>
                    <DropdownItem className='nav-item'>profile</DropdownItem>
                  </NavLink>
                  <NavLink tag='li'>
                    <DropdownItem className='nav-item'>favorites</DropdownItem>
                  </NavLink>
                  <NavLink tag='li'>
                    <DropdownItem className='nav-item'>
                      myCollections
                    </DropdownItem>
                  </NavLink>
                  <NavLink tag='li'>
                    <DropdownItem className='nav-item'>Settings</DropdownItem>
                  </NavLink>
                  <DropdownItem divider tag='li' />
                  <NavLink tag='li'>
                    <DropdownItem className='nav-item'>Log out</DropdownItem>
                  </NavLink>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color='default'
                  nav
                  onClick={(e) => e.preventDefault()}
                >
                  <i className='tim-icons icon-wallet-43' />
                  <b className='caret d-none d-lg-block d-xl-block' />
                </DropdownToggle>
                <DropdownMenu className='dropdown-navbar' right tag='ul'>
                  <NavLink tag='li'>
                    {blockchainStore.blockchain.account === "" ? (
                      <DropdownItem
                        className='nav-item'
                        onClick={connectToWallet}
                      >
                        MetaMask에 연결
                      </DropdownItem>
                    ) : (
                      <DropdownItem className='nav-item'>
                        {`${blockchainStore.blockchain.account.substr(
                          0,
                          6
                        )}...${blockchainStore.blockchain.account.substr(
                          -4,
                          4
                        )}`}
                      </DropdownItem>
                    )}
                  </NavLink>
                </DropdownMenu>
              </UncontrolledDropdown>
              <li className='separator d-lg-none' />
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
      <Modal
        modalClassName='modal-search'
        isOpen={modalSearch}
        toggle={toggleModalSearch}
      >
        <ModalHeader>
          <Input placeholder='SEARCH' type='text' />
          <button
            aria-label='Close'
            className='close'
            onClick={toggleModalSearch}
          >
            <i className='tim-icons icon-simple-remove' />
          </button>
        </ModalHeader>
      </Modal>
      <Notify ref={notiRef} />
    </>
  );
});

//export default AdminNavbar;

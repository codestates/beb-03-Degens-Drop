import React from "react";
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";

// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import routes from "routes.js";
import logo from "assets/img/degen.png";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";
//const routes = leftRoutes.slice(0, leftRoutes.length - 1);

import Web3 from "web3";
import useStores from "hooks/useStore";
import { observer } from "mobx-react";
import { abi, address } from "../marketAbi";
var ps;

export default observer((props) => {
  const location = useLocation();
  const mainPanelRef = React.useRef(null);
  const [sidebarOpened, setsidebarOpened] = React.useState(
    document.documentElement.className.indexOf("nav-open") !== -1
  );

  const { blockchainStore } = useStores();

  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(mainPanelRef.current, {
        suppressScrollX: true,
      });
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.documentElement.classList.add("perfect-scrollbar-off");
        document.documentElement.classList.remove("perfect-scrollbar-on");
      }
    };
  });
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (mainPanelRef.current) {
      mainPanelRef.current.scrollTop = 0;
    }
  }, [location]);

  React.useEffect(() => {
    if (typeof window.ethereum !== "undefined") {
      // window.ethereum이 있다면
      try {
        const web = new Web3(window.ethereum); // 새로운 web3 객체를 만든다
        blockchainStore.setWeb3(web);

        const marketContract = new web.eth.Contract(abi, address);
        blockchainStore.setMarketContract(marketContract);
        console.log('here', marketContract);
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  // this function opens and closes the sidebar on small devices
  const toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    setsidebarOpened(!sidebarOpened);
  };

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/") {
        return (
          <Route exact path={prop.path} component={prop.component} key={key} />
        );
      } else if (prop.layout === "/asset") {
        return <Route path={prop.path} component={prop.component} key={key} />;
      } else if (prop.layout === "/assets") {
        return <Route path={prop.path} component={prop.component} key={key} />;
      } else {
        return <Redirect from='*' to='/' />;
      }
    });
  };
  const getBrandText = (path) => {
    const newRoutes = routes.filter((el) => el.dashBoardView === true);
    for (let i = 0; i < newRoutes.length; i++) {
      if (path.pathname === newRoutes[i].path) {
        return newRoutes[i].name;
      }
    }
    return "DEGENS DROP";
  };
  return (
    <BackgroundColorContext.Consumer>
      {({ color, changeColor }) => (
        <>
          <div className='wrapper'>
            <Sidebar
              routes={routes.filter((el) => el.dashBoardView === true)}
              logo={{
                outterLink: "/",
                text: "DEGENS_DROP",
                imgSrc: logo,
              }}
              toggleSidebar={toggleSidebar}
            />
            <div className='main-panel' ref={mainPanelRef} data={color}>
              <AdminNavbar
                brandText={getBrandText(location)}
                toggleSidebar={toggleSidebar}
                sidebarOpened={sidebarOpened}
              />
              <Switch>{getRoutes(routes)}</Switch>
            </div>
          </div>
          <FixedPlugin bgColor={color} handleBgClick={changeColor} />
        </>
      )}
    </BackgroundColorContext.Consumer>
  );
});

//export default Admin;

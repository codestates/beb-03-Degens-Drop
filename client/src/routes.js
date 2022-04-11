// import Dashboard from "views/Dashboard.js";
// import Main from "views/Main";
// import Icons from "views/Icons.js";
// import Map from "views/Map.js";
// import Notifications from "views/Notifications.js";
// import TableList from "views/TableList.js";
// import Typography from "views/Typography.js";
import Main from "views/Main";
import Minting from "views/Minting";
import MyPage from "views/MyPage";
import Collected from "views/Collected";

var routes = [
  {
    path: "/",
    name: "Degens-Drop",
    icon: "tim-icons icon-chart-pie-36",
    component: Main,
    layout: "/",
  },
  {
    path: "/minting",
    name: "민팅",
    icon: "tim-icons icon-chart-pie-36",
    component: Minting,
    layout: "/",
  },
  {
    path: "/myPage",
    name: "마이페이지",
    icon: "tim-icons icon-chart-pie-36",
    component: MyPage,
    layout: "/",
  },
  // {
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   icon: "tim-icons icon-chart-pie-36",
  //   component: Dashboard,
  //   layout: "/admin",
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "tim-icons icon-atom",
  //   component: Icons,
  //   layout: "/admin",
  // },
  // {
  //   path: "/map",
  //   name: "Map",
  //   icon: "tim-icons icon-pin",
  //   component: Map,
  //   layout: "/admin",
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "tim-icons icon-bell-55",
  //   component: Notifications,
  //   layout: "/admin",
  // },
  // ********************************************
  // {
  //   path: "/test",
  //   name: "NFT Collected Page",
  //   icon: "tim-icons icon-single-02",
  //   component: Collected,
  //   layout: "/",
  // },

  // {
  //   path: "/tables",
  //   name: "Table List",
  //   icon: "tim-icons icon-puzzle-10",
  //   component: TableList,
  //   layout: "/admin",
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "tim-icons icon-align-center",
  //   component: Typography,
  //   layout: "/admin",
  // },
];
export default routes;

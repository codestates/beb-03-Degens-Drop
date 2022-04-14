import Main from "views/Main";
import Minting from "views/Minting";
import MyPage from "views/MyPage";
import Asset from "views/Asset";
import Market from "views/Market";
import Assets from "views/Assets";

var routes = [
  {
    path: "/",
    name: "Degens-Drop",
    icon: "tim-icons icon-chart-pie-36",
    component: Main,
    layout: "/",
    dashBoardView: true,
  },
  {
    path: "/minting",
    name: "민팅",
    icon: "tim-icons icon-chart-pie-36",
    component: Minting,
    layout: "/",
    dashBoardView: true,

  },
  {
    path: "/myPage",
    name: "마이페이지",
    icon: "tim-icons icon-chart-pie-36",
    component: MyPage,
    layout: "/",
    dashBoardView: true,

  },
  {
    path: "/asset/:asset_contract_address/:token_id",
    name: "asset",
    icon: "tim-icons icon-chart-pie-36",
    component: Asset,
    layout: "/asset",
    dashBoardView: false,
  },
  {
    path: "/assets",
    name: "assets",
    icon: "tim-icons icon-chart-pie-36",
    component: Assets,
    layout: "/assets",
    dashBoardView: false,
  },
  {
    path: "/market",
    name: "마켓",
    icon: "tim-icons icon-chart-pie-36",
    component: Market,
    layout: "/",
    dashBoardView: true,
  },
];
export default routes;

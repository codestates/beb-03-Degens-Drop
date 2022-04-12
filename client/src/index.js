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
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import DefaultLayout from "layouts/default";

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/loading.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";
import { ReactQueryDevtools } from 'react-query/devtools'

import Store from "./store";

import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

const queryClient = new QueryClient()

ReactDOM.render(
  <ThemeContextWrapper>
    <BackgroundColorWrapper>
      <Store>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Switch>
              <Route path='/' render={(props) => <DefaultLayout {...props} />} />
            </Switch>
            <ReactQueryDevtools initialIsOpen={false} />
          </BrowserRouter>
        </QueryClientProvider>
      </Store>
    </BackgroundColorWrapper>
  </ThemeContextWrapper>,
  document.getElementById("root")
);

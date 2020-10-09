import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from "@material-ui/styles";
import theme from "../styles/theme";
import store from '../store/store';

import MainRoutes from "../Routes/MainRoutes.js";

jest.mock("react-dom", () => ({ render: jest.fn() }));

describe("Application root", () => {
  it("should render without crashing", () => {
    const div = document.createElement("div");
    div.id = "root";
    document.body.appendChild(div);
    // eslint-disable-next-line global-require
    require("../index.js");
    expect(ReactDOM.render).toHaveBeenCalledWith(
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          {/* <PostsNavigatorApp /> */}
        </Provider>
      </ThemeProvider>,
      div
    );
  });
});

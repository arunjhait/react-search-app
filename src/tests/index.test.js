import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from "@material-ui/styles";

import theme from "../styles/theme";
import store from '../store/store';

import App from "../App";

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
      <CssBaseline />
        <Provider store={store}>
          <App />
        </Provider>
      </ThemeProvider>,
      div
    );
  });
});

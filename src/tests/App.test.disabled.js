import React from "react";
import { render } from "@testing-library/react";

import App from "../App";
import MainRoutes from "../Routes/MainRoutes";

describe("Header component test suite", () => {  

  it('it should render successfully', () => {
    const comp = render(
      <MainRoutes />
    );
    expect(comp.container).toBeTruthy();
  });
});

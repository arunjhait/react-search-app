import React from "react";
import { render } from "@testing-library/react";

import Header from "../../containers/Header";

describe("Header component test suite", () => {  

  it('it should render successfully', () => {
    const comp = render(
        <Header />
    );
    expect(comp.container).toBeTruthy();
  });
});

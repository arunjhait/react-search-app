import React from "react";
import { render } from "@testing-library/react";

import Header from "../../containers/Header";
import TestProvider from "../../config/TestProvider";

describe("Header component test suite", () => {  

  it('it should render successfully', () => {
    const comp = render(
      <TestProvider>
        <Header />
      </TestProvider>
    );
    expect(comp.container).toBeTruthy();
  });
});

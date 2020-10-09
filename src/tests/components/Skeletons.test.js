import React from "react";
import { render } from "@testing-library/react";

import Skeletons from "../../components/Skeletons";

describe("Skeletons component test suite", () => {  

  it('it should render successfully', () => {
    const comp = render(
        <Skeletons />
    );
    expect(comp.container).toBeTruthy();
  });
});

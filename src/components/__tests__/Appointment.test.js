import React from "react";

import { render, cleanup } from "@testing-library/react";

import Appointment from "components/Appointment/index";

afterEach(cleanup);

// id={1}
// time="12pm"
// interview={{ student: "Lydia Miller-Jones", interviewer }}


it("renders without crashing", () => {
  render(<Appointment />);
});

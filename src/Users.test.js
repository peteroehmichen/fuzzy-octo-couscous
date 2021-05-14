import { cleanup, render, screen } from "@testing-library/react";
import Users from "./Users";

afterEach(cleanup);

test("Component Loads correctly", () => {
    const comp = render(<Users />);
    expect(comp.getByTestId("title").textContent).toBe("Zeiterfassung");
    expect(comp.getByTestId("title")).toContainElement("<h1>");
});

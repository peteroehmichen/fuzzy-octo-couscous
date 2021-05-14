import { cleanup, render, screen } from "@testing-library/react";
import App from "./App";

// test("load the start page", () => {
//     render(<App />);
//     const firstView = screen.getByText(/Zeiterfassung/i);
//     expect(firstView).toBeInTheDocument();
// });

afterEach(cleanup);

describe("basic tests on App-component", () => {
    it("Correctly loads the component and on start the User-Component", () => {
        const comp = render(<App />);
        expect(comp.getByTestId("title").textContent).toBe("Zeiterfassung");
    });
});

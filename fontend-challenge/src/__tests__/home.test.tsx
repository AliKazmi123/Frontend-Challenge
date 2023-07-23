import React from "react";
import { render} from "@testing-library/react";
import Home from "../pages/home/home";
import { MemoryRouter} from "react-router-dom";
import { createMemoryHistory } from "history";
import { Provider } from "react-redux";
import { store } from "../redux/store";


const PassParamWithComponent = () => {
    return <Home />;
};

test("renders detail page with sample learningPath object", async () => {
    const history = createMemoryHistory();
    history.push(``);
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PassParamWithComponent />
            </MemoryRouter>
        </Provider>

    );

    const containerElements = document.getElementsByClassName("learning-paths-container");
    console.log('Container with API Lists is visible')
    expect(containerElements.length).toBeGreaterThan(0);

    const containerElementsError = document.getElementsByClassName("learning-paths-container-error");
    console.log('Container with Error Message is not visible')
    expect(containerElementsError.length).toBe(0);

});

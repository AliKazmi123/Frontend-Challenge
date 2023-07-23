import React from "react";
import { render, screen } from "@testing-library/react";
import Detail from "../pages/detail/detail";
import { LearningPath } from "../types/customTypes";
import { MemoryRouter, Routes, Route, BrowserRouter as Router, useLocation } from "react-router-dom";
import { createMemoryHistory } from "history";

const learningPath: LearningPath = {
    duration_in_minutes: 210,
    firstModuleUrl: 'https://learn.microsoft.com/en-us/training/modules/intro-to-linux-on-azure/?WT.mc_id=api_CatalogApi',
    icon_url: 'https://learn.microsoft.com/en-us/training/achievements/azure-linux.svg',
    last_modified: '2023-06-09T17:11:00+00:00',
    levels: ['beginner'],
    locale: 'en-us',
    modules: [
        'learn.introduction-to-linux-on-azure',
        'learn.plan-your-linux-environment-in-azure',
        'learn.provision-linux-virtual-machine-in-azure',
        'learn.build-and-run-a-web-application-with-the-mean-stack-on-an-azure-linux-vm'
    ],
    number_of_children: 4,
    popularity: 0.560083878772725,
    products: ['azure', 'azure-linux-vm', 'azure-virtual-machines'],
    rating: { count: 0 },
    roles: ['solution-architect', 'administrator', 'developer', 'solution-architect'],
    social_image_url: 'https://learn.microsoft.com/en-us/training/achievements/generic-social.png',
    subjects: ['cloud-computing'],
    summary: 'This is a summary of the learning path',
    title: 'Linux on Azure',
    type: 'learningPath',
    uid: '123456789',
    url: 'https://learn.microsoft.com/en-us/training/paths/azure-linux/?WT.mc_id=api_CatalogApi'
};

const PassParamWithComponent = () => {
    const location = useLocation();
    location.state = {
        learningPath: learningPath,
    };

    return <Detail />;
};

test("renders detail page with sample learningPath object", async () => {
    const history = createMemoryHistory();
    history.push(`/detail-product/${learningPath.uid}`);
    render(
        <MemoryRouter>
            <PassParamWithComponent />
        </MemoryRouter>

    );
    const checkAndLog = (text: string) => {
        const element = screen.queryByText(text) as HTMLElement;
        console.log(`${text} is ${element ? "visible" : "not visible"}`);
        expect(element).toBeInTheDocument();
    };


    checkAndLog(learningPath.title);
    checkAndLog(learningPath.levels[0]);
    checkAndLog(learningPath.modules[0]);
    checkAndLog(learningPath.products[0]);
    checkAndLog(learningPath.subjects[0]);
    checkAndLog(learningPath.summary);
    const iconElement = screen.queryByAltText(learningPath.title) as HTMLElement;
    console.log(`Icon is ${iconElement ? "visible" : "not visible"}`);
    expect(iconElement).toBeInTheDocument();


});

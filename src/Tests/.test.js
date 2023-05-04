import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import DragDropFile from "../Components/DragDropFile";
import Navbar from "../Components/NavigationBar";
import Sliders from "../Components/Sliders";
import NewOpsModule from "../Modules/NewOpsModule";
import { shallow } from 'enzyme';
import ScenerioSlider from '../Components/Slider';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactSlider from 'react-slider';
import { MemoryRouter } from 'react-router-dom';
import MyResponsiveScoreBoard from '../Components/ScoreboardBarChart';
import ResizeObserver from 'resize-observer-polyfill';
import MyResponsiveBar from '../Components/SimulationBarChart';

Enzyme.configure({ adapter: new Adapter() });

describe("DragDropFile", () => {
    let onActionMock;
    beforeEach(() => {
        onActionMock = jest.fn();
    });

    it('renders without crashing', () => {
        render(<DragDropFile onAction={onActionMock} />);
    });
});

describe("Sliders", () => {
    test("should render Sliders component", () => {
        render(<Sliders />);
    });
});

describe("NewOpsModule", () => {
    test("should render NewOpsModule component", () => {
        render(<NewOpsModule />);
    });
});

describe('ScenerioSlider component', () => {
    const props = {
        name: 'Test Scenerio',
        mean: 10,
        onSliderChange: jest.fn(),
    };

    it('renders without crashing', () => {
        shallow(<ScenerioSlider {...props} />);
    });

    it('displays the name of the slider', () => {
        const wrapper = shallow(<ScenerioSlider {...props} />);
        expect(wrapper.find('#scenerio-slider-name').text()).toEqual(' ' + props.name + ' ');
    });
});

describe('ScenerioSlider component', () => {
    let props;
    let wrapper;

    beforeEach(() => {
        props = {
            name: 'Test Slider',
            mean: 10,
            onSliderChange: jest.fn()
        };
        wrapper = shallow(<ScenerioSlider {...props} />);
    });

    it('renders without crashing', () => {
        expect(wrapper).toHaveLength(1);
    });

    it('updates the slider value and calls the onSliderChange callback function when the slider value changes', () => {
        const newValue = 15;
        const slider = wrapper.find(ReactSlider);
        slider.simulate('change', newValue);
        expect(wrapper.find('#scenerio-slider-name').text()).toEqual(' ' + props.name + ' ');
        expect(wrapper.find('p').last().text()).toEqual(`Value: ${newValue}`);
        expect(wrapper.find(ReactSlider).prop('defaultValue')).toEqual(props.mean);
    });
});

describe('Navbar', () => {
    test('renders links to home, help, and about pages', () => {
        const { getByText } = render(
            <MemoryRouter>
                <Navbar />
            </MemoryRouter>
        );

        const homeLink = getByText(/home/i);
        expect(homeLink).toBeInTheDocument();

        const helpLink = getByText(/help/i);
        expect(helpLink).toBeInTheDocument();

        const aboutLink = getByText(/about/i);
        expect(aboutLink).toBeInTheDocument();
    });

    test('applies "current" class to link of current page', () => {
        const { getByText } = render(
            <MemoryRouter initialEntries={['/help']}>
                <Navbar />
            </MemoryRouter>
        );

        const helpLink = getByText(/help/i);
        expect(helpLink).toHaveClass('current');
    });
});

describe('MyResponsiveScoreBoard', () => {
    const data = [
        {
            Stage: 'Stage 1',
            values: 6,
        },
        {
            Stage: 'Stage 2',
            values: 8,
        },
        {
            Stage: 'Stage 3',
            values: 10,
        },
        {
            Stage: 'Stage 4',
            values: 3,
        },
    ];

    // polyfill ResizeObserver
    window.ResizeObserver = ResizeObserver;

    it('renders the chart correctly', () => {
        const { container } = render(<MyResponsiveScoreBoard data={data} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});

describe('MyResponsiveBar', () => {
    const data = [
        { Stage: 'Stage 1', values: 20 },
        { Stage: 'Stage 2', values: 50 },
        { Stage: 'Stage 3', values: 30 },
    ];
    const largestValue = 60;

    it('renders the chart correctly', () => {
        const { container } = render(
            <MyResponsiveBar data={data} largestValue={largestValue} />
        );
        expect(container.firstChild).toMatchSnapshot();
    });
});

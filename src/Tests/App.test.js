import { render, screen } from '@testing-library/react';
import React from 'react';
import DragDropFile from "../Components/DragDropFile";

describe("Render Learn React App", () => {
    let onActionMock;
    beforeEach(() => {
        onActionMock = jest.fn();
    });

    it('renders without crashing', () => {
        render(<DragDropFile onAction={onActionMock} />);
    });
});

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ChatbotDashboard from './ChatbotDashboard';
import '@testing-library/jest-dom';
import ActionProvider from './ActionProvider';
import MessageParser from './MessageParser';


describe('ChatbotDashboard', () => {
  it('renders chatbot icon when collapsed', () => {
    render(<ChatbotDashboard />);
    const chatbotIcon = screen.getByTestId('chatbot-icon');
    expect(chatbotIcon).toBeInTheDocument();
  });
});
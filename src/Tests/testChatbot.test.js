// import React from 'react';
// import { render, screen, fireEvent } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import ChatbotDashboard from '../Chatbot/ChatbotDashboard'; // link to chatbot directory


// describe('ChatbotDashboard', () => {
//     //test basic function of the chatbot icon
//     //whether it render, expand, and collapse successfully
//   it('should render chatbot icon initially', () => {
//     render(<ChatbotDashboard />);
//     const chatbotIcon = screen.getByRole('button');
//     expect(chatbotIcon).toBeInTheDocument();
//     expect(chatbotIcon).toHaveAttribute('aria-label', 'Open chatbot');
//   });

//   it('should expand chatbot on icon click', () => {
//     render(<ChatbotDashboard />);
//     const chatbotIcon = screen.getByRole('button');
//     fireEvent.click(chatbotIcon);
//     const closeButton = screen.getByRole('button', { name: 'Close chatbot' });
//     expect(closeButton).toBeInTheDocument();
//   });

//   it('should collapse chatbot on close icon click', () => {
//     render(<ChatbotDashboard />);
//     const chatbotIcon = screen.getByRole('button');
//     fireEvent.click(chatbotIcon);

//     const closeButton = screen.getByRole('button', { name: 'Close chatbot' });
//     fireEvent.click(closeButton);

//     expect(chatbotIcon).toBeInTheDocument();
//   });
// });


import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
//import '@testing-library/jest-dom';
import ChatbotDashboard from '../Chatbot/ChatbotDashboard';

describe('ChatbotDashboard', () => {
  it('should render chatbot icon initially', () => {
    render(<ChatbotDashboard />);
    const chatbotIcon = screen.getByRole('button');
    expect(chatbotIcon).toBeInTheDocument();
    expect(chatbotIcon).toHaveAttribute('aria-label', 'Open chatbot');
  });

  it('should expand chatbot on icon click', () => {
    render(<ChatbotDashboard />);
    const chatbotIcon = screen.getByRole('button');
    fireEvent.click(chatbotIcon);
    const closeButton = screen.getByRole('button', { name: 'Close chatbot' });
    expect(closeButton).toBeInTheDocument();
  });

  it('should collapse chatbot on close icon click', () => {
    render(<ChatbotDashboard />);
    const chatbotIcon = screen.getByRole('button');
    fireEvent.click(chatbotIcon);
    const closeButton = screen.getByRole('button', { name: 'Close chatbot' });
    fireEvent.click(closeButton);
    expect(chatbotIcon).toBeInTheDocument();
  });
});
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../../components/Navbar';

// Mock useNavigate hook
const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe('Navbar Component', () => {
  beforeEach(() => {
    // Clear mock calls between tests
    mockedUsedNavigate.mockClear();
  });

  test('NAV001: renders all navigation links', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/about/i)).toBeInTheDocument();
    expect(screen.getByText(/contact/i)).toBeInTheDocument();
  });

  test('NAV002: logo click navigates to home', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const logo = screen.getByAltText(/logo/i);
    fireEvent.click(logo);
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/');
  });

  test('NAV003: shows user menu when logged in', () => {
    render(
      <BrowserRouter>
        <Navbar isAuthenticated={true} />
      </BrowserRouter>
    );
    expect(screen.getByText(/profile/i)).toBeInTheDocument();
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });

  test('NAV004: toggles mobile menu', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const menuButton = screen.getByRole('button', { name: /menu/i });
    fireEvent.click(menuButton);
    expect(screen.getByRole('navigation')).toHaveClass('mobile-menu-open');
  });

  test('NAV005: logout functionality', () => {
    const mockLogout = jest.fn();
    render(
      <BrowserRouter>
        <Navbar isAuthenticated={true} onLogout={mockLogout} />
      </BrowserRouter>
    );
    const logoutButton = screen.getByText(/logout/i);
    fireEvent.click(logoutButton);
    expect(mockLogout).toHaveBeenCalled();
  });

  test('NAV006: active link highlight', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );
    const homeLink = screen.getByText(/home/i).closest('a');
    expect(homeLink).toHaveClass('active');
  });
}); 
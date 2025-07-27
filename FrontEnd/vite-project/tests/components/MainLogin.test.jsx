import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MainLogin from '../../components/MainLogin';

describe('MainLogin Component', () => {
  test('LOG001: renders login form', () => {
    render(<MainLogin />);
    
    // Check for form elements
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByText(/forgot password/i)).toBeInTheDocument();
  });

  test('LOG002: validates email input', async () => {
    render(<MainLogin />);
    
    const emailInput = screen.getByLabelText(/email/i);
    
    // Test empty email
    await userEvent.type(emailInput, '');
    fireEvent.blur(emailInput);
    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    
    // Test invalid email format
    await userEvent.type(emailInput, 'invalid-email');
    fireEvent.blur(emailInput);
    expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();
    
    // Test valid email
    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, 'test@example.com');
    fireEvent.blur(emailInput);
    expect(screen.queryByText(/invalid email format/i)).not.toBeInTheDocument();
  });

  test('LOG003: validates password input', async () => {
    render(<MainLogin />);
    
    const passwordInput = screen.getByLabelText(/password/i);
    
    // Test empty password
    await userEvent.type(passwordInput, '');
    fireEvent.blur(passwordInput);
    expect(screen.getByText(/password is required/i)).toBeInTheDocument();
    
    // Test password too short
    await userEvent.type(passwordInput, '123');
    fireEvent.blur(passwordInput);
    expect(screen.getByText(/password must be at least 6 characters/i)).toBeInTheDocument();
    
    // Test valid password
    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, 'password123');
    fireEvent.blur(passwordInput);
    expect(screen.queryByText(/password must be at least 6 characters/i)).not.toBeInTheDocument();
  });

  test('LOG004: handles successful login', async () => {
    const mockLogin = jest.fn().mockResolvedValue({ success: true });
    render(<MainLogin onLogin={mockLogin} />);
    
    // Fill in form
    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'password123');
    
    // Submit form
    await userEvent.click(screen.getByRole('button', { name: /login/i }));
    
    // Check if login function was called with correct data
    expect(mockLogin).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123'
    });
    
    // Wait for success message
    await waitFor(() => {
      expect(screen.getByText(/login successful/i)).toBeInTheDocument();
    });
  });

  test('LOG005: handles login error', async () => {
    const mockLogin = jest.fn().mockRejectedValue(new Error('Invalid credentials'));
    render(<MainLogin onLogin={mockLogin} />);
    
    // Fill in form
    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'wrongpassword');
    
    // Submit form
    await userEvent.click(screen.getByRole('button', { name: /login/i }));
    
    // Check for error message
    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });

  test('LOG006: shows loading state during submission', async () => {
    const mockLogin = jest.fn().mockImplementation(() => new Promise(resolve => setTimeout(resolve, 1000)));
    render(<MainLogin onLogin={mockLogin} />);
    
    // Fill in form
    await userEvent.type(screen.getByLabelText(/email/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/password/i), 'password123');
    
    // Submit form
    await userEvent.click(screen.getByRole('button', { name: /login/i }));
    
    // Check loading state
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeDisabled();
  });

  test('handles forgot password click', async () => {
    const mockForgotPassword = jest.fn();
    render(<MainLogin onForgotPassword={mockForgotPassword} />);
    
    await userEvent.click(screen.getByText(/forgot password/i));
    expect(mockForgotPassword).toHaveBeenCalled();
  });
}); 
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProfilePanel from '../../components/ProfilePanel';

const mockProfileData = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '1234567890',
  address: '123 Main St',
  profilePicture: 'https://example.com/profile.jpg'
};

describe('ProfilePanel Component', () => {
  test('PRF001: renders profile data correctly', () => {
    render(<ProfilePanel profileData={mockProfileData} />);
    
    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
    expect(screen.getByDisplayValue('john@example.com')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1234567890')).toBeInTheDocument();
    expect(screen.getByDisplayValue('123 Main St')).toBeInTheDocument();
    expect(screen.getByAltText('Profile Picture')).toHaveAttribute('src', mockProfileData.profilePicture);
  });

  test('PRF002: validates form inputs', async () => {
    render(<ProfilePanel profileData={mockProfileData} />);
    
    // Test email validation
    const emailInput = screen.getByLabelText(/email/i);
    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, 'invalid-email');
    fireEvent.blur(emailInput);
    expect(screen.getByText(/invalid email format/i)).toBeInTheDocument();

    // Test phone validation
    const phoneInput = screen.getByLabelText(/phone/i);
    await userEvent.clear(phoneInput);
    await userEvent.type(phoneInput, 'abc');
    fireEvent.blur(phoneInput);
    expect(screen.getByText(/invalid phone number/i)).toBeInTheDocument();
  });

  test('PRF003: handles profile update', async () => {
    const mockUpdate = jest.fn().mockResolvedValue({ success: true });
    render(<ProfilePanel profileData={mockProfileData} onUpdate={mockUpdate} />);

    const nameInput = screen.getByLabelText(/name/i);
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, 'Jane Doe');

    const submitButton = screen.getByRole('button', { name: /save/i });
    await userEvent.click(submitButton);

    expect(mockUpdate).toHaveBeenCalledWith(expect.objectContaining({
      name: 'Jane Doe'
    }));
  });

  test('PRF004: handles image upload', async () => {
    const file = new File(['test'], 'test.png', { type: 'image/png' });
    render(<ProfilePanel profileData={mockProfileData} />);

    const input = screen.getByLabelText(/profile picture/i);
    await userEvent.upload(input, file);

    expect(input.files[0]).toBe(file);
    expect(screen.getByText(/test\.png/i)).toBeInTheDocument();
  });

  test('PRF005: displays error state', async () => {
    const mockError = new Error('Failed to update profile');
    render(<ProfilePanel error={mockError} profileData={mockProfileData} />);

    expect(screen.getByText(/failed to update profile/i)).toBeInTheDocument();
  });

  test('PRF006: shows loading state during update', async () => {
    const mockUpdate = jest.fn().mockImplementation(() => new Promise(resolve => setTimeout(resolve, 1000)));
    render(<ProfilePanel profileData={mockProfileData} onUpdate={mockUpdate} />);

    const submitButton = screen.getByRole('button', { name: /save/i });
    await userEvent.click(submitButton);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });
}); 
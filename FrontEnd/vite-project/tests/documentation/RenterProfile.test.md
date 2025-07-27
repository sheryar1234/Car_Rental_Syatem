# Unit Test Plan for RenterProfilePanel Component

## INTRODUCTION
The purpose of this Unit Test Plan is to document the testing approach and test cases for the RenterProfilePanel component.
This component handles renter-specific profile management and property listing functionality.

## TEST ENVIRONMENT
- Jest development at v29.x
- React Testing Library
- Mock API services
- Mock file upload service

## TEST APPROACH
1. Test profile data management
2. Test property listing management
3. Test booking management
4. Test earnings and statistics
5. Test document verification
6. Test notification handling

## TEST REPORTING
Test results will be reported in the following format:
- Test case ID
- Test description
- Expected result
- Actual result
- Pass/fail status

## TEST DELIVERABLES
- Unit test code
- Integration test results
- UI/UX test results
- Test coverage report

## UNIT TEST RESULTS/REPORT

| Test ID | Test Case Description | Input/Action | Expected Result | Status |
|---------|---------------------|--------------|-----------------|--------|
| RPP001 | Render renter profile | Load profile | Display all sections | - |
| RPP002 | Update renter details | Edit profile info | Profile updated | - |
| RPP003 | Add new property | Submit property form | Property listed | - |
| RPP004 | Edit property listing | Modify property | Changes saved | - |
| RPP005 | Delete property | Remove listing | Property removed | - |
| RPP006 | View booking requests | Load bookings | List displayed | - |
| RPP007 | Accept booking | Approve request | Booking confirmed | - |
| RPP008 | Reject booking | Deny request | Booking rejected | - |
| RPP009 | View earnings | Load statistics | Data displayed | - |
| RPP010 | Upload documents | Submit documents | Docs verified | - |
| RPP011 | Set availability | Update calendar | Dates updated | - |
| RPP012 | View reviews | Load reviews | Reviews listed | - |
| RPP013 | Respond to reviews | Submit response | Response posted | - |
| RPP014 | Update pricing | Change rates | Prices updated | - |
| RPP015 | View notifications | Load alerts | Alerts shown | - |

## Test Cases Implementation

```jsx
// tests/components/RenterProfilePanel.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenterProfilePanel from '../../components/RenterProfilePanel';

const mockRenterData = {
  id: 'renter-1',
  name: 'John Doe',
  email: 'john@example.com',
  phone: '1234567890',
  properties: [
    {
      id: 'prop-1',
      title: 'Beach House',
      price: 200,
      location: 'Beach Road'
    }
  ],
  bookings: [
    {
      id: 'book-1',
      propertyId: 'prop-1',
      startDate: '2024-03-01',
      endDate: '2024-03-05',
      status: 'pending'
    }
  ],
  earnings: {
    total: 5000,
    thisMonth: 1200
  }
};

describe('RenterProfilePanel Component', () => {
  test('RPP001: renders renter profile correctly', () => {
    render(<RenterProfilePanel renterData={mockRenterData} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Beach House')).toBeInTheDocument();
    expect(screen.getByText('$5,000')).toBeInTheDocument();
  });

  test('RPP002: updates renter details', async () => {
    const mockUpdate = jest.fn();
    render(<RenterProfilePanel renterData={mockRenterData} onUpdate={mockUpdate} />);
    
    await userEvent.click(screen.getByText(/edit profile/i));
    await userEvent.clear(screen.getByLabelText(/name/i));
    await userEvent.type(screen.getByLabelText(/name/i), 'Jane Doe');
    await userEvent.click(screen.getByText(/save/i));
    
    expect(mockUpdate).toHaveBeenCalledWith(expect.objectContaining({
      name: 'Jane Doe'
    }));
  });

  test('RPP003: adds new property listing', async () => {
    const mockAddProperty = jest.fn();
    render(<RenterProfilePanel renterData={mockRenterData} onAddProperty={mockAddProperty} />);
    
    await userEvent.click(screen.getByText(/add property/i));
    await userEvent.type(screen.getByLabelText(/title/i), 'Mountain Cabin');
    await userEvent.type(screen.getByLabelText(/price/i), '150');
    await userEvent.type(screen.getByLabelText(/location/i), 'Mountain View');
    await userEvent.click(screen.getByText(/submit/i));
    
    expect(mockAddProperty).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Mountain Cabin',
      price: 150,
      location: 'Mountain View'
    }));
  });

  test('RPP006: displays booking requests', async () => {
    render(<RenterProfilePanel renterData={mockRenterData} />);
    
    await userEvent.click(screen.getByText(/bookings/i));
    expect(screen.getByText('March 1, 2024')).toBeInTheDocument();
    expect(screen.getByText('March 5, 2024')).toBeInTheDocument();
    expect(screen.getByText(/pending/i)).toBeInTheDocument();
  });

  test('RPP007: handles booking acceptance', async () => {
    const mockAcceptBooking = jest.fn();
    render(<RenterProfilePanel renterData={mockRenterData} onAcceptBooking={mockAcceptBooking} />);
    
    await userEvent.click(screen.getByText(/bookings/i));
    await userEvent.click(screen.getByText(/accept/i));
    
    expect(mockAcceptBooking).toHaveBeenCalledWith('book-1');
  });

  test('RPP009: displays earnings statistics', async () => {
    render(<RenterProfilePanel renterData={mockRenterData} />);
    
    await userEvent.click(screen.getByText(/earnings/i));
    expect(screen.getByText('$5,000')).toBeInTheDocument();
    expect(screen.getByText('$1,200')).toBeInTheDocument();
  });
}); 
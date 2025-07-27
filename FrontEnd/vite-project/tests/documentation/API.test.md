# Unit Test Plan for API Endpoints

## INTRODUCTION
The purpose of this Unit Test Plan is to document the testing approach and test cases for the backend API endpoints.
This includes all REST API endpoints and their integration with the database.

## TEST ENVIRONMENT
- Jest
- Supertest for API testing
- MongoDB test database
- Mock authentication middleware

## TEST APPROACH
1. Test all CRUD operations
2. Test input validation
3. Test error handling
4. Test authentication/authorization
5. Test data integrity
6. Test API rate limiting

## TEST REPORTING
Test results will be reported in the following format:
- Test case ID
- Test description
- Expected result
- Actual result
- Pass/fail status

## TEST DELIVERABLES
- API test code
- Integration test results
- Performance test results
- Test coverage report

## UNIT TEST RESULTS/REPORT

| Test ID | Test Case Description | Input/Action | Expected Result | Status |
|---------|---------------------|--------------|-----------------|--------|
| API001 | Create new user profile | POST /api/users | Profile created | - |
| API002 | Get user profile | GET /api/users/:id | Profile returned | - |
| API003 | Update user profile | PUT /api/users/:id | Profile updated | - |
| API004 | Delete user profile | DELETE /api/users/:id | Profile deleted | - |
| API005 | List all properties | GET /api/properties | Properties list | - |
| API006 | Create new property | POST /api/properties | Property created | - |
| API007 | Update property | PUT /api/properties/:id | Property updated | - |
| API008 | Delete property | DELETE /api/properties/:id | Property deleted | - |
| API009 | Search properties | GET /api/properties/search | Filtered results | - |
| API010 | Create booking | POST /api/bookings | Booking created | - |
| API011 | Get booking details | GET /api/bookings/:id | Booking returned | - |
| API012 | Update booking | PUT /api/bookings/:id | Booking updated | - |
| API013 | Cancel booking | DELETE /api/bookings/:id | Booking cancelled | - |
| API014 | List user bookings | GET /api/users/:id/bookings | Bookings list | - |
| API015 | Create review | POST /api/reviews | Review created | - |
| API016 | Get property reviews | GET /api/properties/:id/reviews | Reviews list | - |
| API017 | Update review | PUT /api/reviews/:id | Review updated | - |
| API018 | Delete review | DELETE /api/reviews/:id | Review deleted | - |
| API019 | Rate property | POST /api/properties/:id/rate | Rating updated | - |
| API020 | Get property ratings | GET /api/properties/:id/ratings | Ratings returned | - |

## Test Cases Implementation

```javascript
// tests/api/endpoints.test.js
const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const { setupTestDB } = require('../utils/testDB');

describe('API Endpoints', () => {
  beforeAll(async () => {
    await setupTestDB();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('User Profile API', () => {
    test('API001: creates new user profile', async () => {
      const response = await request(app)
        .post('/api/users')
        .send({
          name: 'John Doe',
          email: 'john@example.com',
          phone: '1234567890'
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe('John Doe');
    });

    test('API002: gets user profile', async () => {
      const userId = 'test-user-id';
      const response = await request(app)
        .get(`/api/users/${userId}`)
        .set('Authorization', `Bearer ${testToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('email');
    });

    // Add more test implementations...
  });

  describe('Property API', () => {
    test('API005: lists all properties', async () => {
      const response = await request(app)
        .get('/api/properties');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    // Add more test implementations...
  });
}); 
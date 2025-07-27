# Test Documentation

This directory contains unit tests and test documentation for the FYP-Web frontend components.

## Directory Structure

```
tests/
├── components/           # Component test files
│   ├── Navbar.test.jsx
│   ├── ProfilePanel.test.jsx
│   ├── RenterProfilePanel.test.jsx
│   └── MainLogin.test.jsx
├── documentation/        # Test documentation files
│   ├── Navbar.test.md
│   ├── ProfilePanel.test.md
│   ├── RenterProfilePanel.test.md
│   └── MainLogin.test.md
└── README.md            # This file
```

## Setup

1. Install test dependencies:
```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

2. Run tests:
```bash
npm test
``` 
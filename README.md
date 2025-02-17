# Mintall NFT Certificate API

## Project Overview

`mintall-nft-cert-api` is an API for NFT minting and verification, built using the NestJS framework and supporting the CW721 standard on the Firmachain blockchain.

## Technology Stack

- **Backend Framework**: NestJS v11.0.0
- **Runtime Environment**: Node.js v23.6.0
- **Blockchain**: Firmachain (Cosmos SDK) - CW721 Standard
- **Caching**: Redis v7.x
- **Database**: PostgreSQL
- **Package Manager**: Yarn 4.6.0 (node_modules)
- **Metadata Standard**: C2PA - JSON-LD Format

## Environment Variables

Create a `.envrc` file in the root directory of the project and add the following environment variables:

```plaintext
# Database Configuration
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=your_db_user
DATABASE_PASSWORD=your_db_password
DATABASE_NAME=your_db_name

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password

# JWT Configuration
JWT_SECRET=your_jwt_secret

# Other Configuration
NODE_ENV=development
PORT=3000
```

## Installation

Ensure you have Node.js and Yarn installed, then run the following command to install project dependencies:

```bash
yarn
```

## Running the Project

### Local Environment for debugging

Use the following command to start the local server:

```bash
yarn start:debug
```

### Development Environment

Use the following command to start the development server:

```bash
yarn start:dev
```

### Production Environment

Build the project and start the production server:

```bash
yarn start:prod
```

## API Endpoints

### 1. Health Check API

- **Method**: GET
- **Endpoint**: `/healthcheck`
- **Description**: Check the health status of the API

### 2. Minting API

- **Method**: POST
- **Endpoint**: `/api/mint/create`
- **Description**: Mint an NFT certificate

### 3. Verification API

- **Method**: GET
- **Endpoint**: `/api/verification/check`
- **Description**: Verify an NFT certificate

## Project Structure

```
src/
  ├── modules/
  │   ├── entities/
  │   ├── mint/
  │   │   ├── controller/
  │   │   ├── service/
  │   │   ├── dto/
  │   │   └── interface/
  │   └── verification/
  ├── common/
  │   ├── constants/
  │   ├── exceptions/
  │   ├── guard/
  │   ├── interceptor/
  │   └── utils/
  ├── shared/
  │   ├── redis/
  │   └── firma/
  └── config/
```

## Contributing

Contributions are welcome! Please ensure all tests pass and adhere to ESLint standards before submitting a PR.

## License

MIT License



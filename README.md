# Mintall NFT Certificate API

## Project Overview

`proof-of-creation-mintall` is an API for NFT minting and verification, built using the NestJS framework and supporting the CW721 standard on the Firmachain blockchain.

## Technology Stack

- **Backend Framework**: NestJS v11.0.0
- **Runtime Environment**: Node.js v23.6.0
- **Blockchain**: Firmachain (Cosmos SDK) - CW721 Standard
- **Caching**: Redis v7.x
- **Database**: PostgreSQL
- **Package Manager**: Yarn 4.6.0 (node_modules)
- **Metadata Standard**: C2PA - JSON-LD Format

## Environment Variables

### Local Environment

Create a `.env` file in the root directory of the project and add the following environment variables:

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

### Development & Production Environment (Get from AWS Secrets Manager)

Use `ecosystem.config.js` to start with {env}.

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

## Deployment

### Development with Container

The application is automatically deployed to the development environment using GitHub Actions CI/CD pipeline when changes are pushed to the `develop` branch. The workflow:

1. Builds a Docker image with the tag format `{service-name}.v{version}-dev.{number}`
2. Pushes the image to AWS ECR
3. Deploys the container to the development server

### Production

The application is automatically deployed to the production environment using GitHub Actions CI/CD pipeline when:

1. A new release tag is created (format: `v{major}.{minor}.{patch}`)
2. Changes are merged to the `master` branch
3. coming soon

### CI/CD Pipeline

Our deployment process is fully automated using GitHub Actions. The pipeline consists of:

1. **Test Workflow**: Runs tests on code changes
2. **Semantic Release**: Automatically generates version numbers based on commit messages
3. **Build**: Builds and pushes Docker images to AWS ECR
4. **Deploy**: Deploys Docker containers to the appropriate environment

No manual deployment is required. The system automatically detects changes, builds Docker images, and deploys them to the correct environment.

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
  │   ├── guards/
  │   ├── interceptors/
  │   ├── dto/
  │   └── utils/
  ├── shared/
  │   ├── redis/
  │   └── firma/
  ├── config/
  │   ├── redis.config
  └── └── load.config
```

## Contributing

Contributions are welcome! Please ensure all tests pass and adhere to ESLint standards before submitting a PR.

## License

MIT License

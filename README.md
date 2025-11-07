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

### Configuration Loading (`ENV_FROM`)

The application supports three configuration loading modes via the `ENV_FROM` environment variable:

#### 1. `ENV_FROM=system`
Load all configuration from system environment variables or root `.env` file.

```bash
ENV_FROM=system
DATABASE_HOST=localhost
DATABASE_PASSWORD=your_password
# ... all other required variables
```

#### 2. `ENV_FROM=file`
Load configuration from a specific file path. If `ENV_FILE_PATH` is not set, defaults to `config/.env`.

First, copy the example file:
```bash
cp config/.env.example config/.env
```

Then fill in your configuration values and run:
```bash
ENV_FROM=file yarn start:dev
# Or specify a custom path:
ENV_FROM=file ENV_FILE_PATH=config/.env.development yarn start:dev
```

#### 3. `ENV_FROM=aws`
Load configuration from AWS Secrets Manager and SSM Parameter Store (for production).

```bash
ENV_FROM=aws
AWS_REGION=ap-southeast-1
AWS_SECRET_NAME=/dev/mintall-nft-cert-api
```

### Local Development Setup

1. Copy `.env.example` to `.env`
2. Set `ENV_FROM=system` and configure your database/redis settings
3. Run `yarn start:debug`

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

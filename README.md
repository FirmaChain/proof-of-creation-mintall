# Proof of Creation API

An API for NFT minting and verification on Firmachain blockchain, supporting the CW721 standard.

## Technology Stack

- **Backend**: NestJS v11.0.0
- **Runtime**: Node.js v23.6.0
- **Blockchain**: Firmachain (Cosmos SDK) - CW721 Standard
- **Database**: PostgreSQL
- **Cache**: Redis v7.x
- **Package Manager**: Yarn 4.6.0
- **Metadata Standard**: C2PA - JSON-LD Format

## Prerequisites

Before running this application, ensure you have the following services running:

- **PostgreSQL** - Required for data persistence
- **Redis** - Required for caching

## Installation

```bash
yarn install
```

## Configuration

### Environment Variables (`ENV_FROM`)

The application supports three configuration loading modes:

#### 1. `ENV_FROM=system`
Load from system environment variables.

```bash
ENV_FROM=system
DATABASE_HOST=localhost
DATABASE_PASSWORD=your_password
# ... other variables
```

#### 2. `ENV_FROM=file`
Load from a specific file. Defaults to `config/.env` if `ENV_FILE_PATH` is not set.

```bash
ENV_FROM=file
ENV_FILE_PATH=config/.env.development  # Optional
```

#### 3. `ENV_FROM=aws`
Load from AWS Secrets Manager (production use).

```bash
ENV_FROM=aws
AWS_REGION=ap-southeast-1
AWS_SECRET_NAME=/dev/mintall-nft-cert-api
```

### Quick Start

1. Copy the example configuration:
   ```bash
   cp config/.env.example config/.env
   ```

2. Edit `config/.env` with your database and Redis settings

3. Run the application

## Running the Application

### Local Development

```bash
# Start in debug mode
yarn start:debug

# Start in development mode
yarn start:dev

# Build and run
yarn build
yarn start
```

### Docker

#### Build and run with Docker Compose

```bash
cd docker
docker-compose up -d
```

**Note**: Ensure PostgreSQL and Redis containers are on the same Docker network (`app-network`).

#### Create the network if it doesn't exist:
```bash
docker network create app-network
```

## API Endpoints

- `GET /healthcheck` - Health check
- `POST /api/mint/create` - Mint NFT certificate
- `GET /api/verification/check` - Verify NFT certificate

## CI/CD

The project uses GitHub Actions for automated workflows:

- **Test Workflow** - Runs on PRs and pushes to `develop`/`staging`/`main`
- **Semantic Release** - Automatically generates version numbers and releases based on commit messages

### Branch Strategy

- `develop` - Development environment
- `staging` - Staging environment for testing
- `main` - Production environment

## Project Structure

```
src/
├── modules/          # Feature modules
│   ├── entities/
│   ├── mint/
│   └── verification/
├── common/           # Shared utilities
├── shared/           # Shared services (Redis, Firma)
└── config/           # Configuration files
```

## Contributing

Contributions are welcome! Please ensure all tests pass before submitting a PR:

```bash
yarn test
```

## License

MIT License

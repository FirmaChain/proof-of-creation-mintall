# mintall-nft-cert-api

## Project Overview

`mintall-nft-cert-api` is an API for NFT minting and verification, built using the NestJS framework and supporting the CW721 standard on the Firmachain blockchain.

## Technology Stack

| Category | Technology | Version |
| --- | --- | --- |
| Backend Framework | NestJS | v10.x |
| Runtime Environment | Node.js | v20.x |
| Blockchain | Firmachain (Cosmos SDK) | CW721 Standard |
| Caching | Redis | v7.x |
| Database | MySQL / MongoDB | Latest |
| Package Manager | npm / yarn / pnpm | Latest |
| Metadata Standard | C2PA | JSON-LD Format |

## API Protocol Definition

### 1.1 General Information

| Field | Description |
| --- | --- |
| **API Name** | NFT Minting & Verification API |
| **Version** | v1.0 |
| **Base URL** | `<To Be Added>` |
| **Authentication** | API Key / JWT |
| **Content Type** | `application/json` |

### 1.2 Security & Authentication

| Security Aspect | Description |
| --- | --- |
| **Authentication** | API Key (Bearer Token) |
| **Authorization** | Role-based API access (minting requires admin rights) |
| **Data Encryption** | HTTPS / TLS 1.2+ |
| **Permission Model** | Users can mint NFTs, but only admin accounts can manage transfers |

Example API Request:

```
GET /verify?imageHash=a94a8fe5ccb19ba61c4c0873d391e987982fbbd3
Authorization: Bearer YOUR_API_KEY
```

### 1.3 API Endpoints

| Name | Method | Endpoint | Description |
| --- | --- | --- | --- |
| Minting API | **POST** | `/mint` | Mint an NFT certificate |
| Verification API | **GET** | `/verify` | Verify an NFT certificate |

## API Specification

### 2.1 Minting API

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `imageHash` | `string` | ✅ Yes | SHA-256 hash of the image |
| `imagePerceptualHash` | `string` | ✅ Yes | Perceptual hash for similarity checking |
| `version` | `string` | ✅ Yes | API version (`1.0`) |
| `c2paMetadata` | `object` | ❌ No | C2PA metadata, including creator, source, and timestamp |
| `creatorName` | `string` | ❌ No | Name of the image creator |

### 2.2 Verification API

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `key` | `string` | ✅ Yes | The search key, must be one of `imageHash`, `tokenId`, or `transactionHash` |
| `value` | `string` | ✅ Yes | The value corresponding to the search key |

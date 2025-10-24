# NFT Certificate API Usage Examples

> **Open Source Project by Firmachain**
> This is an open source project developed and maintained by Firmachain.
> GitHub: https://github.com/FirmaChain/proof-of-creation-mintall

## Overview

The NFT Certificate API provides endpoints for minting and verifying NFT certificates for digital content authentication on the Firmachain blockchain. This API enables creators to mint NFTs as proof of creation and verify the authenticity of digital assets.

## Base URL

```
https://mintall-api.firmachain.dev/api
```

For local development:
```
http://localhost:13000/api
```

## Authentication

All API requests require authentication using a Bearer token in the Authorization header:

```
Authorization: Bearer YOUR_API_KEY
```

## API Endpoints

### 1. Mint NFT Certificate

**Endpoint:** `POST /mint/create`

Creates a new NFT certificate on the blockchain for digital content verification.

**Request:**
- Method: `POST`
- Headers:
  - `Authorization`: Bearer YOUR_API_KEY
  - `Content-Type`: application/json
- Body:
```json
{
  "imageHash": "string",           // Required: SHA-256 hash of the image
  "imagePerceptualHash": "string",  // Required: Perceptual hash for similarity checking
  "version": "string",              // Required: API version (e.g., "1.0")
  "c2paMetadata": {},              // Optional: C2PA metadata object
  "creatorName": "string",         // Optional: Name of the content creator
  "imageUrl": "string"             // Optional: URL of the image
}
```

**Response (201 Created):**
```json
{
  "status": "success",
  "statusCode": 200,
  "message": "Request successful",
  "data": {
    "tokenId": "string",
    "transactionHash": "string"
  }
}
```

**Error Response (400/500):**
```json
{
  "status": "error",
  "statusCode": 400,
  "message": "NFT mint failed"
}
```

---

### 2. Verify NFT Certificate

**Endpoint:** `GET /verification/check`

Verifies an existing NFT certificate using various search parameters.

**Request:**
- Method: `GET`
- Headers:
  - `Authorization`: Bearer YOUR_API_KEY
- Query Parameters:
  - `key`: Search key type (`imageHash`, `tokenId`, or `transactionHash`)
  - `value`: The value corresponding to the search key

**Response (200 OK):**
```json
{
  "status": "success",
  "statusCode": 200,
  "message": "Request successful",
  "data": "<NFT metadata URL>"
}
```

**Error Response (404 Not Found):**
```json
{
  "status": "error",
  "statusCode": 404,
  "message": "NFT certificate not found"
}
```

---

## Status Codes

- **200 OK** - Request successful
- **201 Created** - NFT minted successfully
- **400 Bad Request** - Invalid parameters
- **401 Unauthorized** - API Key missing or invalid
- **403 Forbidden** - Permission denied
- **404 Not Found** - NFT certificate not found
- **500 Internal Server Error** - Server error

## Usage Examples

### JavaScript/TypeScript

```javascript
// Using Fetch API
class NFTCertificateAPI {
  constructor(baseUrl = 'https://mintall-api.firmachain.dev/api', apiKey) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
    this.headers = {
      'Authorization': `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json'
    };
  }

  /**
   * Mint a new NFT certificate
   * @param {Object} certificateData - The certificate data
   * @returns {Promise<Object>} - The minted NFT details
   */
  async mintCertificate(certificateData) {
    const response = await fetch(`${this.baseUrl}/mint/create`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        imageHash: certificateData.imageHash,
        imagePerceptualHash: certificateData.imagePerceptualHash,
        version: '1.0',
        creatorName: certificateData.creatorName,
        imageUrl: certificateData.imageUrl,
        c2paMetadata: certificateData.c2paMetadata
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.data;
  }

  /**
   * Verify an NFT certificate
   * @param {string} key - Search key type (imageHash, tokenId, transactionHash)
   * @param {string} value - The value to search for
   * @returns {Promise<Object>} - The verification result
   */
  async verifyCertificate(key, value) {
    const params = new URLSearchParams({ key, value });

    const response = await fetch(`${this.baseUrl}/verification/check?${params}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.data;
  }

  /**
   * Generate SHA-256 hash from file
   * @param {File} file - The image file
   * @returns {Promise<string>} - The SHA-256 hash
   */
  async generateImageHash(file) {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
  }
}

// Example usage
async function example() {
  const api = new NFTCertificateAPI(
    'https://mintall-api.firmachain.dev/api',
    'YOUR_API_KEY'
  );

  try {
    // Mint NFT Certificate
    const certificateData = {
      imageHash: 'd59fb850442d09d25d34f31df8eeb8d2043bfa221546d9ef8c0ab9b12960f6db',
      imagePerceptualHash: '91ec30336dd5f176834818cc64ff6bb01b2ef0c7c3410ebe712b99664a9ab60f',
      creatorName: 'John Doe',
      imageUrl: 'https://example.com/image.png',
      c2paMetadata: {
        creator: 'John Doe',
        timestamp: new Date().toISOString()
      }
    };

    const mintResult = await api.mintCertificate(certificateData);
    console.log('NFT minted:', mintResult);

    // Verify NFT Certificate by token ID
    const verificationResult = await api.verifyCertificate('tokenId', mintResult.tokenId);
    console.log('Verification result:', verificationResult);

  } catch (error) {
    console.error('Error:', error);
  }
}
```

### Node.js with Axios

```javascript
const axios = require('axios');
const crypto = require('crypto');
const fs = require('fs');

class NFTCertificateAPI {
  constructor(baseUrl = 'https://mintall-api.firmachain.dev/api', apiKey) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      }
    });
  }

  async mintCertificate(certificateData) {
    try {
      const response = await this.client.post('/mint/create', {
        imageHash: certificateData.imageHash,
        imagePerceptualHash: certificateData.imagePerceptualHash,
        version: '1.0',
        creatorName: certificateData.creatorName,
        imageUrl: certificateData.imageUrl,
        c2paMetadata: certificateData.c2paMetadata
      });

      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  }

  async verifyCertificate(key, value) {
    try {
      const response = await this.client.get('/verification/check', {
        params: { key, value }
      });

      return response.data.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message);
    }
  }

  generateImageHash(filePath) {
    return new Promise((resolve, reject) => {
      const hash = crypto.createHash('sha256');
      const stream = fs.createReadStream(filePath);

      stream.on('data', data => hash.update(data));
      stream.on('end', () => resolve(hash.digest('hex')));
      stream.on('error', reject);
    });
  }
}

// Example usage
async function main() {
  const api = new NFTCertificateAPI(
    'https://mintall-api.firmachain.dev/api',
    'YOUR_API_KEY'
  );

  try {
    // Generate hash from image file
    const imageHash = await api.generateImageHash('./image.png');

    // Mint NFT Certificate
    const mintResult = await api.mintCertificate({
      imageHash: imageHash,
      imagePerceptualHash: 'generated_perceptual_hash',
      creatorName: 'John Doe',
      imageUrl: 'https://example.com/image.png'
    });

    console.log('NFT Certificate minted:', mintResult);

    // Verify by transaction hash
    const verification = await api.verifyCertificate(
      'transactionHash',
      mintResult.transactionHash
    );
    console.log('Verification result:', verification);

  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();
```

### Python

```python
import requests
import hashlib
import json
from pathlib import Path

class NFTCertificateAPI:
    def __init__(self, base_url="https://mintall-api.firmachain.dev/api", api_key=""):
        self.base_url = base_url
        self.api_key = api_key
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }

    def mint_certificate(self, certificate_data):
        """
        Mint a new NFT certificate

        Args:
            certificate_data: Dictionary containing certificate information

        Returns:
            Dictionary with tokenId and transactionHash
        """
        endpoint = f"{self.base_url}/mint/create"

        payload = {
            "imageHash": certificate_data["imageHash"],
            "imagePerceptualHash": certificate_data["imagePerceptualHash"],
            "version": "1.0",
            "creatorName": certificate_data.get("creatorName"),
            "imageUrl": certificate_data.get("imageUrl"),
            "c2paMetadata": certificate_data.get("c2paMetadata")
        }

        response = requests.post(endpoint, headers=self.headers, json=payload)

        if response.status_code == 201:
            return response.json()["data"]
        else:
            error = response.json()
            raise Exception(f"Minting failed: {error.get('message', 'Unknown error')}")

    def verify_certificate(self, key, value):
        """
        Verify an NFT certificate

        Args:
            key: Search key type (imageHash, tokenId, transactionHash)
            value: The value to search for

        Returns:
            NFT metadata URL
        """
        endpoint = f"{self.base_url}/verification/check"
        params = {"key": key, "value": value}

        response = requests.get(
            endpoint,
            headers={"Authorization": f"Bearer {self.api_key}"},
            params=params
        )

        if response.status_code == 200:
            return response.json()["data"]
        elif response.status_code == 404:
            raise Exception("NFT certificate not found")
        else:
            error = response.json()
            raise Exception(f"Verification failed: {error.get('message', 'Unknown error')}")

    @staticmethod
    def generate_image_hash(file_path):
        """
        Generate SHA-256 hash from image file

        Args:
            file_path: Path to the image file

        Returns:
            SHA-256 hash string
        """
        sha256_hash = hashlib.sha256()
        with open(file_path, "rb") as f:
            for byte_block in iter(lambda: f.read(4096), b""):
                sha256_hash.update(byte_block)
        return sha256_hash.hexdigest()

# Example usage
def main():
    # Initialize API client
    api = NFTCertificateAPI(
        base_url="https://mintall-api.firmachain.dev/api",
        api_key="YOUR_API_KEY"
    )

    try:
        # Generate hash from image
        image_hash = NFTCertificateAPI.generate_image_hash("./image.png")

        # Mint NFT Certificate
        certificate_data = {
            "imageHash": image_hash,
            "imagePerceptualHash": "91ec30336dd5f176834818cc64ff6bb01b2ef0c7c3410ebe712b99664a9ab60f",
            "creatorName": "John Doe",
            "imageUrl": "https://example.com/image.png",
            "c2paMetadata": {
                "creator": "John Doe",
                "source": "Original Creation",
                "timestamp": "2024-01-01T00:00:00Z"
            }
        }

        mint_result = api.mint_certificate(certificate_data)
        print(f"NFT minted successfully!")
        print(f"Token ID: {mint_result['tokenId']}")
        print(f"Transaction Hash: {mint_result['transactionHash']}")

        # Verify the NFT certificate
        verification = api.verify_certificate("tokenId", mint_result["tokenId"])
        print(f"Verification successful: {verification}")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()
```

### cURL Examples

```bash
# Set your API key
API_KEY="YOUR_API_KEY"
BASE_URL="https://mintall-api.firmachain.dev/api"

# 1. Mint NFT Certificate
curl -X POST "$BASE_URL/mint/create" \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "imageHash": "d59fb850442d09d25d34f31df8eeb8d2043bfa221546d9ef8c0ab9b12960f6db",
    "imagePerceptualHash": "91ec30336dd5f176834818cc64ff6bb01b2ef0c7c3410ebe712b99664a9ab60f",
    "version": "1.0",
    "creatorName": "John Doe",
    "imageUrl": "https://example.com/image.png"
  }'

# Response:
# {
#   "status": "success",
#   "statusCode": 200,
#   "message": "Request successful",
#   "data": {
#     "tokenId": "12345",
#     "transactionHash": "0xabc123..."
#   }
# }

# 2. Verify NFT Certificate by Token ID
curl -X GET "$BASE_URL/verification/check?key=tokenId&value=12345" \
  -H "Authorization: Bearer $API_KEY"

# 3. Verify NFT Certificate by Transaction Hash
curl -X GET "$BASE_URL/verification/check?key=transactionHash&value=0xabc123..." \
  -H "Authorization: Bearer $API_KEY"

# 4. Verify NFT Certificate by Image Hash
curl -X GET "$BASE_URL/verification/check?key=imageHash&value=d59fb850442d09d25d34f31df8eeb8d2043bfa221546d9ef8c0ab9b12960f6db" \
  -H "Authorization: Bearer $API_KEY"
```

## Request/Response Schema

### Mint Request Schema

```json
{
  "type": "object",
  "required": ["imageHash", "imagePerceptualHash", "version"],
  "properties": {
    "imageHash": {
      "type": "string",
      "description": "SHA-256 hash of the image"
    },
    "imagePerceptualHash": {
      "type": "string",
      "description": "Perceptual hash for similarity checking"
    },
    "version": {
      "type": "string",
      "description": "API version",
      "default": "1.0"
    },
    "c2paMetadata": {
      "type": "object",
      "description": "C2PA metadata object"
    },
    "creatorName": {
      "type": "string",
      "description": "Name of the content creator"
    },
    "imageUrl": {
      "type": "string",
      "description": "URL of the image"
    }
  }
}
```

### Standard Response Schema

```json
{
  "type": "object",
  "properties": {
    "status": {
      "type": "string",
      "enum": ["success", "error"]
    },
    "statusCode": {
      "type": "integer",
      "description": "HTTP status code"
    },
    "message": {
      "type": "string",
      "description": "Response message"
    },
    "data": {
      "type": ["object", "string"],
      "description": "Response data"
    }
  }
}
```

## Error Handling

### Common Error Responses

**400 Bad Request**
```json
{
  "status": "error",
  "statusCode": 400,
  "message": "NFT mint failed - Invalid parameters"
}
```

**401 Unauthorized**
```json
{
  "status": "error",
  "statusCode": 401,
  "message": "Invalid or missing API key"
}
```

**404 Not Found**
```json
{
  "status": "error",
  "statusCode": 404,
  "message": "NFT certificate not found"
}
```

**500 Internal Server Error**
```json
{
  "status": "error",
  "statusCode": 500,
  "message": "Internal Server Error"
}
```

## Best Practices

1. **Image Hashing**: Always generate both SHA-256 and perceptual hashes before minting
2. **Error Handling**: Implement proper error handling for all API responses
3. **Rate Limiting**: Be mindful of rate limits in production
4. **Verification**: Always verify NFT certificates after minting to ensure success
5. **Metadata Storage**: Store transaction hashes and token IDs for future reference
6. **API Key Security**: Never expose your API key in client-side code
7. **Batch Processing**: For multiple certificates, implement queuing to avoid rate limits

## Testing

For testing and development, you can use the provided test values:

```javascript
const testData = {
  imageHash: "d59fb850442d09d25d34f31df8eeb8d2043bfa221546d9ef8c0ab9b12960f6db",
  imagePerceptualHash: "91ec30336dd5f176834818cc64ff6bb01b2ef0c7c3410ebe712b99664a9ab60f",
  version: "1.0",
  creatorName: "Test Creator"
};
```

## Related Websites & Resources

### 🔍 **Mintall Credentials Verify**
**URL:** https://credentials.mintall.ai/verify/

A verification platform for authenticating digital content credentials. Users can:
- Verify the authenticity of C2PA-enabled content
- Check digital signatures and metadata integrity
- Validate content provenance and creation history
- Upload and verify images with embedded C2PA metadata

### 🏛️ **Coalition for Content Provenance and Authenticity (C2PA)**
**URL:** https://c2pa.org/

The official website of the C2PA initiative, a joint effort by major tech companies to combat misinformation. Here you'll find:
- Technical specifications and standards documentation
- Implementation guidelines for C2PA compliance
- Industry news and updates on digital content authentication
- List of member organizations (Adobe, Microsoft, Intel, BBC, etc.)
- White papers and research on content provenance
- Developer resources and technical working groups

### 📜 **Content Credentials**
**URL:** https://contentcredentials.org/

Adobe's implementation of C2PA standards for content attribution. This site provides:
- Tools for creators to attach attribution to their work
- Free verification tools for checking content credentials
- Educational resources about content authenticity
- Case studies and real-world implementations
- Integration guides for creative software
- Best practices for content creators and publishers

## Integration with Proof of Creation

The Proof of Creation API implements C2PA standards and is compatible with the verification tools provided by these platforms. Content processed through our API can be:
- Verified on the Mintall Credentials platform
- Validated against C2PA specifications
- Checked using Content Credentials tools

## Support

This is an open source project developed by Firmachain.

For API support and questions:
- Documentation: https://mintall-api.firmachain.dev/docs
- GitHub: https://github.com/FirmaChain/proof-of-creation-mintall
- Email: info@firmachain.org
- Website: https://firmachain.org

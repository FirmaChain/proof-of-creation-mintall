// 1. AWS
// 1.1 AWS Secret Manager
export interface AwsSecretJson {
  ENCRYPT_PRIVATE_KEY: string;
  DATABASE_PASSWORD: string;
  FIXED_JWT_TOKEN: string;
}

// 1.2 AWS SSM Parameter
export interface SsmParameterJson {
  DATABASE_HOST: string;
  DATABASE_PORT: number;
  DATABASE_USER: string;
  REDIS_HOST: string;
  REDIS_PORT: number;
  REDIS_PASSWORD: string;
}

// 2. Local Secret
// 2.1 Local Secret
export interface LocalSecretJson {
  PRIVATE_KEY: string;
  DATABASE_PASSWORD: string;
  FIXED_JWT_TOKEN: string;
  DATABASE_HOST: string;
  DATABASE_PORT: number;
  DATABASE_USER: string;
  REDIS_HOST: string;
  REDIS_PORT: number;
  REDIS_PASSWORD?: string;
}

// 3. Vault Secret
// 3.1 Vault Database Secret
export interface VaultDatabaseSecret {
  data: {
    data: {
      DATABASE_HOST: string;
      DATABASE_PORT: string;
      DATABASE_USER: string;
      DATABASE_PASSWORD: string;
      DATABASE_NAME: string;
    };
  };
}

// 3.2 Vault Redis Secret
export interface VaultRedisSecret {
  data: {
    data: {
      REDIS_HOST: string;
      REDIS_PORT: string;
      REDIS_PASSWORD?: string;
    };
  };
}

// 3.3 Vault Service Secret
export interface VaultServiceSecret {
  data: {
    data: {
      PRIVATE_KEY: string;
      FIXED_JWT_TOKEN: string;
      DATABASE_NAME: string;
    };
  };
}

// Total Config
export interface DefaultConfig {
  PRIVATE_KEY: string;
  DATABASE_HOST: string;
  DATABASE_PORT: number;
  DATABASE_USER: string;
  DATABASE_PASSWORD: string;
  DATABASE_NAME: string;
  REDIS_HOST: string;
  REDIS_PORT: number;
  REDIS_PASSWORD?: string;
  FIXED_JWT_TOKEN: string;
}

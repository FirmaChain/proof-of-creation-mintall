import { Logger } from '@nestjs/common';
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';
import { KMSClient, DecryptCommand } from '@aws-sdk/client-kms';
import { GetParameterCommand, SSMClient } from '@aws-sdk/client-ssm';
interface AwsSecretJson {
  ENCRYPT_PRIVATE_KEY: string;
  DATABASE_PASSWORD: string;
  FIXED_JWT_TOKEN: string;
}

interface LocalSecretJson {
  PRIVATE_KEY: string;
  DATABASE_PASSWORD: string;
  FIXED_JWT_TOKEN: string;
  DATABASE_HOST: string;
  DATABASE_PORT: number;
  DATABASE_USERNAME: string;
  REDIS_HOST: string;
  REDIS_PORT: number;
  REDIS_PASSWORD: string;
}

interface DefaultConfig {
  PRIVATE_KEY: string;
  DATABASE_PASSWORD: string;
  FIXED_JWT_TOKEN: string;
}

interface SsmParameterJson {
  DATABASE_HOST: string;
  DATABASE_PORT: number;
  DATABASE_USERNAME: string;
  REDIS_HOST: string;
  REDIS_PORT: number;
  REDIS_PASSWORD: string;
}

let defaultConfig: DefaultConfig;

const logger = new Logger('Config load');

export const initConfig = async () => {
  try {
    // Load the secret data
    if (process.env.NODE_ENV !== 'local') {
      logger.log('Loading secrets from AWS secret manager...');
      const secretData = await loadAwsSecret();
      const privateKey = await decryptSecret(secretData.ENCRYPT_PRIVATE_KEY);
      const ssmConfig = await loadSsmConfig(process.env.AWS_SECRET_NAME);
      defaultConfig = {
        PRIVATE_KEY: privateKey as string,
        DATABASE_PASSWORD: secretData.DATABASE_PASSWORD,
        FIXED_JWT_TOKEN: secretData.FIXED_JWT_TOKEN,
        ...ssmConfig,
      };
    } else {
      // load local secret
      logger.log('Loading secrets from local .env file...');
      const secretData = loadLocalSecret();
      defaultConfig = {
        PRIVATE_KEY: secretData.PRIVATE_KEY,
        DATABASE_PASSWORD: secretData.DATABASE_PASSWORD,
        FIXED_JWT_TOKEN: secretData.FIXED_JWT_TOKEN,
      };
    }
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

// const load config from ssm
const loadSsmConfig = async (parameterName: string | undefined) => {
  try {
    if (!parameterName) {
      throw new Error('AWS SSM name is required.');
    }
    const client = new SSMClient({
      region: process.env.AWS_REGION || 'ap-southeast-1',
    });
    const command = new GetParameterCommand({
      Name: parameterName,
      WithDecryption: false,
    });
    const response = await client.send(command);
    if (!response.Parameter?.Value) {
      throw new Error('Failed to load config from ssm.');
    }
    const result = JSON.parse(response.Parameter.Value) as SsmParameterJson;
    return result;
  } catch (error) {
    console.error('Error getting parameter:', error);
    throw error;
  }
};

// load local secret when NODE_ENV is local
const loadLocalSecret = (): LocalSecretJson => {
  if (
    !process.env.PRIVATE_KEY ||
    !process.env.DATABASE_PASSWORD ||
    !process.env.FIXED_JWT_TOKEN ||
    !process.env.DATABASE_HOST ||
    !process.env.DATABASE_PORT ||
    !process.env.DATABASE_USERNAME ||
    !process.env.REDIS_HOST ||
    !process.env.REDIS_PORT ||
    !process.env.REDIS_PASSWORD
  ) {
    throw new Error('Failed to load necessary secrets from local .env file.');
  }
  return {
    PRIVATE_KEY: process.env.PRIVATE_KEY,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    FIXED_JWT_TOKEN: process.env.FIXED_JWT_TOKEN,
    DATABASE_HOST: process.env.DATABASE_HOST,
    DATABASE_PORT: parseInt(process.env.DATABASE_PORT),
    DATABASE_USERNAME: process.env.DATABASE_USERNAME,
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: parseInt(process.env.REDIS_PORT),
    REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  };
};

// load aws secret when NODE_ENV is not local
const loadAwsSecret = async (): Promise<AwsSecretJson> => {
  try {
    const secretName = process.env.AWS_SECRET_NAME as string;
    const region = process.env.AWS_REGION || 'ap-southeast-1';
    const secretsClient = new SecretsManagerClient({
      region,
    });
    const command = new GetSecretValueCommand({ SecretId: secretName });
    const response = await secretsClient.send(command);
    if (!response.SecretString) {
      throw new Error('Failed to load private key from aws secret manager.');
    }
    const secretJson: AwsSecretJson = JSON.parse(
      response.SecretString,
    ) as AwsSecretJson;
    if (
      !secretJson.ENCRYPT_PRIVATE_KEY ||
      !secretJson.DATABASE_PASSWORD ||
      !secretJson.FIXED_JWT_TOKEN
    ) {
      throw new Error(
        'Failed to load necessary secrets from aws secret manager.',
      );
    }
    return secretJson;
  } catch (error) {
    logger.error('Error fetching secret from aws secret manager:', error);
    throw error;
  }
};

// decrypt secret with aws kms
const decryptSecret = async (
  encryptedSecret: string,
): Promise<string | null> => {
  try {
    const region = process.env.AWS_REGION || 'ap-southeast-1';
    const kmsClient = new KMSClient({
      region,
    });
    const buffer = Buffer.from(encryptedSecret, 'base64');
    const command = new DecryptCommand({ CiphertextBlob: buffer });
    const response = await kmsClient.send(command);
    if (!response.Plaintext) {
      throw new Error('Failed to decrypt secret.');
    }
    return Buffer.from(response.Plaintext).toString('utf-8');
  } catch (error) {
    logger.error('Error decrypting secret:', error);
    throw error;
  }
};

export const getDefaultConfig = () => {
  return defaultConfig;
};

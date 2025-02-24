import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';
import { KMSClient, DecryptCommand } from '@aws-sdk/client-kms';
import { ConfigService } from '@nestjs/config';

interface SecretJson {
  encryptPrivateKey: string;
  databasePassword: string;
  fixedJwtToken: string;
}

@Injectable()
export class SecretService implements OnModuleInit {
  private logger = new Logger('SecretService');

  private privateKey: string | null = null;
  private secretsClient: SecretsManagerClient;
  private databasePassword: string | null = null;
  private fixedJwtToken: string | null = null;
  private kmsClient: KMSClient;
  private secretName: string;

  constructor(private readonly configService: ConfigService) {
    const region =
      this.configService.get<string>('AWS_REGION') || 'ap-southeast-1';
    this.secretsClient = new SecretsManagerClient({
      region,
    });

    this.kmsClient = new KMSClient({
      region,
    });

    this.secretName = this.configService.get<string>(
      'AWS_SECRET_NAME',
    ) as string;
  }

  async onModuleInit() {
    this.logger.log('Loading and decrypting private key...');
    try {
      const encryptedSecret = await this.loadEncryptedSecret();
      if (encryptedSecret) {
        this.privateKey = await this.decryptSecret(encryptedSecret);
        this.logger.log('Private Key loaded successfully.');
      } else {
        throw new Error('Failed to load private key.');
      }
    } catch (error) {
      this.logger.error(error);
      process.exit(1);
    }
  }

  private async loadEncryptedSecret(): Promise<string | null> {
    try {
      const command = new GetSecretValueCommand({ SecretId: this.secretName });
      const response = await this.secretsClient.send(command);
      if (!response.SecretString) {
        throw new Error('Failed to load private key.');
      }
      const secretJson = JSON.parse(response.SecretString) as SecretJson;
      if (
        !secretJson.databasePassword ||
        !secretJson.fixedJwtToken ||
        !secretJson.encryptPrivateKey
      ) {
        throw new Error('Failed to load necessary secrets.');
      }
      this.databasePassword = secretJson.databasePassword;
      this.fixedJwtToken = secretJson.fixedJwtToken;
      return secretJson.encryptPrivateKey;
    } catch (error) {
      this.logger.error('Error fetching secret:', error);
      throw error;
    }
  }

  private async decryptSecret(encryptedSecret: string): Promise<string | null> {
    try {
      const buffer = Buffer.from(encryptedSecret, 'base64');
      const command = new DecryptCommand({ CiphertextBlob: buffer });
      const response = await this.kmsClient.send(command);
      if (!response.Plaintext) {
        throw new Error('Failed to decrypt secret.');
      }
      return Buffer.from(response.Plaintext).toString('utf-8');
    } catch (error) {
      this.logger.error('Error decrypting secret:', error);
      throw error;
    }
  }

  getPrivateKey(): string | null {
    return this.privateKey;
  }
}

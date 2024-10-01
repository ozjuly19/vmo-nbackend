import { randomBytes, randomUUID, scrypt } from 'node:crypto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Radios as RadiosModel } from '@prisma/client';
import { RadiosService } from '../database/radios/radios.service';
import { CreateApiRadioDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly radiosService: RadiosService
    ) { }

    async radioAuthCheck(api_key: string, api_secret: string): Promise<RadiosModel | null> {
        const radio = await this.radiosService.findOne({ api_key });

        // Check if the creds returned a valid radio.
        if (radio && await this.validateSecretToHashed(api_secret, radio.api_secret))
            return radio;

        // Default to auth failure.
        throw new UnauthorizedException('Invalid API Key or Secret');
    }

    async registerNewRadio(data: CreateApiRadioDto): Promise<RadiosModel> {
        // Generate uuid as the api password
        const cleartext_api_secret = randomBytes(16).toString('hex');

        const newRadioObject: RadiosModel = {
            api_key: randomUUID(),
            api_secret: await this.hashSecret(cleartext_api_secret),
            last_heartbeat: new Date(),
            ...data
        };

        // Create the radio.
        const createdApi = await this.radiosService.create(newRadioObject);

        // Return the api secret in cleartext the one time so the user can copy it down.
        createdApi.api_secret = cleartext_api_secret;

        return createdApi;
    }

    async validateSecretToHashed(plainSecretToCheck: string, checkWithHashed: string): Promise<boolean> {
        const hashedSecretToCheck = await this.hashSecret(plainSecretToCheck);

        // This is where you would compare the plain secret to the hashed secret.
        return hashedSecretToCheck === checkWithHashed;
    }

    async hashSecret(secret: string): Promise<string> {
        const salt = process.env.PASSWORD_SALT;

        if (!salt) throw new Error('No salt provided for hashing!');

        return new Promise((resolve, reject) => {
            // Add some salt to the secret.. Damn shame we can't add pepper too.
            // Scrypt it up.
            scrypt(secret, salt, 64, (err, derivedKey) => {
                if (err) reject(err);
                resolve(derivedKey.toString('hex'));
            });
        });
    }
}
import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EncryptionService {
    encrypt(clearText: string) {
        return new Promise<string>((resolve, reject) => {
            bcrypt.hash(clearText, 10, (err, encrypted) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(encrypted);
                }
            });
        });
    }
    
    compare(encrypted: string, clearText: string) {
        return new Promise<boolean>((resolve, reject) => {
            bcrypt.compare(clearText, encrypted, (err, same) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(same);
                }
            });
        });
    }
}
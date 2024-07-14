import * as dotenv from 'dotenv';
import * as bcrypt from 'bcrypt';

dotenv.config();

export const hash = async (str: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
    return bcrypt.hash(str, salt);
  } catch (error) {
    throw new Error('Failed to hash string');
  }
};

export const compare = async (str: string, hash: string): Promise<boolean> => {
  try {
    return bcrypt.compare(str, hash);
  } catch (error) {
    throw new Error('Failed to compare string with hash');
  }
};

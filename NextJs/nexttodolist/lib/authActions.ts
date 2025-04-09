import dbConnect from './db';
import User from '@/models/User';

export async function userExists(uName: string) {
  try {
    await dbConnect();

    const user = await User.findOne({userEmail: uName});
    if (!user) return null;
    return user;
  } catch (err) {
    console.log('Error in connection of db : ', err);
  }
}

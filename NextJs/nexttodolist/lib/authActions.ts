import dbConnect from './db';
import User from '@/models/User';

export async function userExists(uName: string) {
  try {
    await dbConnect();

    const user = await User.findOne({userName: uName});
    if (!user) return false;
    return true;
  } catch (err) {
    console.log('Error in connection of db : ', err);
  }
}

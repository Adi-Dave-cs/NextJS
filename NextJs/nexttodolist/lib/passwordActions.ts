import crypto from "crypto";

export function generateHash(password : string, salt : string): Promise<string>
{
 return new Promise ((resolve,reject)=>
 {  // Using the factory defaults.
crypto.scrypt(password.normalize(), salt, 64, (err, hash) => {
    if (err) reject(err);

    resolve(hash.toString('hex'));
  })
});
}

export function generateSalt()
{
    return crypto.randomBytes(16).toString('hex').normalize();
}

export async function comparePassword(hashedPassword : string, inputPassword: string ,salt:string)
{
    const inpPassword = await generateHash(inputPassword,salt);

    return inpPassword === hashedPassword;
}
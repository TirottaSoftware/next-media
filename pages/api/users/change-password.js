import client from "../../../lib/client";
import { hash, compare } from "bcryptjs";

export default async function handler(req, res) {
  if (req.method == "PUT") {
    const { uid, currentPassword, newPassword, confirmNewPassword } = req.body;
    // check current pwd
    const user = await client.user.findFirst({ where: { id: parseInt(uid) } });
    const comparePwd = await compare(currentPassword, user.passwordHash);
    if (comparePwd) {
      if (newPassword === confirmNewPassword) {
        let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        const found = newPassword.match(regex);

        if (!found) {
          res.send({
            error:
              "Your new password must contain at least 8 characters, 1 lowercase letter, 1 uppercase letter and a number",
          });
          return;
        }
        const newPwdHash = await hash(newPassword, 12);
        const changePassword = await client.user.update({
          where: { id: parseInt(uid) },
          data: { passwordHash: newPwdHash },
        });
        if (changePassword) {
          res.send("Password successfully updated!");
          return;
        }
        res.send({
          error: "Something went wrong while updating your password",
        });
        return;
      }
      res.send({ error: "Passwords must match." });
      return;
    }
    res.send({ error: "Invalid password. Please try again" });
    // compare new pwd & confim
  }
  await client.$disconnect();
}

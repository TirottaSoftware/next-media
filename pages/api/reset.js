import client from "../../lib/client";
import { hash, compare } from "bcryptjs";

export default async function handler(req, res) {
  if (req.method == "PATCH") {
    // Get id and pwd from body
    const { id, password } = req.body;
    const request = await client.requests.findFirst({ where: { id } });
    if (request) {
      // validate id and email

      let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      const found = password.match(regex);

      if (!found) {
        res.send({
          error:
            "Password must contain at least 8 characters, 1 lowercase letter, 1 uppercase letter and a number",
        });
        return;
      }

      const pwdHash = await hash(password, 12);
      const user = await client.user.findFirst({
        where: { email: request.email },
      });
      // update user
      const updateUser = await client.user.update({
        where: { id: user.id },
        data: {
          passwordHash: pwdHash,
        },
      });
      await client.requests.delete({ where: { id } });
      res.send(updateUser);
      return;
    }
    res.send({ error: "Invalid request." });
  }
  await client.$disconnect();
}

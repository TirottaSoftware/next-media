import client from "../../../lib/client";
import { hash } from "bcryptjs";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const { username, email, profilePictureUrl, password, password_confirm } =
      req.body;

    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    const found = password.match(regex);

    if (!found) {
      res.send({
        error:
          "Password must contain at least 8 characters, 1 lowercase letter, 1 uppercase letter and a number",
      });
      return;
    }

    let passwordHash;
    if (password === password_confirm) {
      passwordHash = await hash(password, 12);
    }

    const defaultProfilePicture =
      "https://www.seekpng.com/png/full/138-1387631_login-comments-windows-10-person-icon.png";

    const newUser = await client.user.create({
      data: {
        username,
        email,
        passwordHash,
        profilePictureUrl:
          profilePictureUrl == "" || !profilePictureUrl
            ? defaultProfilePicture
            : profilePictureUrl,
      },
    });
    res.send(newUser);
  } else if (req.method == "PUT") {
    const { uid, username, email, profilePictureUrl, bio } = req.body;

    const updateUser = await client.user.update({
      where: { id: parseInt(uid) },
      data: { username, email, profilePictureUrl, bio },
    });

    if (updateUser) {
      res.send("User updated! Please re-log to see the changes applied");
      return;
    }
    res.send({ error: "Error updating the user" });
  } else if (req.method == "GET") {
    const { search } = req.query;

    if (search) {
      const result = await client.user.findMany({
        where: {
          username: {
            contains: search,
          },
        },
      });
      if (result) {
        res.send(result);
        return;
      } else {
        res.send({ error: "No matches" });
        return;
      }
    }
    res.send({ error: "No matches" });
  }
  await client.$disconnect();
}

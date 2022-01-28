import client from "../../../lib/client";

export default async function handler(req, res) {
  if (req.method == "GET") {
    const { id } = req.query;
    const user = await client.user.findFirst({
      where: { id: parseInt(id) },
      include: {
        followers: true,
        following: true,
        posts: {
          include: {
            likes: true,
            author: true,
          },
          orderBy: [
            {
              createdAt: "desc",
            },
          ],
        },
      },
    });
    if (!user) {
      res.status(404).send("User not found.");
    }

    res.send(user);
  }
}

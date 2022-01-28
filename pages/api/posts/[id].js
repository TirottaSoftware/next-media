import client from "../../../lib/client";

export default async function handler(req, res) {
  if (req.method == "GET") {
    const { id } = req.query;

    const post = await client.post.findFirst({
      where: { id: parseInt(id) },
      include: { author: true, likes: true },
    });

    if (!post) {
      res.status(404).send("Post not found.");
      return;
    }
    res.send(post);
  }
  await client.$disconnect();
}

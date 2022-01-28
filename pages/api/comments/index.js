import client from "../../../lib/client";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const { postId, userId, content } = req.body;

    const uid = parseInt(userId);
    const pid = parseInt(postId);

    const newComment = await client.comment.create({
      data: {
        user: {
          connect: { id: uid },
        },
        post: {
          connect: { id: pid },
        },
        content,
      },
    });

    res.send(newComment);
  }
  await client.$disconnect();
}

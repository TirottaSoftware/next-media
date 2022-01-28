import client from "../../../lib/client";

export default async function handler(req, res) {
  if (req.method == "POST") {
    const { postId, userId } = req.body;

    const uid = parseInt(userId);
    const pid = parseInt(postId);

    const existingLike = await client.like.findFirst({
      where: { userId: uid, postId: pid },
    });
    if (existingLike) {
      const removeLike = await client.like.delete({
        where: { id: existingLike.id },
      });

      res.send({
        existing: true,
        removeLike,
      });
      return;
    }

    const newLike = await client.like.create({
      data: {
        user: {
          connect: { id: uid },
        },
        post: {
          connect: { id: pid },
        },
      },
    });

    res.send(newLike);
  }
  await client.$disconnect();
}

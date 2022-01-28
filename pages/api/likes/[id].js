import client from "../../../lib/client";

export default async function handler(req, res) {
  if (req.method == "GET") {
    const { id } = req.query;

    const pid = parseInt(id);
    const likes = await client.like.findMany({
      where: { postId: pid },
      //   select: {userId: true},
      include: { user: true },
    });

    res.send(likes);
  }
  await client.$disconnect();
}

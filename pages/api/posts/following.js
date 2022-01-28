import client from "../../../lib/client";

export default async function Handler(req, res) {
  const { currentUid } = req.query;

  if (req.method == "GET") {
    const following = await client.user.findFirst({
      where: { id: parseInt(currentUid) },
      select: {
        following: { select: { followerId: true } },
      },
    });

    const posts = await client.post.findMany({
      include: { likes: true, author: true },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
      where: {
        author: {
          id: {
            in: [
              ...following.following.map((user) => user.followerId),
              parseInt(currentUid),
            ],
          },
        },
      },
    });

    res.send(posts);
  }
  await client.$disconnect();
}

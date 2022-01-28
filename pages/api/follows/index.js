import client from "../../../lib/client";

export default async function Handler(req, res) {
  if (req.method == "POST") {
    // Get followerId and followingId from body
    const { followerId, followingId } = req.body;
    const alreadyFollowing = await client.follows.findFirst({
      where: {
        followerId: parseInt(followingId),
        followingId: parseInt(followerId),
      },
    });
    if (alreadyFollowing) {
      const unfollow = await client.follows.delete({
        where: {
          id: alreadyFollowing.id,
        },
      });
      res.send(unfollow);
    } else {
      const followAdded = await client.follows.create({
        data: {
          follower: {
            connect: { id: parseInt(followingId) },
          },
          following: {
            connect: { id: parseInt(followerId) },
          },
        },
      });
      res.send(followAdded);
    }
  }
  await client.$disconnect();
}

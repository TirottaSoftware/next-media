import client from "../../../lib/client";

export default async function Handler(req, res) {
  const { uid, currentUid } = req.query;

  if (req.method == "GET") {
    if (uid) {
      const userPosts = await client.post.findMany({
        include: { likes: true, author: true },
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
        where: { authorId: parseInt(uid) },
      });
      res.send(userPosts);
      return;
    }

    const posts = await client.post.findMany({
      include: { author: true, likes: true },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
    res.send(posts);
  } else if (req.method == "POST") {
    const { title, content, imageUrl, authorId } = req.body;

    const authorIdAsInt = parseInt(authorId);

    const newPost = await client.post.create({
      data: {
        title: title,
        content: content,
        imageUrl: imageUrl,
        author: {
          connect: { id: authorIdAsInt },
        },
      },
    });

    res.send(newPost);
  } else if (req.method == "DELETE") {
    const { userId, postId } = req.query;
    const post = await client.post.findFirst({
      where: { id: parseInt(postId) },
      include: { author: true },
    });
    if (post.author.id === parseInt(userId)) {
      const deletePost = await client.post.delete({
        where: { id: parseInt(postId) },
      });
      res.send("post deleted.", deletePost);
    } else {
      res.send({
        error: "Invalid user",
        authorId: post,
      });
    }
  }
  await client.$disconnect();
}

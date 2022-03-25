import { hashtagRepository } from "../repositories/hashtagRepository.js";
import urlMetadata from "url-metadata";

export async function hashtagFilter(req, res) {
  const nameHashtag = req.headers.namehashtag;
  try {
    const hashtagFilter = await hashtagRepository.getHashtag(nameHashtag);

    const post = [];
    for (const [idx, postsArray] of hashtagFilter.entries()) {
      const link = await urlMetadata(postsArray.link);
      post.push({
        userId: hashtagFilter[idx].userId,
        image: link.image,
        description: link.description,
        title: link.title,
        source: link.source,
        text: hashtagFilter[idx].text,
        picture: hashtagFilter[idx].picture,
        username: hashtagFilter[idx].name,
      });
    }
    res.send(post.reverse().slice(0, 20));
  } catch (error) {
    console.log(error);

    res.sendStatus(500);
  }
}

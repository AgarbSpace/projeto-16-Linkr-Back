import urlMetadata from "url-metadata";
import { timelineRepository } from "../repositories/timelineRepository.js";

export async function getTimeline(request, response) {

  try {
    const posts = await timelineRepository.getPosts();
    const post = []
    for (const [idx, postsArray] of posts.rows.entries()) {
      try {
        const link = await urlMetadata(postsArray.link);
        post.push({
          userId: postsArray.userId,
          image: link.image,
          description: link.description,
          title: link.title,
          source: postsArray.link,
          text: postsArray.text,
          picture: postsArray.picture,
          username: postsArray.userName
        })
      }
      catch {
        post.push({
          userId: postsArray.userId,
          image: "https://hugocalixto.com.br/wp-content/uploads/sites/22/2020/07/error-404-1.png",
          description: "erro ao recuperar informações",
          title: "erro ao recuperar informações",
          source: "erro ao recuperar informações",
          text: postsArray.text,
          picture: postsArray.picture,
          username: postsArray.userName
        })
      }
    }

    response.send(post.reverse().slice(0, 20));
  } catch (error) {
    console.log(error)
    response.sendStatus(500);
  }

}
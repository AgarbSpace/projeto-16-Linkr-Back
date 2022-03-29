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
          id: postsArray.id,
          userId: postsArray.userId,
          image: link.image,
          description: link.description,
          title: link.title,
          source: postsArray.link,
          text: postsArray.text,
          picture: postsArray.picture,
          username: postsArray.userName
        })
      } catch (error) {
        post.push({
          id: postsArray.id,
          userId: postsArray.userId,
          image: "https://geekblog.com.br/wp-content/uploads/2021/03/o-que-e-erro-404.png",
          description: "Erro ao tentar carregar meta-dados",
          title: "Erro ao tentar carregar meta-dados",
          source: postsArray.link,
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

export async function getTimelineByUserId(req, res) {
  try {
    const id = req.params.id;
    const posts = await timelineRepository.getPostsByUserId(req.params.id);
    const post = [];

    for (const [idx, postsArray] of posts.userPosts.entries()) {
      try {

        const link = await urlMetadata(postsArray.link);

        post.push({
          id: postsArray.id,
          userId: postsArray.userId,
          image: link.image,
          description: link.description,
          title: link.title,
          source: postsArray.link,
          text: postsArray.text,
          picture: postsArray.picture,
          username: postsArray.userName
        });
      } catch (error) {
        post.push({
          id: postsArray.id,
          userId: postsArray.userId,
          image: "https://geekblog.com.br/wp-content/uploads/2021/03/o-que-e-erro-404.png",
          description: "Erro ao tentar carregar meta-dados",
          title: "Erro ao tentar carregar meta-dados",
          source: postsArray.link,
          text: postsArray.text,
          picture: postsArray.picture,
          username: postsArray.userName
        });
      }
    }

    const result = { username: posts.username, posts: post.reverse().slice(0, 20) }

    res.send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
import urlMetadata from "url-metadata";
import { timelineRepository } from "../repositories/timelineRepository.js";
import { verifyFollowByIdsQuery, verifyIfUserFollowsAnyone } from "../repositories/followReposirtory.js";

export async function getTimeline(request, response) {

  try {
    const offset = request.query.offset;
    const posts = await timelineRepository.getPosts(offset);
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
    const finalPosts = [];
    for (let i = 0; i < post.length; i++) {
      const verifyFollow = await verifyFollowByIdsQuery(response.locals.user.id, post[i].userId);
      if (verifyFollow.length !== 0 || (response.locals.user.id === post[i].userId)) finalPosts.push(post[i]);
    }

    response.send(finalPosts);
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

export async function userFollowsAnyone (req, res) {
  try {
    const listFollows = await verifyIfUserFollowsAnyone(res.locals.user.id);
    res.send(listFollows);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
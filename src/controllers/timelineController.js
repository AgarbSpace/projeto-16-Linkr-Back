import urlMetadata from "url-metadata";
import { timelineRepository } from "../repositories/timelineRepository.js";

export async function getTimeline(request, response){

    try {
        const posts = await timelineRepository.getPosts();
        const post = []
        for(const [idx, postsArray] of posts.rows.entries()){
            const link = await urlMetadata(postsArray.link);
            post.push({
                id: postsArray.id,
                userId: postsArray.userId,
                image: link.image,
                description: link.description,
                title: link.title,
                source: link.source,
                text: postsArray.text,
                picture: postsArray.picture,
                username: postsArray.userName
            })
        }
        
        response.send(post.reverse().slice(0,20));
    } catch (error) {
        console.log(error)
        response.sendStatus(500);
    }
        
}

export async function getTimelineByUserId (req, res) {
  try {
    const id = req.params.id;
    console.log(id)
    const posts = await timelineRepository.getPostsByUserId(req.params.id);
    const post = [];
    
    for(const [idx, postsArray] of posts.userPosts.entries()){
      const link = await urlMetadata(postsArray.link);
      post.push({
        id: postsArray.id,
        userId: postsArray.userId,
        image: link.image,
        description: link.description,
        title: link.title,
        source: link.source,
        text: postsArray.text,
        picture: postsArray.picture,
        username: postsArray.userName
      });
    }

    const result = { username: posts.username, posts: post.reverse().slice(0,20)}
    console.log(result)   
    res.send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
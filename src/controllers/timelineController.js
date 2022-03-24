import urlMetadata from "url-metadata";
import { timelineRepository } from "../repositories/timelineRepository.js";

export async function getTimeline(request, response){

    try {
        const posts = await timelineRepository.getPosts();
        const post = []
        for(const [idx, postsArray] of posts.rows.entries()){
            const link = await urlMetadata(postsArray.link);
            post.push({
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
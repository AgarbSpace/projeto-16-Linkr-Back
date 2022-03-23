import urlMetadata from "url-metadata";

export async function getTimeline(request, response){
    

    await urlMetadata('https://www.npmjs.com/package/url-metadata').then(
        function (metadata){
            console.log(metadata);
        },
        function (error) {
            console.log(error);
        });

        response.send("ok")
}
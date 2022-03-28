import { publicationRepository } from "../repositories/publicationRepository.js";


function getHashTagFromText(tagString) {
  let tagListArray = [];
  let regexp = new RegExp('#([^\\s]*)', 'g');
  let tmplist = tagString.match(regexp);
  for (let w in tmplist) {
    let hashSub = tmplist[w].replace(/[.,\!$%\^&\*;:{}=\-_`~()]/g, "").split('#');
    for (let x in hashSub) {
      if (hashSub[x] != "") {
        if (hashSub[x].substr(hashSub[x].length - 1) == ":") {
          hashSub[x] = hashSub[x].slice(0, -1);
        }
        if (hashSub[x] != "") {
          tagListArray.push(hashSub[x]);
        }
      }
    }
  }
  return tagListArray;
}

export async function postPublication(req, res) {

  const { text, link, userId } = req.body
  console.log(userId)
  const hashtagList = getHashTagFromText(text)

  try {

    const postId = await publicationRepository.postPublication(text, link, userId)

    if (hashtagList.length === 0) {
      return res.sendStatus(201);
    }

    const hashtagIdArray = await publicationRepository.returnHashtagIdArray(hashtagList)

    await publicationRepository.insertIntoHashtagPost(hashtagIdArray, postId)

    return res.sendStatus(201)

  } catch (error) {

    console.log(error);

    return res.sendStatus(500);
  }

}

export async function deletePublication (req, res) {
  try {
    await publicationRepository.deletePublication(req.params.id);
    
    return res.sendStatus(200);
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
}

export async function updatePublication (req, res) {
  try {
    const { text } = req.body;

    const postId = req.params.id;

    const previousText = await publicationRepository.getPublicationById(postId);

    const hashtagNowList = getHashTagFromText(text);

    const hashtagPreviousList = getHashTagFromText(previousText.text);

    await publicationRepository.updatePublication(text, postId);

    await publicationRepository.updateHashtags(hashtagNowList, hashtagPreviousList, postId);

    return res.sendStatus(201)
    
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
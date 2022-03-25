export async function hashtagFilter(req, res) {
  const nameHashtag = req.headers.namehashtag
  try {

    // const hashtagFilter = await hashtagRepository.getHashtag(nameHashtag)
    console.log(nameHashtag)
    res.send(nameHashtag)

  } catch (error) {

    console.log(error)

    res.sendStatus(500)
  }

}
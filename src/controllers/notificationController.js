import { timelineRepository } from "../repositories/timelineRepository.js";
import { getTimeline } from "./timelineController.js";

export async function getTimelineNotification(req, res) {

  try {

    await getTimeline(req, res);

  } catch (error) {
    console.log(error)
    res.sendStatus(500);
  }

}
import { timelineRepository } from "../repositories/timelineRepository.js";
import { improvedGetTimeline } from "./timelineController.js";

export async function getTimelineNotification(req, res) {

  try {

    await improvedGetTimeline(req, res);

  } catch (error) {
    console.log(error)
    res.sendStatus(500);
  }

}
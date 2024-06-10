import { AuthScope } from '../config';
import { db } from '../models';
import { MissionAttributes } from '../models/mission';

const get = async (authScope: AuthScope ): Promise<MissionAttributes[]> => {
  const missions = await db.Mission.findAll();
  return missions;
};


const missionController = {
  get,
};
export { missionController };

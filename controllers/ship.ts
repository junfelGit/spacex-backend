import { PaginationInput, Ship } from '../common/types/backend';
import { AuthScope } from '../config';
import { db } from '../models';
import { Mission } from '../models/mission';
import { Role } from '../models/role';
import { ShipAttributes } from '../models/ship';
import { ShipLocation } from '../models/shiplocation';

const get = async ({ pagination }: { pagination: PaginationInput }, authScope: AuthScope): Promise<ShipAttributes[]> => {
  const ships = await db.Ship.findAll({
    include:[ 
      {
        model: Mission,
        as: 'missions'
      },
      {
        model: ShipLocation,
        as: 'position'
      },
      {
        model: Role,
        as: 'shiproles'
      },
    ]
  });


  return ships;
};

const find = async ( id : Ship['id'], authScope: AuthScope): Promise<ShipAttributes|null> => {
  return await db.Ship.findByPk(id, {
    include:[ 
      {
        model: Mission,
        as: 'missions'
      },
      {
        model: ShipLocation,
        as: 'position'
      },
      {
        model: Role,
        as: 'shiproles'
      },
    ]
  });
};


const shipController = {
  get,
  find
};
export { shipController };

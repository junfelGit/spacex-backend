import { QueryShipsArgs, Ship } from '../../../common/types/backend';
import { GraphqlContext } from '../../../config';
import { shipController } from '../../../controllers';
import { ShipAttributes } from '../../../models/ship';

const ships = async (rootValue, { input }: QueryShipsArgs, context: GraphqlContext): Promise<ShipAttributes[]> => {
  return shipController.get(input, context);
};

const ship = async (rootValue, { id }: Pick<Ship, 'id'>, context: GraphqlContext): Promise<ShipAttributes|null> => {
  return shipController.find(id, context);
};


// const addShip = async (rootValue, _, context: GraphqlContext): Promise<ShipAttributes | null> => {
//   return null;
// };

const query = { ships, ship };

const mutation = {};

const Ship = { query, mutation };
export { Ship };

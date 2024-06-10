if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('dotenv').config();
}
import { db } from '../models';
import { cleanDb } from '../helpers/testHelpers';
import fetch from 'node-fetch';

const populate = async () => {
  await cleanDb();
  
  console.log('Populating database...');

  const ships = await fetch('https://spacex-production.up.railway.app/api/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      query: `{ 
        ships {
          id
          name
          class
          image
          active
          missions {
            name
            flight
          }
          abs
          attempted_landings
          course_deg
          home_port
          imo
          mmsi
          model
          position {
            latitude
            longitude
          }
          roles
          speed_kn
          status
          successful_landings
          type
          url
          weight_kg
          weight_lbs
          year_built
        } 
      }` 
    }),
  })
    .then(res => res.json())
    .then(data => data.data.ships);

 
  await Promise.all(
    ships.map((ship) => {
      const { missions, position, roles } = ship;

      return db.Ship.create({
        active: ship.active,
        name: ship.name,
        class: ship.class,
        image: ship.image,
        abs: ship.abs,
        attempted_landings: ship.attempted_landings,
        course_deg: ship.course_deg,
        home_port: ship.home_port,
        imo: ship.imo,
        mmsi: ship.mmsi,
        model: ship.model,
        speed_kn: ship.speed_kn,
        status: ship.status,
        successful_landings: ship.successful_landings,
        type: ship.type,
        url: ship.url,
        weight_kg: ship.weight_kg,
        weight_lbs: ship.weight_lbs,
        year_built: ship.year_built,
       
      })
      .then( async ship => {
        const {id} = ship.get();

        if(position)
          db.ShipLocation.create({ shipId: id, ...position });
        
        if(missions?.length)
          db.Mission.bulkCreate(missions.map( mission => ({shipId: id, ...mission})));
        
        if(roles?.length)
           await Promise.all( roles.map( async role => {
        
              const [newRole] =  await db.Role.findOrCreate({
                where: { name: role },
                defaults: { name: role }
              });

              return db.ShipRole.create({
                shipId: id,
                roleId: newRole.id
              });
          }));
        
      })
      .catch( err => console.log(err));
    }),
  );

  await db.sequelize.close();
};

if (require.main === module) {
  populate();
}

export { populate };

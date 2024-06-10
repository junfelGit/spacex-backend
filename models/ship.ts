import { Sequelize, Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute } from 'sequelize';
import { Mission } from './mission';
import { ShipLocation } from './shiplocation';
import { Role } from './role';

type OmitTypes = '';

class Ship extends Model<
  InferAttributes<
    Ship,
    {
      omit: OmitTypes;
    }
  >,
  InferCreationAttributes<
    Ship,
    {
      omit: OmitTypes;
    }
  >
> {
  declare id: CreationOptional<string>;
  declare class?: string | null;
  declare name?: string | null;
  declare image?: string | null;
  declare active: boolean;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare missions?: NonAttribute<Mission[]>;
  declare shiproles?: NonAttribute<Role[]>;
  declare position: NonAttribute<ShipLocation>;
  declare abs?: number | null;
  declare attempted_landings: number | null;
  declare course_deg?: number | null;
  declare home_port?: string | null;
  declare imo?: number | null;
  declare mmsi?: number | null;
  declare model?: string | null;
  declare speed_kn?: number | null;
  declare status?: string | null;
  declare successful_landings?: number | null;
  declare type?: string | null;
  declare url?: string | null;
  declare weight_kg?: number | null;
  declare weight_lbs?: number | null;
  declare year_built?: number | null;

  get roles(): NonAttribute<string[]> {
    return this.shiproles?.map( role => role.name) ?? [];
  }

  static initModel(sequelize: Sequelize) {
    Ship.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        class: { type: DataTypes.STRING, allowNull: true },
        name: { type: DataTypes.STRING, allowNull: true },
        image: { type: DataTypes.STRING, allowNull: true },
        active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
        abs: { type: DataTypes.INTEGER, allowNull: true },
        attempted_landings: { type: DataTypes.INTEGER, allowNull: true },
        course_deg: { type: DataTypes.INTEGER, allowNull: true },
        home_port: { type: DataTypes.STRING, allowNull: false },
        imo: { type: DataTypes.INTEGER, allowNull: true },
        mmsi: { type: DataTypes.INTEGER, allowNull: true },
        model: { type: DataTypes.STRING, allowNull: true },
        speed_kn: { type: DataTypes.FLOAT, allowNull: true },
        status: { type: DataTypes.STRING, allowNull: true },
        successful_landings: { type: DataTypes.INTEGER, allowNull: true },
        type: { type: DataTypes.STRING, allowNull: false },
        url: { type: DataTypes.STRING, allowNull: true },
        weight_kg: { type: DataTypes.INTEGER, allowNull: true },
        weight_lbs: { type: DataTypes.INTEGER, allowNull: true },
        year_built: { type: DataTypes.INTEGER, allowNull: true },
        createdAt: { type: DataTypes.DATE, allowNull: false },
        updatedAt: { type: DataTypes.DATE, allowNull: false },

      },
      {
        sequelize,
      },
    );
    return Ship;
  }
  public static associate = ({ Mission, Role, ShipLocation }) => {
    Ship.hasMany(Mission, { foreignKey: 'shipId', as: 'missions' });
    Ship.hasOne(ShipLocation, { foreignKey: 'shipId', as: 'position' });
    Ship.belongsToMany(Role, {through: 'ShipRole', foreignKey: 'shipId', as: 'shiproles'});
  };
}

export { Ship, Ship as ShipAttributes };

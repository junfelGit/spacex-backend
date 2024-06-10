import { Sequelize, Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey } from 'sequelize';
import { Ship } from './ship';

type OmitTypes = '';

class ShipLocation extends Model<
  InferAttributes<
    ShipLocation,
    {
      omit: OmitTypes;
    }
  >,
  InferCreationAttributes<
    ShipLocation,
    {
      omit: OmitTypes;
    }
  >
> {
  declare id: CreationOptional<string>;
  declare longitude?: number;
  declare latitude?: number;
  declare shipId?: ForeignKey<Ship['id']>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  static initModel(sequelize: Sequelize) {
    ShipLocation.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        latitude: { type: DataTypes.FLOAT, allowNull: true },
        longitude: { type: DataTypes.FLOAT, allowNull: false},
        shipId: { type: DataTypes.UUID, allowNull: false},
        createdAt: { type: DataTypes.DATE, allowNull: false },
        updatedAt: { type: DataTypes.DATE, allowNull: false },
      },
      {
        sequelize,
      },
    );

    return ShipLocation;
  }
  public static associate = ({ Ship }) => {
    ShipLocation.belongsTo(Ship, { foreignKey: 'shipId', as: 'ship' });
  };
}

export { ShipLocation, ShipLocation as ShipLocationAttributes };

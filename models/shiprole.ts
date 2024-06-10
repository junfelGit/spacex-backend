
import { Sequelize, Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey } from 'sequelize';
import { Ship } from './ship';
import { Role } from './role';

type OmitTypes = '';

class ShipRole extends Model<
  InferAttributes<
    ShipRole,
    {
      omit: OmitTypes;
    }
  >,
  InferCreationAttributes<
    ShipRole,
    {
      omit: OmitTypes;
    }
  >
> {
  declare id: CreationOptional<string>;
  declare roleId?: ForeignKey<Role['id']>;
  declare shipId?: ForeignKey<Ship['id']>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  static initModel(sequelize: Sequelize) {
    ShipRole.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        roleId: { type: DataTypes.UUID, allowNull: false },
        shipId: { type: DataTypes.UUID, allowNull: false},
        createdAt: { type: DataTypes.DATE, allowNull: false },
        updatedAt: { type: DataTypes.DATE, allowNull: false },
      },
      {
        sequelize,
      },
    );

    return ShipRole;
  }
  public static associate = ({ Ship, Role }) => {
    ShipRole.belongsTo(Ship, {foreignKey: 'shipId'});
    ShipRole.belongsTo(Role, {foreignKey: 'roleId'});
  };
}

export { ShipRole, ShipRole as ShipRoleAttributes };

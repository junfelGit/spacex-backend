import { Sequelize, Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';


type OmitTypes = '';

class Role extends Model<
  InferAttributes<
    Role,
    {
      omit: OmitTypes;
    }
  >,
  InferCreationAttributes<
    Role,
    {
      omit: OmitTypes;
    }
  >
> {
  declare id: CreationOptional<string>;
  declare name?: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
 
  static initModel(sequelize: Sequelize) {
    Role.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        name: { type: DataTypes.STRING, allowNull: false},
        createdAt: { type: DataTypes.DATE, allowNull: false },
        updatedAt: { type: DataTypes.DATE, allowNull: false },
      },
      {
        sequelize,
      },
    );

    return Role;
  }
  public static associate = ({ Ship, ShipRole }) => {
    Role.belongsToMany(Ship, {through: ShipRole, foreignKey: 'roleId', as: 'ships'});
  };
}

export { Role, Role as RoleAttributes };

// 'use strict';
// module.exports = (sequelize, DataTypes) => {
//   const user = sequelize.define('user', {
//     id: DataTypes.STRING,
//     firstname: DataTypes.STRING,
//     lastname: DataTypes.STRING,
//     email: DataTypes.STRING,
//     isAdmin: DataTypes.BOOLEAN,
//     password: DataTypes.STRING
//   }, {});
//   user.associate = function(models) {
//     // associations can be defined here
//   };
//   return user;
// };

// 'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
        primaryKey: true,
        allowNull: false
      },
      firstname: {
        type: DataTypes.STRING(225),
        allowNull: false
      },
      lastname: {
        type: DataTypes.STRING(225),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true
        },
        unique: {
          args: true,
          msg: "Email address already in use!"
        }
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    {}
  );
  user.associate = function(models) {
    user.hasMany(models.bucket, { foreignKey: "created_by" });
    // associations can be defined here
  };
  return user;
};

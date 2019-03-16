module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "user",
    {
      id: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: true,
        primaryKey: true
      },
      nick: {
        type: DataTypes.STRING(15),
        allowNull: false
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: true
      }
    },
    {
      timestamps: true,
      paranoid: false,
      charset: "utf8",
      collate: "utf8_general_ci"
    }
  );

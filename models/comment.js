module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "comment",
    {
      content: {
        type: DataTypes.STRING(2048),
        allowNull: false
      }
    },
    {
      timestamps: true,
      paranoid: false,
      charset: "utf8",
      collate: "utf8_general_ci"
    }
  );

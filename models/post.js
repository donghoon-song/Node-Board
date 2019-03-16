module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "post",
    {
      title: {
        type: DataTypes.STRING(140),
        allowNull: false
      },
      content: {
        type: DataTypes.STRING(140),
        allowNull: false
      },
      view: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    },
    {
      timestamps: true,
      paranoid: true,
      charset: "utf8",
      collate: "utf8_general_ci"
    }
  );

module.exports = (sequelize, DataTypes) => {
  const reply = sequelize.define(
    "reply",
    {
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      writer: {
        type: DataTypes.STRING,
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT
      }
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci"
    }
  );
  reply.associate = function(models) {
    // associations can be defined here
  };
  return reply;
};

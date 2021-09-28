const UserSchema = (sequelize, Sequelize) => {
  const { DataTypes } = Sequelize
  const { STRING, INTEGER } = DataTypes
  const User = sequelize.define("user", {
    full_name: {
      type: STRING
    },
    email: {
      type: STRING
    },
    password: {
      type: STRING
    },
    user_role: {
      type: STRING
    },
  }, {
    timestamps: false,
    underscored: true
  });

  const Role = sequelize.define("role", {
    role_name: {
      type: STRING,
    },

  }, {
    timestamps: false,
    underscored: true
  });

  const Customer = sequelize.define("customer", {
    user_id: {
      type: INTEGER,
    },
    stripe_cus_id: {
      type:STRING
    }
  }, {
    timestamps: false,
    underscored: true
  });

  const Vendor = sequelize.define("vendor", {
    user_id: {
      type: INTEGER,
    },
    description: {
      type: STRING
    },
    image: {
      type: STRING
    },
    intro: {
      type: STRING
    },
    rating: {
      type: INTEGER
    },
    reviews: {
      type: INTEGER
    },
  }, {
    underscored: true,
  });
  const PhoneNumber = sequelize.define("phone_numbers", {
    country_code: {
      type: STRING
    },
    dialing_code: {
      type: STRING
    },
    national_number: {
      type: STRING
    },
    user_id: {
      type: INTEGER
    },
  }, {
    timestamps: false,
    underscored: true,
  });

  Customer.belongsTo(User);
  Vendor.belongsTo(User);
  User.hasMany(PhoneNumber);
  User.belongsTo(Role);

  return { User, Customer, Vendor, Role, PhoneNumber };
};

export default UserSchema
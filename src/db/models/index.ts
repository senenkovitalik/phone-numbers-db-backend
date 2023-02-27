import { Human } from "./Human";
import { Communication } from "./Communication";
import { CommunicationPhoneNumber } from "./CommunicationPhoneNumber";
import { Location } from "./Location";
import { LocationsSubscribers } from "./LocationsSubscribers";
import { Subscriber } from "./Subscriber";
import { User } from "./User";
import { UserRole } from "./UserRole";

Human.hasOne(Subscriber, {
  foreignKey: "human_id",
  as: "human",
});
Subscriber.belongsTo(Human, {
  foreignKey: "human_id",
  as: "human",
});

Subscriber.belongsToMany(Location, {
  through: LocationsSubscribers,
  as: "locations",
  foreignKey: "subscriberId",
  timestamps: false,
});
Location.belongsToMany(Subscriber, {
  through: LocationsSubscribers,
  foreignKey: "locationId",
  timestamps: false,
});

Communication.hasMany(CommunicationPhoneNumber, {
  foreignKey: "communication_type_id",
  as: "communicationType",
});
CommunicationPhoneNumber.belongsTo(Communication, {
  foreignKey: "communication_type_id",
  as: "communicationType",
});

Location.hasMany(CommunicationPhoneNumber, { as: "location" });
CommunicationPhoneNumber.belongsTo(Location, { as: "location" });

// Subscriber.hasOne(CommunicationPhoneNumber, { as: "subscriber" });
// CommunicationPhoneNumber.belongsTo(Subscriber, { as: "subscriber" });

UserRole.hasMany(User);
User.belongsTo(UserRole);

export * from "./Human";
export * from "./Communication";
export * from "./CommunicationPhoneNumber";
export * from "./Location";
export * from "./LocationsSubscribers";
export * from "./Subscriber";
export * from "./User";
export * from "./UserRole";

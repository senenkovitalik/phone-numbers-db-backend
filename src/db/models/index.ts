import { Communication } from "./Communication";
import { CommunicationPhoneNumber } from "./CommunicationPhoneNumber";
import { Location } from "./Location";
import { LocationsSubscribers } from "./LocationsSubscribers";
import { Subscriber } from "./Subscriber";
import { User } from "./User";
import { UserRole } from "./UserRole";

Subscriber.belongsToMany(Location, { through: LocationsSubscribers });
Location.belongsToMany(Subscriber, { through: LocationsSubscribers });

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

Subscriber.hasOne(CommunicationPhoneNumber, { as: "subscriber" });
CommunicationPhoneNumber.belongsTo(Subscriber, { as: "subscriber" });

UserRole.hasMany(User);
User.belongsTo(UserRole);

export * from "./Communication";
export * from "./CommunicationPhoneNumber";
export * from "./Location";
export * from "./LocationsSubscribers";
export * from "./Subscriber";
export * from "./User";
export * from "./UserRole";

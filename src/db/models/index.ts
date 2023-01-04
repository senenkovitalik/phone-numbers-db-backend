// import { Communication } from "./Communication";
// import { CommunicationPhoneNumber } from "./CommunicationPhoneNumber";
import { Location } from "./Location";
import { LocationsSubscribers } from "./LocationsSubscribers";
import { Subscriber } from "./Subscriber";
import { User } from "./User";
import { UserRole } from "./UserRole";

Subscriber.belongsToMany(Location, { through: LocationsSubscribers });
Location.belongsToMany(Subscriber, { through: LocationsSubscribers });

// CommunicationPhoneNumber.belongsTo(Communication);
// Communication.hasMany(CommunicationPhoneNumber);

// CommunicationPhoneNumber.belongsTo(Location);
// Location.hasMany(CommunicationPhoneNumber);

UserRole.hasMany(User);
User.belongsTo(UserRole);

export * from "./Communication";
export * from "./CommunicationPhoneNumber";
export * from "./Location";
export * from "./LocationsSubscribers";
export * from "./Subscriber";
export * from "./User";
export * from "./UserRole";

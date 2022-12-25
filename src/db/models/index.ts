import { Communication } from "./Communication";
import { CommunicationPhoneNumber } from "./CommunicationPhoneNumber";
import { CommunicationTerminalEquipment } from "./CommunicationTerminalEquipment";
import { Location } from "./Location";
import { LocationsSubscribers } from "./LocationsSubscribers";
import { Subscriber } from "./Subscriber";
import { User } from "./User";
import { UserRole } from "./UserRole";

Location.belongsToMany(Subscriber, { through: LocationsSubscribers });
Location.hasMany(CommunicationTerminalEquipment);

Communication.hasMany(CommunicationTerminalEquipment);
Communication.hasMany(CommunicationPhoneNumber);

CommunicationTerminalEquipment.belongsTo(Location);
CommunicationTerminalEquipment.belongsTo(Communication);
CommunicationTerminalEquipment.hasMany(CommunicationPhoneNumber);

CommunicationPhoneNumber.belongsTo(CommunicationTerminalEquipment);
CommunicationPhoneNumber.belongsTo(Communication);

UserRole.hasMany(User);
User.belongsTo(UserRole);

export * from "./Communication";
export * from "./CommunicationPhoneNumber";
export * from "./CommunicationTerminalEquipment";
export * from "./Location";
export * from "./LocationsSubscribers";
export * from "./Subscriber";
export * from "./User";
export * from "./UserRole";

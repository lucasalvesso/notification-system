import {CategoryData} from "./CategoryData";
import {NotificationTypesData} from "./NotificationTypesData";

export interface UserData {
    "id": number,
    "name": string,
    "email": string,
    "phoneNumber": string,
    "categories": CategoryData[],
    "notificationTypes": NotificationTypesData[],
}
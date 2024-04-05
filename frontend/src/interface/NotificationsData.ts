import {CategoryData} from "./CategoryData";
import {NotificationTypesData} from "./NotificationTypesData";
import {UserData} from "./UserData";

export interface NotificationsData {
    "id": number
    "message": string
    "status": true
    "createdAt": string
    "user": Omit<UserData, 'notificationTypes' | 'categories'>
    "type": NotificationTypesData
    "category": CategoryData
}
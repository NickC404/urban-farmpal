import Auth from './Auth'
import DashboardController from './DashboardController'
import ProfileSetupController from './ProfileSetupController'
import Settings from './Settings'
import GrowingSetupController from './GrowingSetupController'
import PlantController from './PlantController'
import UserPlantController from './UserPlantController'
import PlantActivityController from './PlantActivityController'
import PlantReminderController from './PlantReminderController'
import CalendarController from './CalendarController'

const Controllers = {
    Auth: Object.assign(Auth, Auth),
    DashboardController: Object.assign(DashboardController, DashboardController),
    ProfileSetupController: Object.assign(ProfileSetupController, ProfileSetupController),
    Settings: Object.assign(Settings, Settings),
    GrowingSetupController: Object.assign(GrowingSetupController, GrowingSetupController),
    PlantController: Object.assign(PlantController, PlantController),
    UserPlantController: Object.assign(UserPlantController, UserPlantController),
    PlantActivityController: Object.assign(PlantActivityController, PlantActivityController),
    PlantReminderController: Object.assign(PlantReminderController, PlantReminderController),
    CalendarController: Object.assign(CalendarController, CalendarController),
}

export default Controllers
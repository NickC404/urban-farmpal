import Auth from './Auth'
import DashboardController from './DashboardController'
import ProfileSetupController from './ProfileSetupController'
import Settings from './Settings'
import GrowingSetupController from './GrowingSetupController'

const Controllers = {
    Auth: Object.assign(Auth, Auth),
    DashboardController: Object.assign(DashboardController, DashboardController),
    ProfileSetupController: Object.assign(ProfileSetupController, ProfileSetupController),
    Settings: Object.assign(Settings, Settings),
    GrowingSetupController: Object.assign(GrowingSetupController, GrowingSetupController),
}

export default Controllers
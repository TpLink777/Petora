
import { ValidRoles } from "../interfaces/valid-roles.interface.js";
import { Auth } from "./auth-decorator.js";


export const SuperAdminAuth = () => Auth(ValidRoles.superAdmin)
export const AdminAuth = () => Auth(ValidRoles.admin)
export const UserAuth = () => Auth(ValidRoles.user)

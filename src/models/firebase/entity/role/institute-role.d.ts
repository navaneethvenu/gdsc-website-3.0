import { Role } from "./role";

export interface InstituteRole extends Role
{
    branch: string,
    batch_start: number,
    batch_end: number,
}
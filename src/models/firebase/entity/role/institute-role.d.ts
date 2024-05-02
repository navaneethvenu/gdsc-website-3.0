import { Role } from "./role";

export interface InstituteRole extends Role
{
    branch: string,
    batch_start_year: number,
    batch_end_year: number,
}
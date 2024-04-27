import { EntityType } from "./entity-type";
import { Entity } from "./entity";
import { Role } from "./role/role";
import { InstituteRole } from "./role/institute-role";

export interface Individual extends Entity
{
    entityType:EntityType.Individual,
    roles:(Role|InstituteRole)[],
}
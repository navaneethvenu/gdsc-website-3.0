import { Entity } from "./entity";
import { EntityType } from "./entity-type";
import { Sponsorship } from "../sponsorship";

export interface Organisation extends Entity
{
    entityType: EntityType.Organisation,
    aliases?: string[],
    location?: string,
}
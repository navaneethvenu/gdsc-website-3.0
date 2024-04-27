import { Socials } from "./socials"
import { EventShort } from "./event/event-short"

interface Sponsorship
{
    id: string,
    type: string,
    description: string,
    event: EventShort
}
import { Socials } from "../socials";

export interface Entity
{
    id:string,
    name:string,
    imageURL: string,
    description: string,
    socials: Socials
    sponsorships: Sponsorship[],
}
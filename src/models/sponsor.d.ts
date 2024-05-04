import SponsorEvent from "./sponsor-event";

export default interface Sponsor
{
    name: string,
    description:string,
    imageURL: string,
    events: SponsorEvent[];
}
import { Individual } from "../entity/individual";
import { Testimonial } from "../testimonial";
import { EventSchedule } from "./event-schedule";
import { EventShort } from "./event-short";
import { Skill } from "./skill";

interface Event extends EventShort{
    schedule: EventSchedule[],
    location?:string,
    
    skills:Skill[],
    prerequisites:Skill[],
    
    mentors:Individual[],
    
    gallery: string[],
    testimonials: Testimonial[],
    
    displayShedule: boolean,
}

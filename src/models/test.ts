import { Event } from "./firebase/event/event";
import { EventCategory } from "./firebase/event/event-category";
import { EventStatus } from "./firebase/event/event-status";
import { EventType } from "./firebase/event/event-type";

const x:Event = {
    name: "",
    imageURL: "",
    description: "",
    start_date: "",
    status: EventStatus.Completed,
    category: EventCategory.App,

    type: EventType.InPerson,
    id: "",
    displayShedule: false,
    schedule: {},
    skills: {},
    prerequisites: {},
    mentors: {},
    gallery: [],
    testimonials: {}
}


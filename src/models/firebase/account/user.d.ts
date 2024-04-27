import {Individual} from "../entity/individual";
import {AccountStatus} from "./account-status";

export interface User extends Omit<Individual, 'sponsorships'>
{
    join_date: string,
    preferred_name: string,
    pronouns: string,
    emails: string[],
    number: string[],
    status: AccountStatus
}
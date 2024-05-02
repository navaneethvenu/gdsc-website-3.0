import {Individual} from "../entity/individual";
import {AccountStatus} from "./account-status";
import {AccountType} from "./account-type"

export interface User extends Omit<Individual, 'sponsorships'>
{
    join_date: string,
    preferred_name: string,
    pronouns: string,
    emails: string[],
    number: string[],
    status: AccountStatus,
    type: AccountType,
}
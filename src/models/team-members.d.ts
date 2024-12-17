import Socials from "./firebase/socials";
export default interface teamMember {
  name: string;
  imageURL: string;
  role: string;
  team: string;
  socials: Socials;
}

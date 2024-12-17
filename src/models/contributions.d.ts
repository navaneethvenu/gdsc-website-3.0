import Contributor from "./person-record";

export default interface Contribution {
  contributor: Contributor;
  time: string;
  changes: string[];
  type: string;
}

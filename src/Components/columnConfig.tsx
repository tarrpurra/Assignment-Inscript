import Briefcase from "../assets/Briefcase.png";
import dropdown from "../assets/dropdown.png";
import calendar from "../assets/calendar.png";
import url from "../assets/url.png";
import user from "../assets/user.png";
import hand from "../assets/hand.png";

const columnConfig = [
  { id: "jobRequest", label: "Job Request", icon: Briefcase },
  { id: "submitted", label: "Submitted", icon: calendar },
  { id: "status", label: "Status", icon: dropdown },
  { id: "submitter", label: "Submitter", icon: user },
  { id: "url", label: "URL", icon: url },
  {
    id: "assigned",
    label: "Assigned",
    icon: hand,
    headerStyle: "bg-pink-200 text-pink-800",
  },
  { id: "priority", label: "Priority", icon: "" },
  { id: "dueDate", label: "Due Date", icon: "" },
  { id: "estValue", label: "Est. Value", icon: "" },
  { id: "new", label: "new", icon: "" }
];
export default columnConfig;

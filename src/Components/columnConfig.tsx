const Briefcase = "./src/assets/Briefcase.png";
const dropdown = "./src/assets/dropdown.png";
const calendar = "./src/assets/calendar.png";
const url = "./src/assets/url.png";
const user = "./src/assets/user.png";
const hand = "./src/assets/hand.png";

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
  { id:"new",label:"new", icon:""}
];
export default columnConfig;

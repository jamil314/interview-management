interface InterViewProps {
  id: number;
  dateTime: Date;
  candidateName: string;
}

const InterviewTimes: InterViewProps[] = [
  {
    id: 1,
    dateTime: new Date("2023-03-10 10:00"),
    candidateName: "Rahu",
  },
  {
    id: 2,
    dateTime: new Date("2023-03-15 10:30"),
    candidateName: "Shingjo",
  },
  {
    id: 3,
    dateTime: new Date("2023-03-21 11:00"),
    candidateName: "Gringo",
  },
];

export { InterviewTimes };
export type { InterViewProps };

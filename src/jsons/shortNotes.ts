// Short notes for each subject in the Kenyan curriculum
// Each note: { id, subject, title, content }
export const shortNotes = [
  {
    id: 1,
    subject: "Mathematics",
    title: "Order of Operations (BODMAS)",
    content:
      "BODMAS stands for Brackets, Orders, Division, Multiplication, Addition, Subtraction. Always follow this order when solving math problems.",
  },
  {
    id: 2,
    subject: "English",
    title: "Parts of Speech",
    content:
      "There are 8 parts of speech: noun, pronoun, verb, adjective, adverb, preposition, conjunction, interjection.",
  },
  {
    id: 3,
    subject: "Kiswahili",
    title: "Aina za Vitenzi",
    content:
      "Vitenzi ni maneno yanayoonyesha kitendo. Mfano: kula, soma, cheza.",
  },
  {
    id: 4,
    subject: "Science",
    title: "States of Matter",
    content: "Matter exists in three main states: solid, liquid, and gas.",
  },
  {
    id: 5,
    subject: "Social Studies",
    title: "Arms of Government",
    content:
      "The three arms of government are: Executive, Legislature, and Judiciary.",
  },
  {
    id: 6,
    subject: "Agriculture",
    title: "Types of Crops",
    content:
      "Crops can be classified as food crops (e.g. maize, beans) and cash crops (e.g. tea, coffee).",
  },
  {
    id: 7,
    subject: "Home Science",
    title: "Personal Hygiene",
    content:
      "Personal hygiene involves keeping your body clean to prevent illness.",
  },
  {
    id: 8,
    subject: "Creative Arts",
    title: "Elements of Art",
    content:
      "The basic elements of art are line, shape, color, texture, space, and form.",
  },
  {
    id: 9,
    subject: "Pre-Technical Studies",
    title: "Simple Machines",
    content:
      "Simple machines include lever, pulley, wheel and axle, inclined plane, screw, and wedge.",
  },
  {
    id: 10,
    subject: "Sports & Physical Education",
    title: "Benefits of Exercise",
    content:
      "Regular exercise improves physical fitness, mental health, and overall well-being.",
  },
];

export type ShortNote = (typeof shortNotes)[number];

// src/i18n/ui/en/activities.ts - les trois activites de demonstration en anglais : nom, resume, introduction, sections et liste de benefices.
export const activities = {
  "activity-1": {
    name: "Placeholder activity one",
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. A short summary of the first activity.",
    intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. This introduction presents the first activity in two sentences.",
    imageAlt: "Abstract placeholder illustration for the first activity: turquoise waves",
    sections: [
      {
        title: "How it works",
        body: [
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
          "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
        ],
      },
      {
        title: "Who it is for",
        body: [
          "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
          "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
        ],
      },
    ],
    benefits: ["Placeholder benefit one", "Placeholder benefit two", "Placeholder benefit three", "Placeholder benefit four"],
  },
  "activity-2": {
    name: "Placeholder activity two",
    summary: "Ut enim ad minim veniam, quis nostrud exercitation ullamco. A short summary of the second activity.",
    intro: "Duis aute irure dolor in reprehenderit in voluptate velit esse. This introduction presents the second activity in two sentences.",
    imageAlt: "Abstract placeholder illustration for the second activity: coral circles",
    sections: [
      {
        title: "Our approach",
        body: [
          "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.",
          "Et harum quidem rerum facilis est et expedita distinctio nam libero tempore.",
        ],
      },
      {
        title: "What to expect",
        body: [
          "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet.",
          "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores.",
        ],
      },
    ],
    benefits: ["Placeholder service one", "Placeholder service two", "Placeholder service three", "Placeholder service four"],
  },
  "activity-3": {
    name: "Placeholder activity three",
    summary: "Excepteur sint occaecat cupidatat non proident. A short summary of the third activity.",
    intro: "Sunt in culpa qui officia deserunt mollit anim id est laborum. This introduction presents the third activity in two sentences.",
    imageAlt: "Abstract placeholder illustration for the third activity: layered geometric shapes",
    sections: [
      {
        title: "The principle",
        body: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
          "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae.",
        ],
      },
      {
        title: "Next steps",
        body: [
          "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.",
          "Omnis voluptas assumenda est, omnis dolor repellendus.",
        ],
      },
    ],
    benefits: ["Placeholder option one", "Placeholder option two", "Placeholder option three", "Placeholder option four"],
  },
} as const;

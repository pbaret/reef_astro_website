// src/i18n/ui/fr/activities.ts - les trois activites de demonstration en francais : nom, resume, introduction, sections et liste de benefices.
import type { Dictionary } from "../types";

export const activities = {
  "activity-1": {
    name: "Activité de remplacement un",
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Un court résumé de la première activité.",
    intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. Cette introduction présente la première activité en deux phrases.",
    imageAlt: "Illustration abstraite de remplacement pour la première activité : des vagues turquoise",
    sections: [
      {
        title: "Comment ça marche",
        body: [
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
          "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
        ],
      },
      {
        title: "À qui cela s'adresse",
        body: [
          "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
          "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
        ],
      },
    ],
    benefits: ["Premier bénéfice de remplacement", "Deuxième bénéfice de remplacement", "Troisième bénéfice de remplacement", "Quatrième bénéfice de remplacement"],
  },
  "activity-2": {
    name: "Activité de remplacement deux",
    summary: "Ut enim ad minim veniam, quis nostrud exercitation ullamco. Un court résumé de la deuxième activité.",
    intro: "Duis aute irure dolor in reprehenderit in voluptate velit esse. Cette introduction présente la deuxième activité en deux phrases.",
    imageAlt: "Illustration abstraite de remplacement pour la deuxième activité : des cercles corail",
    sections: [
      {
        title: "Notre approche",
        body: [
          "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.",
          "Et harum quidem rerum facilis est et expedita distinctio nam libero tempore.",
        ],
      },
      {
        title: "À quoi vous attendre",
        body: [
          "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet.",
          "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores.",
        ],
      },
    ],
    benefits: ["Premier service de remplacement", "Deuxième service de remplacement", "Troisième service de remplacement", "Quatrième service de remplacement"],
  },
  "activity-3": {
    name: "Activité de remplacement trois",
    summary: "Excepteur sint occaecat cupidatat non proident. Un court résumé de la troisième activité.",
    intro: "Sunt in culpa qui officia deserunt mollit anim id est laborum. Cette introduction présente la troisième activité en deux phrases.",
    imageAlt: "Illustration abstraite de remplacement pour la troisième activité : des formes géométriques superposées",
    sections: [
      {
        title: "Le principe",
        body: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
          "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae.",
        ],
      },
      {
        title: "Les prochaines étapes",
        body: [
          "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.",
          "Omnis voluptas assumenda est, omnis dolor repellendus.",
        ],
      },
    ],
    benefits: ["Première option de remplacement", "Deuxième option de remplacement", "Troisième option de remplacement", "Quatrième option de remplacement"],
  },
} satisfies Dictionary["activities"];

// src/i18n/ui/es/activities.ts - les trois activites de demonstration en espagnol : nom, resume, introduction, sections et liste de benefices.
import type { Dictionary } from "../types";

export const activities = {
  "activity-1": {
    name: "Actividad de relleno uno",
    summary: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Un breve resumen de la primera actividad.",
    intro: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. Esta introducción presenta la primera actividad en dos frases.",
    imageAlt: "Ilustración abstracta de relleno para la primera actividad: olas turquesa",
    sections: [
      {
        title: "Cómo funciona",
        body: [
          "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
          "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
        ],
      },
      {
        title: "A quién va dirigido",
        body: [
          "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
          "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
        ],
      },
    ],
    benefits: ["Primer beneficio de relleno", "Segundo beneficio de relleno", "Tercer beneficio de relleno", "Cuarto beneficio de relleno"],
  },
  "activity-2": {
    name: "Actividad de relleno dos",
    summary: "Ut enim ad minim veniam, quis nostrud exercitation ullamco. Un breve resumen de la segunda actividad.",
    intro: "Duis aute irure dolor in reprehenderit in voluptate velit esse. Esta introducción presenta la segunda actividad en dos frases.",
    imageAlt: "Ilustración abstracta de relleno para la segunda actividad: círculos coral",
    sections: [
      {
        title: "Nuestro enfoque",
        body: [
          "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum.",
          "Et harum quidem rerum facilis est et expedita distinctio nam libero tempore.",
        ],
      },
      {
        title: "Qué esperar",
        body: [
          "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet.",
          "Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores.",
        ],
      },
    ],
    benefits: ["Primer servicio de relleno", "Segundo servicio de relleno", "Tercer servicio de relleno", "Cuarto servicio de relleno"],
  },
  "activity-3": {
    name: "Actividad de relleno tres",
    summary: "Excepteur sint occaecat cupidatat non proident. Un breve resumen de la tercera actividad.",
    intro: "Sunt in culpa qui officia deserunt mollit anim id est laborum. Esta introducción presenta la tercera actividad en dos frases.",
    imageAlt: "Ilustración abstracta de relleno para la tercera actividad: formas geométricas superpuestas",
    sections: [
      {
        title: "El principio",
        body: [
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.",
          "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae.",
        ],
      },
      {
        title: "Próximos pasos",
        body: [
          "Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.",
          "Omnis voluptas assumenda est, omnis dolor repellendus.",
        ],
      },
    ],
    benefits: ["Primera opción de relleno", "Segunda opción de relleno", "Tercera opción de relleno", "Cuarta opción de relleno"],
  },
} satisfies Dictionary["activities"];

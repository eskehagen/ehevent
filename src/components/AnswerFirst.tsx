import React from 'react';

/**
 * "Svar-først"-afsnittet øverst på hver ydelsesside.
 *
 * Formålet er rent GEO: AI-assistenter citerer helst korte, selvstændige
 * udsagn, der besvarer hvem/hvad/hvor/for hvem uden at man skal læse resten
 * af siden. Derfor står det som ét afsnit med rigtig tekst — ikke som
 * punktopstilling, ikke i et billede, ikke bag et klik.
 */
export const AnswerFirst = ({ children }: { children: React.ReactNode }) => (
  <p className="answer-first">{children}</p>
);

/**
 * Nummereret forløb ("fra forespørgsel til fest").
 * <ol> fordi rækkefølgen er betydningsbærende.
 */
export const ProcessSteps = ({
  steps,
}: {
  steps: { title: string; body: string }[];
}) => (
  <ol className="process-steps">
    {steps.map((s, i) => (
      <li key={s.title}>
        <span className="process-num" aria-hidden="true">
          {String(i + 1).padStart(2, '0')}
        </span>
        <div>
          <h3 className="process-title">{s.title}</h3>
          <p className="process-body">{s.body}</p>
        </div>
      </li>
    ))}
  </ol>
);

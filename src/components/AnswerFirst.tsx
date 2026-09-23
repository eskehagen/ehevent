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


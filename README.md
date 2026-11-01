# Hogwarts API

Backend til Hogwarts-projektet lavet med Node.js, Express og PostgreSQL.

## Opsætning

Først skal pakkerne installeres med `npm install`. Derefter skal der oprettes en database i pgAdmin der hedder `hogwarts`, og så skal `hogwarts-query.sql` køres i Query Tool på den database. Det opretter tabellerne.

.env.example har en placeholder som adgangskode, som blot erstattes... så længe du ikke snakker om den

Serveren startes med `npm run dev` og kører på `http://localhost:3000`.

## Opbygning

Koden er delt op i routes, controllers og repositories. Routes bestemmer hvilken controller-funktion en URL sender videre til. Controllers tager imod requesten og sender response tilbage. Repositories er der hvor SQL'en ligger, og det er kun dem der snakker med databasen.

## Endpoints

Houses kan kun hentes. Teachers, students og courses kan hentes, oprettes, opdateres og slettes (CRUD), og på courses kan man også skifte teacher og tilføje eller fjerne students.

### Houses

| Metode | Route | Beskrivelse |
|---|---|---|
| GET | /houses | Hent alle houses |
| GET | /houses/:id | Hent ét house |

### Teachers

| Metode | Route | Beskrivelse | Body |
|---|---|---|---|
| GET | /teachers | Hent alle teachers | |
| GET | /teachers/:id | Hent én teacher | |
| POST | /teachers | Opret teacher | `{ "name": "...", "house_id": 1 }` |
| PUT | /teachers/:id | Opdater teacher | `{ "name": "...", "house_id": 1 }` |
| DELETE | /teachers/:id | Slet teacher | |

### Students

| Metode | Route | Beskrivelse | Body |
|---|---|---|---|
| GET | /students | Hent alle students | |
| GET | /students/:id | Hent én student | |
| POST | /students | Opret student | `{ "name": "...", "year": 1, "house_id": 1 }` |
| PUT | /students/:id | Opdater student | `{ "name": "...", "year": 1, "house_id": 1 }` |
| DELETE | /students/:id | Slet student | |

### Courses

| Metode | Route | Beskrivelse | Body |
|---|---|---|---|
| GET | /courses | Hent alle courses | |
| GET | /courses/:id | Hent ét course med teacher og students | |
| POST | /courses | Opret course | `{ "name": "...", "teacher_id": 1 }` |
| PUT | /courses/:id | Opdater navnet på et course | `{ "name": "..." }` |
| DELETE | /courses/:id | Slet course | |
| PUT | /courses/:id/teacher | Skift teacher på et course | `{ "teacher_id": 1 }` |
| POST | /courses/:id/students | Tilføj student til et course | `{ "student_id": 1 }` |
| DELETE | /courses/:id/students/:studentId | Fjern student fra et course | |

Når det går godt svarer API'et med 200, eller 201 når noget er blevet oprettet. Hvis der mangler noget i body, fx name, kommer der 400, og hvis det man leder efter ikke findes kommer der 404. Hvis man prøver at tilføje en student til et fag den allerede er på, kommer der 409. Går noget galt med databasen kommer der 500.

## Hvordan tester man med Bruno

Testene ligger i mappen `bruno-testing`. Man starter serveren med `npm run dev`, åbner Bruno, vælger Open Collection og finder mappen. Så kan man enten højreklikke på collectionen og vælge Run for at køre alle tests, eller klikke på en enkelt request og trykke Send.

Der er en mappe for houses, teachers, students og courses, og requests er nummereret, så de skal køres i rækkefølge. Det er fordi Create gemmer id'et på det nye objekt, og de næste requests bruger det id. På den måde er det kun det testene selv opretter der bliver ændret og slettet, og ikke testdataene fra SQL-filen.


Testene bruger testdataene fra `hogwarts-query.sql` (fx student med id 1), så databasen skal være sat op med den først.

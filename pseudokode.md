# Pseudokode

Alle endpoints går fra router -> controller -> repository. Routeren sender videre til controlleren, controlleren snakker med req og res, og repository laver SQL'en.

Hvis noget går galt med databasen sendes der 500.

## GET /houses

```
hent alle houses fra databasen (SELECT * FROM houses)
send dem tilbage som json
```

GET /teachers, GET /students og GET /courses er det samme, bare med en anden tabel.

## GET /houses/:id

```
tag id fra url'en
find house med det id i databasen
hvis den findes
send den, status 200
hvis ikke
send 404
```

GET /teachers/:id og GET /students/:id er det samme.

GET /courses/:id er næsten det samme, men den henter også navnet på teacheren og en liste af de students der går på faget (fra course_students tabellen).

## POST /teachers

```
tjek at der er et name i body
hvis ikke vises 400
indsæt teacher i databasen med name og house_id
send den nye teacher tilbage, status 201
```

POST /students er det samme men med year også. POST /courses er det samme men med teacher_id.

## PUT /teachers/:id

```
tjek at der er et name i body
hvis ikke vises 400
opdater teacheren med det id
hvis den fandtes
send den opdaterede teacher, status 200
hvis ikke vises 404
```

PUT /students/:id er det samme. PUT /courses/:id er også det samme, men den ændrer kun navnet.

## DELETE /teachers/:id

```
slet teacher med det id
hvis der blev slettet noget
send 200
hvis ikke
send 404
```

DELETE /students/:id og DELETE /courses/:id er det samme.

## PUT /courses/:id/teacher

```
tjek at der er et teacher_id i body, ellers 400
find teacheren, hvis den ikke findes -> 404
sæt teacher_id på faget
hvis faget ikke findes -> 404
ellers send faget, status 200
```

## POST /courses/:id/students

```
tjek at der er et student_id i body, ellers 400
tjek at faget findes, ellers 404
tjek at studenten findes, ellers 404
indsæt i course_students
hvis studenten allerede er på faget -> 409
ellers send 201
```

## DELETE /courses/:id/students/:studentId

```
slet rækken i course_students med det course_id og student_id
hvis der blev slettet noget -> 200
ellers -> 404
```

(studenten bliver ikke slettet, kun fra faget)

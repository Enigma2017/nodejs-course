const getFullName = ( { firstName, lastName } ) => `${ firstName } ${ lastName }`;

const filterUniqueWords = text =>
  [ ...new Set(
    text
      .toLowerCase()
      .match( /\b\w+\b/g )
  ) ].sort();

const getAverageGrade = students =>
  students
    .flatMap( student => student.grades )
    .reduce( ( sum, grade, _, arr ) => sum + grade / arr.length, 0 );

console.log( getFullName( { firstName: "Kateryna", lastName: "Shvets" } ) );

console.log( filterUniqueWords( "Summer months are june, jule, august" ) );

const students = [
  { name: "Kateryna", grades: [90, 86] },
  { name: "Bogdan", grades: [77, 92] }
];
console.log( getAverageGrade( students ) );
function usegetGradesCount(students) {
  const A = students.filter((student) => student.grade === "A").length;
  const B = students.filter((student) => student.grade === "B").length;
  const C = students.filter((student) => student.grade === "C").length;
  const F = students.filter((student) => student.grade === "F").length;

  return { A, B, C, F };
}

export default usegetGradesCount;

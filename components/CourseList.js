import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import Course from './Course';
import TermSelector from './TermSelector'
import { getCourseNumber, getCourseTerm, hasConflict, terms } from '../utils/course'



const CourseList = ({courses, view}) => {
  const [selectedTerm, setSelectedTerm] = useState('Fall');
  const termCourses = courses.filter(course => selectedTerm === getCourseTerm(course));

  return (
    <ScrollView>
      <TermSelector selectedTerm={selectedTerm} setSelectedTerm={setSelectedTerm} />
      <CourseSelector courses={termCourses} view={view}/>
    </ScrollView>
  );
};

const CourseSelector = ({courses, view}) => {
  const [selected, setSelected] = useState([]);
  const toggle = course => setSelected(selected => (
  selected.includes(course) ? selected.filter(x => x !== course) : [...selected, course]
));

  return (
    <View style={styles.courseList}>
      {
        courses.map(course => (
          <Course key={course.id} course={course} view = {view}
          isDisabled={hasConflict(course, selected)}
          select={toggle}
          isSelected={selected.includes(course)}
          />
        ))
      }
    </View>
  );
};

const styles = StyleSheet.create({
  courseList: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default CourseList;

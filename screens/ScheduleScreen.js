import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import UserContext from '../UserContext';
import CourseList from '../components/CourseList';
import CourseEditScreen from './CourseEditScreen';
import { firebase } from "../firebase.js"


const Banner = ({title}) => (
  <Text style={styles.bannerStyle}>{title || '[loading...]'}</Text>
);
const db = firebase.database().ref();

const fixCourses = json => ({
  ...json,
  courses: Object.values(json.courses)
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerStyle: {
    color: '#888',
    fontSize: 32,
  },
});

const ScheduleScreen = ({navigation}) => {
  const [schedule, setSchedule] = useState({ title: '', courses: [] });
  const user = useContext(UserContext);
  const canEdit = user && user.role === 'admin';
  const view = (course) => {
    navigation.navigate(canEdit ? 'CourseEditScreen' : 'CourseDetailScreen', { course });
  };
  useEffect(() => {
      const db = firebase.database().ref();
      const handleData = snap => {
        if (snap.val()) setSchedule(fixCourses(snap.val()));
      }
      db.on('value', handleData, error => alert(error));
      return () => { db.off('value', handleData); };
  }, []);

  const url = 'https://courses.cs.northwestern.edu/394/data/cs-courses.php';

  useEffect(() => {
    const fetchSchedule =  async () => {
      const response = await fetch(url);
      if (!response.ok) throw response;
      const json = await response.json();
      setSchedule(json);
    }
    fetchSchedule();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Banner title={schedule.title} error={schedule.error} />
      <CourseList courses={schedule.courses} view={view} />
    </SafeAreaView>
  );
};

export default ScheduleScreen;

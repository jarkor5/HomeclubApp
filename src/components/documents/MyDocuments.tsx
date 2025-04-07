import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  ScrollView
} from 'react-native';
import { colors, fonts, fontSizes } from '@/src/constants/theme';
import { AntDesign, FontAwesome6 } from '@expo/vector-icons';
import PersonalInfoForm from '@/src/components/documents/PersonalInfoForm';
import CheckInForm from '@/src/components/documents/CheckInForm';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

const sections = [
  { id: 1, title: 'Información personal', },
  { id: 2, title: 'Llegada y check-in', },
];

export default function MyDocuments() {
  const [activeSections, setActiveSections] = useState<number[]>([]);

  const toggleSection = (id: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (activeSections.includes(id)) {
      setActiveSections(activeSections.filter(sectionId => sectionId !== id));
    } else {
      setActiveSections([...activeSections, id]);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {sections.map((section) => {
        const isActive = activeSections.includes(section.id);
        return (
          <View key={section.id}>
            <TouchableOpacity onPress={() => toggleSection(section.id)} style={styles.header}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.numberIcon}>
                  <Text style={styles.numberText}>{section.id}</Text>
                </View>
                <Text style={styles.title}>{section.title}</Text>
              </View>
              <AntDesign name={isActive ? 'down' : 'up'} size={22} color={colors.black} style={{ top: 5 }} />
            </TouchableOpacity>
            <View style={{ padding: 16 }}>
              {isActive && section.id === 1 && <PersonalInfoForm />}
              {isActive && section.id === 2 && <CheckInForm />}
            </View>


          </View>
        );
      })}

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    paddingBottom: 100
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: colors.lightGray,
  },
  title: {
    fontFamily: fonts.montreal,
    fontSize: fontSizes.lg,
    color: colors.black,
  },
  content: {
    fontFamily: fonts.montreal,
    fontSize: fontSizes.sm,
    color: colors.gray,
    padding: 32
  },
  chevron: {
    fontSize: 18,
    color: colors.black,
  },
  numberIcon: {
    width: 26,
    height: 26,
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  numberText: {
    fontSize: fontSizes.base,
    fontFamily: fonts.montreal,
    color: colors.black,
  },
});

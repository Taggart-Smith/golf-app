import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';

const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0]; // "2025-04-17"
};

const generateTimeSlots = (): string[] => {
  const times: string[] = [];
  const current = new Date();
  current.setHours(7, 0, 0, 0);
  const end = new Date();
  end.setHours(20, 0, 0, 0);

  while (current <= end) {
    const h = current.getHours();
    const m = current.getMinutes();
    const suffix = h >= 12 ? 'PM' : 'AM';
    const displayHour = h % 12 === 0 ? 12 : h % 12;
    const displayMin = m.toString().padStart(2, '0');
    times.push(`${displayHour}:${displayMin} ${suffix}`);
    current.setMinutes(current.getMinutes() + 10);
  }
  return times;
};

const timeSlots = generateTimeSlots();
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3001';

const TeeSheet = () => {
  const [teeTimesByTime, setTeeTimesByTime] = useState<{ [key: string]: any[] }>({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    const formattedDate = formatDate(selectedDate);

    fetch(`${API_BASE_URL}/api/tee-times?date=${formattedDate}`)
      .then(res => res.json())
      .then(data => {
        const grouped: { [key: string]: any[] } = {};

        data.forEach((tt: any) => {
          const timeStr = tt.time;
          if (!grouped[timeStr]) grouped[timeStr] = [];
          grouped[timeStr].push(tt);
        });

        setTeeTimesByTime(grouped);
      })
      .catch(err => console.error('Error fetching tee times:', err));
  }, [selectedDate]);

  const onChangeDate = (event: any, date?: Date) => {
    if (Platform.OS !== 'web') setShowPicker(false);
    if (date) setSelectedDate(date);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Tee Sheet</Text>

      <View style={{ alignItems: 'center', marginBottom: 12 }}>
        {Platform.OS === 'web' ? (
          <input
            type="date"
            value={formatDate(selectedDate)}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
            style={{
              padding: 10,
              fontSize: 16,
              borderRadius: 8,
              border: '1px solid #ccc',
              width: 180,
              textAlign: 'center',
            }}
          />
        ) : (
          <>
            <TouchableOpacity
              onPress={() => setShowPicker(true)}
              style={{
                backgroundColor: '#e9ecef',
                paddingVertical: 10,
                paddingHorizontal: 20,
                borderRadius: 8,
              }}
            >
              <Text>{formatDate(selectedDate)}</Text>
            </TouchableOpacity>
            {showPicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="default"
                onChange={onChangeDate}
              />
            )}
          </>
        )}
      </View>

      {timeSlots.map((time, index) => (
        <View key={index} style={styles.row}>
          <View style={styles.timeColumn}>
            <Text style={styles.timeText}>{time}</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.courseSlotRow}>
              {(teeTimesByTime[time] || []).map((tt, i) => (
                <TouchableOpacity
                  key={i}
                  style={styles.teeSlot}
                  onPress={() =>
                    console.log(`Booked ${tt.courseName} at ${time}`)
                  }
                >
                  <Text style={styles.teeSlotText}>{tt.courseName}</Text>
                  <Text style={styles.teeSlotSub}>
                    ${tt.priceWalk.toFixed(2)} / ${tt.priceWithCart.toFixed(2)} • {tt.spotsLeft} spots
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      ))}
    </ScrollView>
  );
};

export default TeeSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  timeColumn: {
    width: 80,
    alignItems: 'center',
    paddingRight: 8,
  },
  timeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#495057',
  },
  courseSlotRow: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  teeSlot: {
    backgroundColor: '#e9ecef',
    borderRadius: 8,
    marginHorizontal: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
  },
  teeSlotText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0d6efd',
  },
  teeSlotSub: {
    fontSize: 12,
    color: '#6c757d',
    marginTop: 4,
  },
});

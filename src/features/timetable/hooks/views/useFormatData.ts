export const useFormatData = (classData: any) => {
  // Map days to FullCalendar day codes

  const startDate = classData.startDate;
  const startTime = classData.startTime;
  const endTime = classData.endTime;

  const startDateTime = new Date(
    startDate.getFullYear(),

    startDate.getMonth(),

    startDate.getDate(),

    startTime.getHours(),

    startTime.getMinutes(),

    startTime.getSeconds(),
  );

  const durationMinutes = (endTime - startTime) / 60000;
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;
  const duration = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;

  // Parse days string to array
  const daysArray = classData.days ? classData.days.split(",") : [];
  const byweekday = daysArray
    .map((day: string) => day.trim().slice(0, 2).toUpperCase())
    .filter(Boolean);

  return {
    id: classData.id.toString(),
    title: classData.course_name || "Untitled Class",
    rrule: {
      freq: "weekly",
      byweekday: byweekday,
      dtstart: startDateTime.toISOString(),
      until: classData.endDate ? classData.endDate : undefined,
    },
    duration: duration,
    extendedProps: {
      teacher: classData.teacher_name || "Unknown Teacher",
      courseId: classData.courseId,
      teacherId: classData.teacherId,
      batch: classData.batch,
      startTime: classData.startTime,
      endTime: classData.endTime,
      classData: classData,
    },
  };
};

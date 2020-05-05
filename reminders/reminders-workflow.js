function run(argv) {
  var query = argv[0];
  var argWords = query.split(" ");
  var len = argWords.length;
  var rName, rRemindDate;
  rName = argWords[0];

  switch (argWords.length){
        case 1:
          // only remind info
          // actual remind time: current datetime + 1 hour
          rRemindDate = new Date();
          rRemindDate.setHours(rRemindDate.getHours()+1);
          break;
        case 2:
          // remind info + remind time(today)
          // actual remind time: current date + remind time 
          // todo: if actual remind time is before now, than add 1 day
          // todo: argWords[1] might be the date.
          var timeWords = argWords[1].split(":");
          var hour = timeWords[0];
          var minute = timeWords[1];

          rRemindDate = new Date();
          rRemindDate.setHours(hour);
          rRemindDate.setMinutes(minute);
          break;
        case 3:
          // remind info + remind date + remind time
          // actual remind time: current date + remind time 
          // todo: if actual remind time is before now, than add 1 year
          var dateWords = argWords[1].split("/");
          var month = dateWords[0];
          var day = dateWords[1];

          var timeWords = argWords[2].split(":");
          var hour = timeWords[0];
          var minute = timeWords[1];

          rRemindDate = new Date();
          rRemindDate.setMonth(month);
          rRemindDate.setDate(day);
          rRemindDate.setHours(hour);
          rRemindDate.setMinutes(minute);
          break;
        default:
          return "格式错误！！";
  }

  // reminders
  var rApp = Application("Reminders");
  var reminder = rApp.Reminder();
  reminder.name = rName;
  reminder.remindMeDate = rRemindDate;
  rApp.lists.byName("todo").reminders.push(reminder);


  // calender
  var cApp = Application("Calendar");

  var cStartTime = new Date(rRemindDate);
  var cEndTime = new Date(rRemindDate);
  cEndTime.setHours(cEndTime.getHours()+1);
  var event = cApp.Event();
  event.summary = rName;
  event.startDate = cStartTime;
  event.endDate = cEndTime;

  cApp.calendars.byName("reminders").events.push(event);

  return rName + " 添加成功";
}
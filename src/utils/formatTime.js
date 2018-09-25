import dayjs from "dayjs";

function formatType(time) {
  let now = dayjs();
  let diff = dayjs().diff(dayjs(time), "month");
  return diff > 0 ? "date" : "relative";
}

export default formatType
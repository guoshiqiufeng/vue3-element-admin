import dayjs from 'dayjs'

enum FormatPattern {
  DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss',
  DATE_FORMAT = 'YYYY-MM-DD',
  Time_FORMAT = 'HH:mm:ss'
}

/**
 * 时间戳转换为string
 * @param timespan
 * @param format
 */
export function formatTimeSpan(
  timespan: number,
  format: string = FormatPattern.DATE_TIME_FORMAT
) {
  return dayjs(timespan).format(format)
}

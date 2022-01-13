let BASE_URL = ''
const TIME_OUT = 10000
const MOCK_URL =
  'https://www.fastmock.site/mock/c36122fe80b2f5cbb83bc369bdd4b5a6/vea'
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://localhost:9000'
} else if (process.env.NODE_ENV === 'production') {
  // BASE_URL = 'http://localhost:9000'
  BASE_URL = MOCK_URL
} else {
  BASE_URL = 'http://localhost:9000'
}

export { BASE_URL, TIME_OUT }

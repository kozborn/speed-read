import jestFetchMock from 'jest-fetch-mock'
import "./__mocks__/requestAnimation";

global.fetch = jestFetchMock

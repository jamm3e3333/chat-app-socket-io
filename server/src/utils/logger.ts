import logger from 'pino';
import dayjs from 'dayjs';

const log =  logger({
    prettifier: true,
    base: {
        pid: true,
    },
    timestamp: () => `,"time":"${dayjs().format()}"`,
});

export default log; 
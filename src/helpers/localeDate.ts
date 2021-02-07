import * as jmoment from 'jalali-moment';

import { getTimezone } from './timezone';

export const localeDate = (date, format, timezone = getTimezone()) => {
    const getFormat = type => {
        return {
            fullDate: ' HH:mm:ss YYYY/MM/DD',
            shortDate: ' HH:mm YYYY/MM/DD',
            time: 'HH:mm:ss',
        }[type];
    };
    const formatDisplay = getFormat(format);


    return jmoment(date).locale('fa').format(formatDisplay);
};

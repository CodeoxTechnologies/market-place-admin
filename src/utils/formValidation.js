// Error Code
/*
0 => No error
1 => Empty field
2 => Minimum length
3 => Maximum length
4 => Pattern not matching
*/
import moment from 'moment';
export const dateValidation = (data) => {
    if (data.required) {
        if (data.fieldval.trim().length) {
            checkValidDate(data);
        } else {
            return 'Please enter the Date'
        }
    } else {
        if (data.fieldval.trim().length) {
            checkValidDate(data);
        } else {
            return ''
        }
    }
}
export const fieldValidation = (data) => {
    // Check for Required Field case:
    if (data.required) {
        if (data.fieldval && data.fieldval.toString().trim().length) {
            return checkForValidationPath(data)
        } else {
            return 1
        }
    } else {
        if (data.fieldval && data.fieldval.trim().length) {
            return checkForValidationPath(data)
        } else {
            return 0
        }
    }
}
export const dateRangeValidation = (startDate, endDate, days = 1) => {
    let dayDiffs = moment(endDate, 'YYYY-MM-DD').endOf('day').diff(moment(startDate, 'YYYY-MM-DD').endOf('day'), 'days');
    if (dayDiffs >= days) {
        return ''
    } else {
        if (dayDiffs < 0) {
            return 'Start Date cannot be greater then End Date'
        } else {
            return `Minimum difference b/w dates should be ${days} Day(s)`
        }

    }
}
const checkForValidationPath = (data) => {
    if (data.minLength) {
        if (checkMinlength(data.fieldval, data.minLength)) {
            return 2
        }
    }
    if (data.maxLength) {
        if (checkMaxlength(data.fieldval, data.maxLength)) {
            return 3
        }
    }
    if (data.regexPattern) {
        if (!checkPatternMatches(data.fieldval, data.regexPattern)) {
            return 4
        }
    }
    if (data.datePattern) {
        if (!moment(data.fieldval, 'DD-MM-YYY').isValid()) {
            return 5
        }
    }
    return 0;
}
const checkMinlength = (fieldval, minLength) => {
    return fieldval.trim().length < minLength
}
const checkMaxlength = (fieldval, maxLength) => {
    return fieldval.trim().length > maxLength
}
const checkPatternMatches = (fieldval, regexPattern) => {
    return regexPattern.test(fieldval.trim())
}
const checkValidDate = (data) => {
    if (!moment(data.fieldval, 'YYYY-MM-DD', true).isValid()) {
        return 'Please enter valid Date'
    }
    if (data.futureDisable) {
        if (moment(data.fieldval, 'YYYY.MM.DD').endOf('day').diff(moment().endOf('day'), 'days') >= 0) {
            return 'Cannot be future date'
        }
    }
    if (data.pastDisable) {
        if (moment(data.fieldval, 'YYYY.MM.DD').endOf('day').diff(moment().endOf('day'), 'days') < 0) {
            return 'Cannot be a past date'
        }
    }
    if (data.diffDays) {
        if (moment(data.fieldval, 'YYYY.MM.DD').endOf('day').diff(moment(data.compareDate, 'YYYY.MM.DD').endOf('day'), 'days') < data.diffDays) {
            return 'Minimum Days Difference'
        }
    }
}

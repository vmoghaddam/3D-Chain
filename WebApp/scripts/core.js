function subtractDates(d1, d2) {


    var diff = Math.abs(new Date(d1) - new Date(d2));
    var minutes = ((diff / 1000) / 60);
    return minutes;
}
// new Date("dateString") is browser-dependent and discouraged, so we'll write
// a simple parse function for U.S. date format (which does no error checking)
function parseDate(date) {
    var mdy = str.split('/');

    return new Date(mdy[2], mdy[0] - 1, mdy[1]);
}

function datediff(first, second) {
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.
    var dfirst = new Date(first.getFullYear(), first.getMonth(), first.getDate());
    var dsecond = new Date(second.getFullYear(), second.getMonth(), second.getDate());
    return Math.round((dsecond - dfirst) / (1000 * 60 * 60 * 24));
}

function daysBetween(date1, date2) {   //Get 1 day in milliseconds   
    var one_day = 1000 * 60 * 60 * 24;    // Convert both dates to milliseconds
    var date1_ms = date1.getTime();
    var date2_ms = date2.getTime();    // Calculate the difference in milliseconds  
    var difference_ms = date2_ms - date1_ms;        // Convert back to days and return   
    return Math.round(difference_ms / one_day);
}
function pad(number) {
    if (number < 10) {
        return '0' + number;
    }
    return number;
}
if (!Date.prototype.toUTCDateTimeDigits) {
    (function () {



        Date.prototype.toUTCDateTimeDigits = function () {
            return this.getUTCFullYear() +
                pad(this.getUTCMonth() + 1) +
                pad(this.getUTCDate()) +
                'T' +
                pad(this.getUTCHours()) +
                pad(this.getUTCMinutes()) +
                pad(this.getUTCSeconds()) +
                'Z';
        };

    }());
}

if (!Date.prototype.toDateTimeDigits) {
    (function () {



        Date.prototype.toDateTimeDigits = function () {
            return this.getFullYear() +
                pad(this.getMonth() + 1) +
                pad(this.getDate()) +
                'T' +
                pad(this.getHours()) +
                pad(this.getMinutes()) +
                pad(this.getSeconds()) +
                'Z';
        };

    }());
}
Date.prototype.getDatePart = function () {
    return this.getFullYear() +
        pad(this.getMonth() + 1) +
        pad(this.getDate());
};
Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + (h * 60 * 60 * 1000));
    return this;
};
Date.prototype.addMinutes = function (h) {
    this.setTime(this.getTime() + (h * 60 * 1000));
    return this;
};
Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};
Date.prototype.yyyymmdd = function () {
    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return [this.getFullYear(),
    (mm > 9 ? '' : '0') + mm,
    (dd > 9 ? '' : '0') + dd
    ].join('');
};

Date.prototype.ToUTC = function () {
    //2017-12-31T20:30:00.000Z

    var mm = this.getMonth() + 1; // getMonth() is zero-based
    var dd = this.getDate();

    return this.getFullYear() + '-' + ((mm > 9 ? '' : '0') + mm) + '-' + ((dd > 9 ? '' : '0') + dd) + 'T' + '12:00:00.000Z';

};

if (typeof JSON.clone !== "function") {
    JSON.clone = function (obj) {
        return JSON.parse(JSON.stringify(obj));
    };
}
if (typeof JSON.copy !== "function") {
    JSON.copy = function (source, destination) {
        for (var key in source) {

            var value = source[key];
            destination[key] = value;

        }
    };
}

if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength, padString) {
        targetLength = targetLength >> 0; //truncate if number, or convert non-number to 0;
        padString = String(typeof padString !== 'undefined' ? padString : ' ');
        if (this.length >= targetLength) {
            return String(this);
        } else {
            targetLength = targetLength - this.length;
            if (targetLength > padString.length) {
                padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
            }
            return padString.slice(0, targetLength) + String(this);
        }
    };
}

General = {};
General.getDayFirstHour = function (d) {
    return new Date(new Date(d.setHours(0)).setMinutes(0)).setSeconds(0);
};
General.getDayLastHour = function (d) {
    return new Date(new Date(d.setHours(23)).setMinutes(59)).setSeconds(59);
};
General.MonthDataSource = [
    { Id: 0, Title: 'January' },
    { Id: 1, Title: 'February' },
    { Id: 2, Title: 'March' },
    { Id: 3, Title: 'April' },
    { Id: 4, Title: 'May' },
    { Id: 5, Title: 'June' },
    { Id: 6, Title: 'July' },
    { Id: 7, Title: 'August' },
    { Id: 8, Title: 'September' },
    { Id: 9, Title: 'October' },
    { Id: 10, Title: 'November' },
    { Id: 11, Title: 'December' },

];
General.WeekDayDataSource = [
    { Id: 0, Title: 'Sunday' },
    { Id: 1, Title: 'Monday' },
    { Id: 2, Title: 'Tuesday' },
    { Id: 3, Title: 'Wednesday' },
    { Id: 4, Title: 'Thursday' },
    { Id: 5, Title: 'Friday' },
    { Id: 6, Title: 'Saturday' },


];
General.IsNumber = function (obj) {
    return !isNaN(parseFloat(obj))
};
General.getDsUrl = function (e) {
    var url = e.url;
    var parts = [];
    if (e.params.$filter)
        parts.push('$filter=' + e.params.$filter);
    if (e.params.$orderby)
        parts.push('$orderby=' + e.params.$orderby);
    if (parts.length > 0) {
        var ext = parts.join("&");
        url = url + "?" + ext;
    }
    return url;
};
General.getDigitalDateByUnix = function (unix) {
    var day = new persianDate(unix);

    var result = Number(day.year().toString() + day.month().toString().padStart(2, "0") + day.date().toString().padStart(2, "0"));
    return result;
};

General.ShowOK = function () {
    DevExpress.ui.notify({
        type: 'success',
        message: "تغییرات با موفقیت ذخیره شد",
        position: {
            my: "center top",
            at: "center top"
        }
    });
};
General.ShowNotify = function (str, t) {
    //'info' | 'warning' | 'error' | 'success' | 'custom'
    DevExpress.ui.notify({
        message: str,
        position: {
            my: "center top",
            at: "center top"
        },
        type: t,
        displayTime: 2000,
    });
};
General.Confirm = function (str, callback) {
    var myDialog = DevExpress.ui.dialog.custom({
        rtlEnabled: true,
        title: "Confirm",
        message: str,
        buttons: [{ text: "No", onClick: function () { callback(false); } }, { text: "Yes", onClick: function () { callback(true); } }]
    });
    myDialog.show();

};

General.Modal = function (str, callback) {
    var myDialog = DevExpress.ui.dialog.custom({
        rtlEnabled: true,
        title: "پیغام",
        message: str,
        buttons: [{ text: "برگشت", onClick: function () { callback(); } }]
    });
    myDialog.show();

};
General.generateINTFull = function (key) {
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth() + 1;

    var day = d.getDate();
    var h = d.getHours();
    var min = d.getMinutes();

    var ms = d.getMilliseconds();
    var s = d.getSeconds();
    return key.toString() + '_' + year.toString() + month.toString() + day.toString() + h.toString() + min.toString() + s.toString() + ms.toString();
};
General.addComma = function (str) {
    if (!str)
        return str;
    str = str.toString();
    var objRegex = new RegExp('(-?[0-9]+)([0-9]{3})');

    while (objRegex.test(str)) {
        str = str.replace(objRegex, '$1,$2');
    }

    return str;
};
General.removeComma = function (str) {

    if (str) {
        str = str.toString();
        return str.replace(/,/g, '');
    }
    return str;
};


///////////////////////////////////////////////////////////////
Weather = {};
Weather.getCompassPoint = function (num) {
    var val = Math.floor((num / 22.5) + 0.5);
    var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
};
////////////////////////////////////////////////////////////////////
Exceptions = {};
Exceptions.getMessage = function (error) {
    return {
        message: error.data
        //error.status + ' ' + error.statusText + ' ' + error.data 
    };
};
/////////////////////////////////////////////////////////////////
Config = {};
Config.Text_NoRowSelected = 'No Row(s) Selected';
Config.Text_NoFlightSelected = 'No Flight(s) Selected';
Config.Text_NoSarfaslSelected = 'هیچ سرفصلی انتخاب نشده است';
Config.Text_DeleteConfirm = 'The selected row will be deleted. Are you sure?';
Config.Text_SimpleConfirm = 'Are you sure?';
Config.Text_CanNotDelete = 'The selected cannot be deleted';
Config.Text_CanNotEdit = 'این ردیف قابل ویرایش نمی باشد';
Config.Text_FillRequired = 'Please fill in all required fields.';
Config.Text_SavedOk = 'The changes have been successfully saved.';
Config.Text_SameItemExist = 'Same item exists.';
Config.Text_GanttErrors = 'Gaps & Overlaps';
Config.Text_InvalidDates = 'Invalid Dates';
Config.Text_OffBlock = 'Off Block Value is invalid';
Config.Text_TakeOff = 'Take Off Value is invalid';
Config.Text_Landing = 'Landing Value is invalid';
Config.Text_OnBlock = 'On Block Value is invalid';

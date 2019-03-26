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
/////////////////////////////////////////////////////////////////
Flight = {};
Flight.Weather1 ='{"latitude":37.3833007812,"longitude":55.4519996643,"timezone":"Asia/Tehran","currently":{"time":1550464596,"summary":"Partly Cloudy","icon":"partly-cloudy-day","precipIntensity":0,"precipProbability":0,"temperature":8.75,"apparentTemperature":8.75,"dewPoint":2.96,"humidity":0.67,"pressure":1016.5,"windSpeed":1.17,"windGust":17.43,"windBearing":171,"cloudCover":0.59,"uvIndex":0,"visibility":10.64,"ozone":349.29},"daily":{"summary":"Light rain today and tomorrow, with high temperatures bottoming out at 7°C on Wednesday.","icon":"rain","data":[{"time":1550435400,"summary":"Mostly cloudy in the morning.","icon":"partly-cloudy-day","sunriseTime":1550459136,"sunsetTime":1550498491,"moonPhase":0.45,"precipIntensity":0.0686,"precipIntensityMax":0.5486,"precipIntensityMaxTime":1550435400,"precipProbability":0.26,"precipType":"rain","temperatureHigh":16.44,"temperatureHighTime":1550489400,"temperatureLow":4.68,"temperatureLowTime":1550539800,"apparentTemperatureHigh":16.44,"apparentTemperatureHighTime":1550489400,"apparentTemperatureLow":3.3,"apparentTemperatureLowTime":1550539800,"dewPoint":0.14,"humidity":0.52,"pressure":1013.15,"windSpeed":4.99,"windGust":21.55,"windGustTime":1550435400,"windBearing":166,"cloudCover":0.33,"uvIndex":4,"uvIndexTime":1550478600,"visibility":13.62,"ozone":352.36,"temperatureMin":7.1,"temperatureMinTime":1550460600,"temperatureMax":16.44,"temperatureMaxTime":1550489400,"apparentTemperatureMin":5.81,"apparentTemperatureMinTime":1550442600,"apparentTemperatureMax":16.44,"apparentTemperatureMaxTime":1550489400},{"time":1550521800,"summary":"Foggy starting in the afternoon, continuing until evening.","icon":"fog","sunriseTime":1550545463,"sunsetTime":1550584954,"moonPhase":0.49,"precipIntensity":0.2159,"precipIntensityMax":0.348,"precipIntensityMaxTime":1550586600,"precipProbability":0.79,"precipType":"rain","temperatureHigh":8.01,"temperatureHighTime":1550557800,"temperatureLow":2.66,"temperatureLowTime":1550637000,"apparentTemperatureHigh":7.86,"apparentTemperatureHighTime":1550561400,"apparentTemperatureLow":0.8,"apparentTemperatureLowTime":1550637000,"dewPoint":-1.44,"humidity":0.57,"pressure":1016.02,"windSpeed":4.15,"windGust":14.4,"windGustTime":1550575800,"windBearing":248,"cloudCover":0.57,"uvIndex":3,"uvIndexTime":1550561400,"visibility":10.88,"ozone":372.07,"temperatureMin":4.68,"temperatureMinTime":1550539800,"temperatureMax":8.01,"temperatureMaxTime":1550557800,"apparentTemperatureMin":3.3,"apparentTemperatureMinTime":1550539800,"apparentTemperatureMax":7.86,"apparentTemperatureMaxTime":1550561400},{"time":1550608200,"summary":"Mostly cloudy until evening.","icon":"partly-cloudy-day","sunriseTime":1550631789,"sunsetTime":1550671417,"moonPhase":0.53,"precipIntensity":0.1295,"precipIntensityMax":0.3454,"precipIntensityMaxTime":1550615400,"precipProbability":0.6,"precipType":"rain","temperatureHigh":7.42,"temperatureHighTime":1550662200,"temperatureLow":-2.42,"temperatureLowTime":1550716200,"apparentTemperatureHigh":6.6,"apparentTemperatureHighTime":1550665800,"apparentTemperatureLow":-5.8,"apparentTemperatureLowTime":1550716200,"dewPoint":-3.91,"humidity":0.56,"pressure":1029.69,"windSpeed":3.98,"windGust":16.24,"windGustTime":1550647800,"windBearing":194,"cloudCover":0.57,"uvIndex":3,"uvIndexTime":1550651400,"visibility":12.55,"ozone":364.32,"temperatureMin":0.26,"temperatureMinTime":1550691000,"temperatureMax":7.42,"temperatureMaxTime":1550662200,"apparentTemperatureMin":-2.19,"apparentTemperatureMinTime":1550691000,"apparentTemperatureMax":6.6,"apparentTemperatureMaxTime":1550665800},{"time":1550694600,"summary":"Clear throughout the day.","icon":"clear-day","sunriseTime":1550718114,"sunsetTime":1550757880,"moonPhase":0.57,"precipIntensity":0,"precipIntensityMax":0.0025,"precipIntensityMaxTime":1550770200,"precipProbability":0,"temperatureHigh":13.98,"temperatureHighTime":1550752200,"temperatureLow":0.77,"temperatureLowTime":1550802600,"apparentTemperatureHigh":13.98,"apparentTemperatureHighTime":1550752200,"apparentTemperatureLow":-1.72,"apparentTemperatureLowTime":1550802600,"dewPoint":-6.15,"humidity":0.44,"pressure":1023.33,"windSpeed":7.71,"windGust":12.94,"windGustTime":1550773800,"windBearing":112,"cloudCover":0,"uvIndex":4,"uvIndexTime":1550734200,"visibility":16.09,"ozone":324.01,"temperatureMin":-2.42,"temperatureMinTime":1550716200,"temperatureMax":13.98,"temperatureMaxTime":1550752200,"apparentTemperatureMin":-5.8,"apparentTemperatureMinTime":1550716200,"apparentTemperatureMax":13.98,"apparentTemperatureMaxTime":1550752200},{"time":1550781000,"summary":"Clear throughout the day.","icon":"clear-day","sunriseTime":1550804438,"sunsetTime":1550844342,"moonPhase":0.6,"precipIntensity":0,"precipIntensityMax":0.0025,"precipIntensityMaxTime":1550835000,"precipProbability":0,"temperatureHigh":16.89,"temperatureHighTime":1550835000,"temperatureLow":3.62,"temperatureLowTime":1550885400,"apparentTemperatureHigh":16.89,"apparentTemperatureHighTime":1550835000,"apparentTemperatureLow":1.44,"apparentTemperatureLowTime":1550885400,"dewPoint":-4.72,"humidity":0.41,"pressure":1018.82,"windSpeed":3.56,"windGust":12.5,"windGustTime":1550781000,"windBearing":130,"cloudCover":0,"uvIndex":4,"uvIndexTime":1550820600,"visibility":16.09,"ozone":348.91,"temperatureMin":0.77,"temperatureMinTime":1550802600,"temperatureMax":16.89,"temperatureMaxTime":1550835000,"apparentTemperatureMin":-1.72,"apparentTemperatureMinTime":1550802600,"apparentTemperatureMax":16.89,"apparentTemperatureMaxTime":1550835000},{"time":1550867400,"summary":"Clear throughout the day.","icon":"clear-day","sunriseTime":1550890761,"sunsetTime":1550930803,"moonPhase":0.64,"precipIntensity":0,"precipIntensityMax":0.0025,"precipIntensityMaxTime":1550932200,"precipProbability":0,"temperatureHigh":19.04,"temperatureHighTime":1550921400,"temperatureLow":4.09,"temperatureLowTime":1550975400,"apparentTemperatureHigh":19.04,"apparentTemperatureHighTime":1550921400,"apparentTemperatureLow":2.44,"apparentTemperatureLowTime":1550975400,"dewPoint":-2.63,"humidity":0.41,"pressure":1017.08,"windSpeed":5.84,"windGust":11.68,"windGustTime":1550950200,"windBearing":121,"cloudCover":0,"uvIndex":4,"uvIndexTime":1550910600,"visibility":16.09,"ozone":368.84,"temperatureMin":3.62,"temperatureMinTime":1550885400,"temperatureMax":19.04,"temperatureMaxTime":1550921400,"apparentTemperatureMin":1.44,"apparentTemperatureMinTime":1550885400,"apparentTemperatureMax":19.04,"apparentTemperatureMaxTime":1550921400},{"time":1550953800,"summary":"Partly cloudy throughout the day.","icon":"partly-cloudy-night","sunriseTime":1550977083,"sunsetTime":1551017264,"moonPhase":0.67,"precipIntensity":0.0025,"precipIntensityMax":0.0051,"precipIntensityMaxTime":1550961000,"precipProbability":0.02,"precipType":"rain","temperatureHigh":20.66,"temperatureHighTime":1551007800,"temperatureLow":7.97,"temperatureLowTime":1551054600,"apparentTemperatureHigh":20.66,"apparentTemperatureHighTime":1551007800,"apparentTemperatureLow":6.24,"apparentTemperatureLowTime":1551054600,"dewPoint":-2.2,"humidity":0.38,"pressure":1015.48,"windSpeed":4.17,"windGust":11.67,"windGustTime":1550953800,"windBearing":112,"cloudCover":0.19,"uvIndex":3,"uvIndexTime":1550993400,"visibility":16.09,"ozone":374.14,"temperatureMin":4.09,"temperatureMinTime":1550975400,"temperatureMax":20.66,"temperatureMaxTime":1551007800,"apparentTemperatureMin":2.44,"apparentTemperatureMinTime":1550975400,"apparentTemperatureMax":20.66,"apparentTemperatureMaxTime":1551007800},{"time":1551040200,"summary":"Partly cloudy in the morning.","icon":"partly-cloudy-day","sunriseTime":1551063405,"sunsetTime":1551103725,"moonPhase":0.71,"precipIntensity":0.0025,"precipIntensityMax":0.0127,"precipIntensityMaxTime":1551054600,"precipProbability":0.05,"precipType":"rain","temperatureHigh":18.16,"temperatureHighTime":1551094200,"temperatureLow":8.49,"temperatureLowTime":1551148200,"apparentTemperatureHigh":18.16,"apparentTemperatureHighTime":1551094200,"apparentTemperatureLow":6.41,"apparentTemperatureLowTime":1551148200,"dewPoint":0.41,"humidity":0.45,"pressure":1012.83,"windSpeed":4.81,"windGust":23.14,"windGustTime":1551123000,"windBearing":164,"cloudCover":0.15,"uvIndex":4,"uvIndexTime":1551083400,"visibility":16.09,"ozone":363.59,"temperatureMin":7.97,"temperatureMinTime":1551054600,"temperatureMax":18.16,"temperatureMaxTime":1551094200,"apparentTemperatureMin":6.24,"apparentTemperatureMinTime":1551054600,"apparentTemperatureMax":18.16,"apparentTemperatureMaxTime":1551094200}]},"flags":{"sources":["cmc","gfs","icon","isd","madis"],"nearest-station":0,"units":"ca"},"offset":3.5}';
Flight.Weather2 = '{"latitude":43.16103,"longitude":-77.610924,"timezone":"America/New_York","currently":{"time":1550465255,"summary":"Light Snow","icon":"snow","nearestStormDistance":0,"precipIntensity":0.1524,"precipIntensityError":0.0508,"precipProbability":1,"precipType":"snow","temperature":-4.22,"apparentTemperature":-10.69,"dewPoint":-6.74,"humidity":0.82,"pressure":1012.05,"windSpeed":20.92,"windGust":21.15,"windBearing":77,"cloudCover":1,"uvIndex":0,"visibility":2.93,"ozone":322.44},"offset":-5}';

Flight.statusDataSource = [
    { id: 1, title: 'Scheduled', bgcolor: '#f0f0f0', color: '#000', class: 'schedule' },
    { id: 2, title: 'Departed', bgcolor: '#00bfff', color: '#fff', class: 'takeoff' },
    { id: 3, title: 'Arrived', bgcolor: '#4CAF50', color: '#fff', class: 'landing' },
    { id: 4, title: 'Cancel', bgcolor: '#a65959', color: '#fff', class: 'cancel' },
    { id: 5, title: 'Delay', bgcolor: '#ff0000', color: '#fff', class: 'delay' },
    { id: 6, title: 'Inactive', bgcolor: '#ffff00', color: '#fff', class: 'inactive' },
    { id: 7, title: 'Diverted', bgcolor: '#ee82ee', color: '#fff', class: 'diverted' },
    { id: 8, title: 'Ground', bgcolor: '#ff8000', color: '#fff', class: 'ground' },
    { id: 9, title: 'NoData', bgcolor: '#787878', color: '#fff', class: 'nodata' },
    { id: 10, title: 'Overlap', bgcolor: '#f44336', color: '#fff', class: 'overlap' },
    { id: 11, title: 'Gap', bgcolor: '#ff5722', color: '#fff', class: 'gap' },
    { id: 12, title: 'New', bgcolor: '#2196F3', color: '#fff', class: 'new' },
    { id: 13, title: 'Updated', bgcolor: '#4CAF50', color: '#fff', class: 'updated' },
    { id: 14, title: 'Off Block', bgcolor: '#0086b3', color: '#fff', class: 'offblock' },
    { id: 15, title: 'On Block', bgcolor: '#005960', color: '#fff', class: 'onblock' },




];
Flight.getStatus = function (id) {
    var st = Enumerable.From(Flight.statusDataSource).Where("$.id==" + id).FirstOrDefault();
    return st;
};

var statusDataSource2 = [
    { id: 1, title: 'Schedule', bgcolor: '#f0f0f0', color: '#000', class: 'schedule' },

    { id: 4, title: 'Cancel', bgcolor: '#a65959', color: '#fff', class: 'cancel' },

    { id: 6, title: 'Inactive', bgcolor: '#ffff00', color: '#fff', class: 'inactive' },
    { id: 7, title: 'Diverted', bgcolor: '#ee82ee', color: '#fff', class: 'diverted' },
    { id: 8, title: 'Ground', bgcolor: '#ff8000', color: '#fff', class: 'ground' },
    { id: 9, title: 'NoData', bgcolor: '#787878', color: '#fff', class: 'nodata' },




];
Flight.activeDatasource = [];
Flight.renderlabelInterval = null;
Flight.renderLables = function (id) {
    // var _d = Enumerable.From(activeDatasource).Where('$.taskID==' + id).FirstOrDefault();
    if ($('#task-' + activeDatasource[activeDatasource.length - 1].taskId).length > 0)
        clearInterval(renderlabelInterval);
    $('.lbl_from').remove();
    $('.lbl_to').remove();
    $.each(activeDatasource, function (_i, _d) {
        var el = $('#task-' + _d.taskId);

        var p1 = el.parents('.e-childContainer');
        var echartcell = p1.parents('.e-chartcell');
        var p1_left = parseInt(p1.css('left'));
        var div_from = "<div id='task-" + _d.taskId + "-from' style='position:absolute;color:black;' class='lbl_from'>" + _d.from + "</div>";
        echartcell.append(div_from);
        var from = $('#task-' + _d.taskId + '-from');
        from_left = p1_left - from.width() - 5;
        from.css('left', from_left + 'px');
        // from.css('top', 5 + 'px');

        var div_to = "<div id='task-" + _d.taskId + "-to' style='position:absolute;color:black;'  class='lbl_to'>" + _d.to + "</div>";
        echartcell.append(div_to);
        var to = $('#task-' + _d.taskId + '-to');
        to_left = p1_left + p1.width() + 5;;
        to.css('left', to_left + 'px');
        // to.css('top', 5 + 'px');
    });
};
Flight.cindex = 0;
Flight.renderCompletedFunction = function (val, index) {

    return;
    Flight.cindex++;
    //console.log('taskid: ' + val + '    ' + index + '#  ' + cindex + '   ' + activeDatasource.length);
    if (Flight.cindex == Flight.activeDatasource.length) {
        Flight.cindex = 0;
        // renderlabelInterval=setInterval(function () { renderLables(); }, 100);
    }
    // renderLables(val);
};

Flight.getDelayFunction = function (val) {

    var dataItem = Enumerable.From(Flight.activeDatasource).Where('$.taskId==' + val).FirstOrDefault();

    return dataItem.delay;
};

var myHelpers = { renderCompleted: Flight.renderCompletedFunction, getDelay: Flight.getDelayFunction };

$.views.helpers(myHelpers);



$.views.converters("round", function (val) {
    // Convert data-value or expression to upper case
    return Math.round(val);
});
$.views.converters("statusClass", function (val) {



    // Convert data-value or expression to upper case
    var dataItem = Enumerable.From(Flight.activeDatasource).Where('$.taskId==' + val).FirstOrDefault();

    if (dataItem) {
        if (!dataItem.status)
            return "";
        var status = Enumerable.From(Flight.statusDataSource).Where('$.id==' + dataItem.status).FirstOrDefault();
        return status.class;
    }
    else
        return "";
});

$.views.converters("statusIcon", function (val) {



    // Convert data-value or expression to upper case
    var dataItem = Enumerable.From(Flight.activeDatasource).Where('$.taskId==' + val).FirstOrDefault();

    if (dataItem) {
        if (!dataItem.status)
            return "";
        if (dataItem.status == 1)
            return "";

        switch (dataItem.status) {
            case 14:
                return '<i style="position:relative;top:0px;left:2px;font-size:12px;color:white" class="far fa-square"></i>';
            case 2:
                return '<i style="position:relative;top:0px;left:2px;font-size:12px;color:white" class="fas fa-plane-departure"></i>';
            case 3:
                return '<i style="position:relative;top:0px;left:2px;font-size:12px;color:white" class="fas fa-plane-arrival"></i>';
            default:
                return "";
        }



    }
    else
        return "";
});
$.views.converters("delayIcon", function (val) {

    return '<i style="position:relative;top:0px;font-size:12px;color:white;display:block" class="fas fa-hourglass-start"></i>';
});
$.views.converters("testConverter", function (val) {
    return val;
});
$.views.converters("delayElement", function (val) {
    var element = '';
    var data = Enumerable.From(Flight.activeDatasource).Where('$.taskId==' + val).FirstOrDefault();
    if (data.status > 0) {
        if (data.delay > 0) {
            var delay = Math.round(data.delay);
            element = delay
                + '<i style="position:relative;top:0px;font-size:12px;color:white;display:block" class="fas fa-hourglass-start"></i>'
                ;
        }
    }
    return element;
});

$.views.converters("arrivalDelayElement", function (val) {
    var parts = val.toString().split("-");
    var taskId = parts[0];
    var width = parts[1];
    var data = Enumerable.From(Flight.activeDatasource).Where('$.taskId==' + taskId).FirstOrDefault();
    var element = '';
    if (data.status > 0) {
        if (data.delayLanding > 0) {
            var adelay = Math.round(data.delayLanding);
            var dwidth = ((data.delayLanding / 60) / data.duration) * width;
            element = '<div class="e-gantt-template-progressbar1 KKK" style="font-size:9px;overflow:visible;opacity:0.2;text-align:center;color:white;padding-top:1px;border:0px solid red !important;margin-top:2px;right:0 !important;left:initial !important;width:' + dwidth+'px; border-radius:0 !important;margin-left:2px;background: #ff5722!important;opacity:1 !important;top:-1px;position:absolute;height:100%">'
                + adelay
                + '<i style="position:relative;top:0px;font-size:12px;color:white;display:block" class="fas fa-hourglass-end"></i>'
                + '</div>';
        }
    }
    return element;
});
$.views.converters("takeOffElement", function (val) {
    
    var parts = val.toString().split("-");
    var taskId = parts[0];
    var width = parts[1];
    
    var data = Enumerable.From(Flight.activeDatasource).Where('$.taskId==' + taskId).FirstOrDefault();
    var element = '';
    if (data.status > 0) {
        if (data.Takeoff) {
            var d1 = new Date(data.STD);
            var d2 = new Date(data.Takeoff);
            var delay =  (subtractDates(d2, d1)/60);

             
            var dwidth = (delay / data.duration) * width;
            element = '<div class="e-gantt-template-progressbar1 KKK" style="font-size:9px;overflow:visible;opacity:0.2;text-align:center;color:white;padding-top:1px;border-right:1px dotted white !important;margin-top:2px; left:0 !important;width:' + dwidth + 'px; border-radius:0 !important;margin-left:2px;background: transparent !important;opacity:1 !important;top:-1px;position:absolute;height:100%">'
                 
                + '<i style="position:absolute;top:1px;right:-8px;font-size:12px;color:white;display:block;color:yellow" class="fas fa-plane-departure"></i>'
                + '</div>';
            
        }
    }
    return element;
});


Flight.renderLables1 = function () {
    $.each(resourceGanttData, function (_i, _d) {
        var el = $('#task-' + _d.taskId);
        var p1 = el.parents('.e-childContainer');
        var echartcell = p1.parents('.e-chartcell');
        var p1_left = parseInt(p1.css('left'));
        var div_from = "<div id='task-" + _d.taskId + "-from' style='position:absolute;color:black;'>" + _d.from + "</div>";
        echartcell.append(div_from);
        var from = $('#task-' + _d.taskId + '-from');
        from_left = p1_left - from.width() - 10;
        from.css('left', from_left + 'px');

        var div_to = "<div id='task-" + _d.taskId + "-to' style='position:absolute;color:black;'>" + _d.to + "</div>";
        echartcell.append(div_to);
        var to = $('#task-' + _d.taskId + '-to');
        to_left = p1_left + p1.width() + 10;;
        to.css('left', to_left + 'px');
    });
};

Flight.renderTasks = function () {
    $.each(resourceGanttData, function (_i, _d) {
        var $element = $('#task-' + _d.taskId);


        var $childtaskbar = $element.parents('.e-gantt-childtaskbar');
        if (_d.status) {

            var status = Enumerable.From(statusDataSource).Where('$.id==' + _d.status).FirstOrDefault();
            $childtaskbar.css('color', status.color).css('background-color', status.bgcolor);
            $childtaskbar.addClass(status.title);
            //   console.log($childtaskbar.css('background-color') + ' ' + _d.taskID);
        }

    });
};
Flight.subtractDates = function (d1, d2) {


    var diff = Math.abs(new Date(d1) - new Date(d2));
    var minutes = ((diff / 1000) / 60);
    return minutes;
};
Flight.calculateDuration = function (h, m) {
    return h * 1.0 + (m * 1.0 / 60.0);
};
Flight.calculateDelay = function (item) {
    if (!item.TakeOff)
        return;
    var d1 = new Date(item.startDate);
    var d2 = new Date(item.TakeOff);
    var delay = (subtractDates(d1, d2));
    item.delay = delay;
    //if (item.delay && item.delay > 0)
    {
        item.duration = Number(item.baseDuration) + (item.delay / 60) + (item.delayLanding / 60);
        item.progress = ((item.delay / 60) / item.duration) * 100;

    }
    Flight.calculateBaseEndDate(item);
    Flight.calculateBaseStartDate(item);
    //  console.log(item);

};
Flight.calculateDelayOffBlock = function (item) {
    if (!item.ChocksOut )
        return;
    var d1 = new Date(item.startDate);
    var d2 = new Date(item.ChocksOut);
    var delay = (subtractDates(d1, d2));
    item.delay = delay;
    //if (item.delay && item.delay > 0)
    {
        item.duration = Number(item.baseDuration) + (item.delay / 60) + (item.delayLanding / 60);
        item.progress = ((item.delay / 60) / item.duration) * 100;

    }
    Flight.calculateBaseEndDate(item);
    Flight.calculateBaseStartDate(item);
    //  console.log(item);

};

Flight.calculateDelayLanding = function (item) {
    if (!item.Landing)
        return;
    var d1 = new Date(item.baseEndDate);
    var d2 = new Date(item.Landing);
    var delay = (subtractDates(d1, d2));
    item.delayLanding = delay;
    // if (item.delayLanding && item.delayLanding > 0)
    {
        item.duration = Number(item.baseDuration) + (item.delay / 60) + (item.delayLanding / 60);


    }

    //  console.log(item);

};
Flight.calculateDelayLandingOnBlock = function (item) {
    if (!item.ChocksIn)
        return;
    var d1 = new Date(item.baseEndDate);
    var d2 = new Date(item.ChocksIn);
    var delay = (subtractDates(d1, d2));
    item.delayLanding = delay;
    // if (item.delayLanding && item.delayLanding > 0)
    {
        item.duration = Number(item.baseDuration) + (item.delay / 60) + (item.delayLanding / 60);


    }

    //  console.log(item);

};

Flight.calculateBaseEndDate = function (item) {
    var edate = new Date(item.startDate);
    edate = edate.addHours(item.duration);
    item.baseEndDate = edate;

};
Flight.calculateBaseStartDate = function (item) {
    var date = new Date(item.startDate);
    if (!item.delay || item.delay == 0) {
        item.baseStartDate = date;
        return;
    }


    date = date.addMinutes(item.delay);
    item.baseStartDate = date;
    //console.log(item.baseStartDate);

};
Flight.processData = function (_d) {

    _d.delay = 0;
    _d.delayLanding = 0;
    _d.baseDuration = Number(_d.duration);
    if (_d.TakeOff) {
        var d1 = new Date(_d.startDate);
        var d2 = new Date(_d.TakeOff);
        var delay = (subtractDates(d1, d2));
        _d.delay = delay;
        //          console.log(delay);
    }
    if (_d.delay && _d.delay > 0) {
        _d.duration = Number(_d.duration) + (_d.delay / 60);
        _d.progress = ((_d.delay / 60) / _d.duration) * 100;

    }
    Flight.calculateBaseEndDate(_d);
    Flight.calculateBaseStartDate(_d);
};
Flight.processDataOffBlock = function (_d) {
     
    _d.delay = 0;
    _d.delayLanding = 0;
    _d.baseDuration = Number(_d.duration);
    
    if (_d.ChocksOut) {
        var d1 = new Date(_d.startDate);
        var d2 = new Date(_d.ChocksOut);
        var delay = (subtractDates(d1, d2));
        _d.delay = delay;
        //          console.log(delay);
    }
    else if (_d.EstimatedDelay > 0 && _d.status==1) {
        _d.delay = _d.EstimatedDelay;
    }
    if (_d.delay && _d.delay > 0) {
        _d.duration = Number(_d.duration) + (_d.delay / 60);
        _d.progress = ((_d.delay / 60) / _d.duration) * 100;

    }
    Flight.calculateBaseEndDate(_d);
    Flight.calculateBaseStartDate(_d);
    ////////////Landing Delay////////////////////
    if (_d.ChocksIn) {
        console.log(_d.baseEndDate);
        var delaylanding = (subtractDates(new Date(_d.baseEndDate), new Date(_d.ChocksIn)));
        _d.delayLanding = delaylanding;
        _d.duration = Number(_d.baseDuration) + (_d.delay / 60) + (_d.delayLanding / 60);
    }
    /////////////////////////////////


    Flight.calculateBaseEndDate(_d);
    Flight.calculateBaseStartDate(_d);
};
Flight.proccessDataSource = function (ds) {
    $.each(ds, function (_i, _d) {
       // Flight.processData(_d);
        Flight.processDataOffBlock(_d);
       // console.log(_d);
    });
    return ds;
};



Flight.calculateNextTaskDelay = function (current, dataSource, gantt) {
    if (!current.delay)
        return;
    //Date.parse(datetimeStart) < Date.parse(datetimeEnd)
    var next = Enumerable.From(dataSource).Where('$.status==1 && $.startDate.getDatePart()==' + current.startDate.getDatePart() + ' && $.startDate.getTime() > ' + current.startDate.getTime() + '  && $.RegisterID==' + current.RegisterID).OrderBy('$.startDate').FirstOrDefault();


    if (!next)
        return;
    next.delay = current.delay;
    next.EstimatedDelay = next.delay;
    next.duration = Number(next.baseDuration) + (next.delay / 60) + (next.delayLanding / 60);
    next.progress = ((next.delay / 60) / next.duration) * 100;
    Flight.calculateBaseEndDate(next);
    Flight.calculateBaseStartDate(next);

    // var ganttObj = $("#resourceGantt").data("ejGantt");
    gantt.updateRecordByTaskId(next);
    Flight.calculateNextTaskDelay(next, dataSource, gantt);

};

Flight.calculateNextTaskDelayOffBlock = function (current, dataSource, gantt) {
    if (!current.delay)
        return;
    //Date.parse(datetimeStart) < Date.parse(datetimeEnd)
    var next = Enumerable.From(dataSource).Where('$.status==1 && $.startDate.getDatePart()==' + current.startDate.getDatePart() + ' && $.startDate.getTime() > ' + current.startDate.getTime() + '  && $.RegisterID==' + current.RegisterID).OrderBy('$.startDate').FirstOrDefault();


    if (!next)
        return;
    next.delay = current.delay;
    next.EstimatedDelay = next.delay;
    next.EstimatedDelayChanged = true;
    next.duration = Number(next.baseDuration) + (next.delay / 60) + (next.delayLanding / 60);
    next.progress = ((next.delay / 60) / next.duration) * 100;
    Flight.calculateBaseEndDate(next);
    Flight.calculateBaseStartDate(next);

    // var ganttObj = $("#resourceGantt").data("ejGantt");
    gantt.updateRecordByTaskId(next);
    Flight.calculateNextTaskDelayOffBlock(next, dataSource, gantt);

};

Flight.findOverlaps = function (data, rowId) {
    var row = Enumerable.From(data).Where("$.RegisterID==" + rowId).ToArray();
    $.each(row, function (_i, _d) {
        var overlap = Enumerable.From(row)
            .Where(function (x) {
                var criteria = ((new Date(_d.STD) >= new Date(x.STD) && new Date(_d.STD) <= new Date(x.STA)) || (new Date(_d.STA) >= new Date(x.STD) && new Date(_d.STA) <= new Date(x.STA)))

                    && x.RegisterID == _d.RegisterID && x.taskId != _d.taskId;
                console.log(criteria);

                return criteria;
            }).FirstOrDefault();
        if (overlap) {
            _d.status = 10;
            _d.initStatus.push(10);

        }
        else {
            _d.initStatus = Enumerable.From(_d.initStatus).Where("$!=" + 10).ToArray();
            _d.status = _d.initStatus[_d.initStatus.length - 1];

        }
    });
};

Flight.findGaps = function (data, res) {
    $.each(res, function (_j, _res) {
        var row = Enumerable.From(data).Where("$.RegisterID==" + _res.resourceId).OrderBy(function (x) { return new Date(x.STD) }).ToArray();
        $.each(row, function (_i, _d) {

            if (_i > 0) {
                var pre = row[_i - 1];
                // console.log(_d.FromAirport + '   ' + pre.ToAirport);
                // console.log(pre);
                if (_d.FromAirport != pre.ToAirport) {
                    _d.status = 11;

                    _d.initStatus.push(11);
                }
                else {
                    _d.initStatus = Enumerable.From(_d.initStatus).Where("$!=" + 11).ToArray();
                    _d.status = _d.initStatus[_d.initStatus.length - 1];

                }
            }
            else {
                _d.initStatus = Enumerable.From(_d.initStatus).Where("$!=" + 11).ToArray();
                _d.status = _d.initStatus[_d.initStatus.length - 1];
            }
        });
    });


};

Flight.getEstimatedOffBlock = function (flight) {
    //console.log(flight);
    if (flight.delay > 0) {
         
        var d = new Date((new Date(flight.STD)).addMinutes(flight.delay));
         
        return d;

    }
       
    return new Date(flight.STD);
};


////////
Flight.findOverlapsgrid = function (data, rowId) {
    var row = Enumerable.From(data).Where("$.RegisterID==" + rowId).ToArray();
    $.each(row, function (_i, _d) {
        var overlap = Enumerable.From(row)
            .Where(function (x) {
                var criteria = ((new Date(_d.STD) >= new Date(x.STD) && new Date(_d.STD) <= new Date(x.STA)) || (new Date(_d.STA) >= new Date(x.STD) && new Date(_d.STA) <= new Date(x.STA)))

                    && x.RegisterID == _d.RegisterID && x.Id != _d.Id;


                return criteria;
            }).FirstOrDefault();
        if (overlap) {
            _d.status = 10;
            _d.FlightStatus = Flight.getStatus(_d.status).title;
            _d.initStatus.push(10);

        }
        else {
            _d.initStatus = Enumerable.From(_d.initStatus).Where("$!=" + 10).ToArray();
            _d.status = _d.initStatus[_d.initStatus.length - 1];
            _d.FlightStatus = Flight.getStatus(_d.status).title;

        }
    });
};

Flight.findGapsgrid = function (data) {
    var res = Enumerable.From(data).Select('$.RegisterID').Distinct().ToArray();
    console.log('findgap');
    console.log(res);
    $.each(res, function (_j, _res) {
        var row = Enumerable.From(data).Where("$.RegisterID==" + _res).OrderBy(function (x) { return new Date(x.STD) }).ToArray();
        $.each(row, function (_i, _d) {

            if (_i > 0) {
                var pre = row[_i - 1];
                // console.log(_d.FromAirport + '   ' + pre.ToAirport);
                // console.log(pre);
                if (_d.FromAirport != pre.ToAirport) {
                    _d.status = 11;
                    _d.FlightStatus = Flight.getStatus(_d.status).title;
                    _d.initStatus.push(11);
                }
                else {
                    _d.initStatus = Enumerable.From(_d.initStatus).Where("$!=" + 11).ToArray();
                    _d.status = _d.initStatus[_d.initStatus.length - 1];
                    _d.FlightStatus = Flight.getStatus(_d.status).title;

                }
            }
            else {
                _d.initStatus = Enumerable.From(_d.initStatus).Where("$!=" + 11).ToArray();
                _d.status = _d.initStatus[_d.initStatus.length - 1];
            }
        });
    });


};

Flight.getLastFlight = function (data, msn) {
    //OrderByDescending
    var result = Enumerable.From(data).Where("$.RegisterID==" + msn).OrderByDescending(function (x) { return new Date(x.STD) }).FirstOrDefault();
    return result;
};

////////////////////////////////////////////////////////////////
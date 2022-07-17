function set_now_date_time() {
    let date = new Date();

    let _year  = date.getFullYear();

    let _month = date.getMonth();
    _month = (_month < 10)? ('0' + _month) : _month;

    let _date  = date.getDate();
    _date = (_date < 10)? ('0' + _date) : _date;

    let _hours   = date.getHours();
    _hours = (_hours < 10)? ('0' + _hours) : _hours;

    let _minutes = date.getMinutes();
    _minutes = (_minutes < 10)? ('0' + _minutes) : _minutes;

    let _seconds = date.getSeconds();
    _seconds = (_seconds < 10)? ('0' + _seconds) : _seconds;


    nowDate.innerText = `${_year}年 ${_month}月 ${_date}日`;
    nowTime.innerText = `${_hours}:${_minutes}:${_seconds}`;
}

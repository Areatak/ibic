!function($){$.fn.downCount=function(options,callback){function countdown(){var target_date=new Date(settings.date),current_date=currentDate(),difference=target_date-current_date;if(difference<0)return clearInterval(interval),void(callback&&"function"==typeof callback&&callback());var _second=1e3,_minute=6e4,_hour=36e5,_day=864e5,days=Math.floor(difference/864e5),hours=Math.floor(difference%864e5/36e5),minutes=Math.floor(difference%36e5/6e4),seconds=Math.floor(difference%6e4/1e3);days=String(days).length>=2?days:"0"+days,hours=String(hours).length>=2?hours:"0"+hours,minutes=String(minutes).length>=2?minutes:"0"+minutes,seconds=String(seconds).length>=2?seconds:"0"+seconds;var ref_days=1===days?"day":"days",ref_hours=1===hours?"hour":"hours",ref_minutes=1===minutes?"minute":"minutes",ref_seconds=1===seconds?"second":"seconds";container.find(".days").text(days),container.find(".hours").text(hours),container.find(".minutes").text(minutes),container.find(".seconds").text(seconds),container.find(".days_ref").text(ref_days),container.find(".hours_ref").text(ref_hours),container.find(".minutes_ref").text(ref_minutes),container.find(".seconds_ref").text(ref_seconds)}var settings=$.extend({date:null,offset:null},options);settings.date||$.error("Date is not defined."),Date.parse(settings.date)||$.error("Incorrect date format, it should look like this, 12/24/2012 12:00:00.");var container=this,currentDate=function(){var date=new Date,utc=date.getTime()+6e4*date.getTimezoneOffset();return new Date(utc+36e5*settings.offset)},interval=setInterval(countdown,1e3)}}(jQuery);
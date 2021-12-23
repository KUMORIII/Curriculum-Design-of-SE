require.config({
    paths: {
        echarts: '/scripts/Plugins/echarts'
    }
});
$(function () {
    $('#t_m_0').addClass('current');
    initData();
});
function initData() {
    loading();
    //AjaxPost('/User/GetAttendRep', null, loadSuccess, loadErr);
    AjaxPost('/User/GetAttendRepList', null, loadSuccess, loadErr);
}
function loadSuccess(r) {
    var html = "";
    try {
        if (r.IsSucceed) {
            $.each(r.Obj, function (i, item) {
                html += "<tr id=\"tr_" + i + "\">";
                html += "<td align=\"center\">";
                html += item.CourseName;
                html += "</td>";
                html += "<td align=\"center\">";
                if ($('#txt_usertype').val() == 1)
                    html += item.Total;
                else {
                    html += item.WDate;
                    html += "</td>";
                    html += "<td align=\"center\">";
                    html += item.Secion;

                }
                html += "</td>";
                html += "<td align=\"center\">";
                html += item.ShouldAttend;
                html += "</td>";
                html += "<td align=\"center\">";
                if ($('#txt_usertype').val() == 1 && item.Attend != 0)
                    html += "<a onclick=\"showInfo(1,'" + item.CourseNo + "')\")\">" + item.Attend + "</span>";
                else
                    html += item.Attend;
                html += "</td>";
                html += "<td align=\"center\">";
                if ($('#txt_usertype').val() == 1 && item.Late != 0)
                    html += "<a onclick=\"showInfo(2,'" + item.CourseNo + "')\")\">" + item.Late + "</span>";
                else
                    html += item.Late;
                html += "</td>";
                html += "<td align=\"center\">";
                if ($('#txt_usertype').val() == 1 && item.Leave != 0)
                    html += "<a onclick=\"showInfo(5,'" + item.CourseNo + "')\">" + item.Leave + "</span>";
                else
                    html += item.Leave;
                html += "</td>";
                //        html += "<td align=\"center\">";
                //        html += "0节课";
                //        html += "</td>";
                //        html += "<td align=\"center\">";
                //        html += "0节课";
                //        html += "</td>";
                html += "<td align=\"center\">";
                if ($('#txt_usertype').val() == 1 && item.Absence != 0)
                    html += "<a onclick=\"showInfo(3,'" + item.CourseNo + "')\">" + item.Absence + "</span>";
                else
                    html += item.Absence;
                html += "</td>";
                if ($('#txt_usertype').val() == 2) {
                    html += "<td align=\"center\">";
                    html += attendance(item.Attend, item.ShouldAttend);
                    html += "</td>";
                    html += "<td align=\"center\">";
                    html += "<a href=\"javascript:void(0)\" onclick=\"stopRank('" + item.RankNo + "','" + item.ClassNo + "','" + item.Week + "','" + item.WeekNum + "','" + item.Term_No + "','" + item.WDate + "','" + item.Secion + "','" + i + "')\"><span style=\"color:red\">不考勤</span></a>";
                    html += "</td>";
                }
                html += "</tr>";
            });
        }
    } catch (e) {
        html += e.Data;
    }
    $('#tr_data').html(html);
    initPie(r);
}
var tm = -1;
function attendance(attend, shouldattend) {
    if (shouldattend == 0) {
        return "0.00%";
    }
    return (attend * 100 / shouldattend).toFixed(2) + "%";
}
function loadErr(e) {
    msgShow("加载失败", e, "error");
    closeloading();
}
var ToolsTip = {
    trigger: 'item',
    formatter: "{a} <br/>{b} : {c} ({d}%)"
}
function initPie(r) {
    try {
        if (r.IsSucceed) {
            require(
        [
            'echarts',
            'echarts/chart/bar',
            'echarts/chart/line',
            'echarts/chart/pie'
        ],
        function (ec) {
            //饼图
            $.each(r.Obj, function (i, item) {
                if (item.ShouldAttend > 0) {
                    $('.chart-ul').append("<li><div style=\"width:100%;height:100%;margin:0 auto\" id=\"pie_" + i + "\"></div></li>");
                    var myPie = ec.init(document.getElementById('pie_' + i), 'macarons');
                    myPie.setOption({
                        tooltip: ToolsTip,
                        title: {
                            text: $('#txt_usertype').val() == 1 ? item.CourseName : item.WDate + "[" + item.Secion + "]", x: 'center', y: "bottom",
                            textStyle: {
                                "fontSize": 14, "color": "#666", align: "center"
                            }
                        },
                        //calculable : true,
                        series: [
			        {
			            name: '比例',
			            type: 'pie',
			            radius: '65%',
			            center: ['50%', '50%'],
			            data: [
			                { value: item.Late, name: '迟到' }, 
                            { value: item.Leave, name: '请假' },
			                { value: item.Absence, name: '缺勤' },
			                { value: item.Attend, name: '正常' }
			            ]
			        }
			    ]
                    });
                }
            });

        }

    );


        }
    } catch (e) {

    }
    closeloading();
}
function showPhone() {

}
function showInfo(s,s_code) {
    $('body').append('<div id="div_assign"></div>');
    $('#div_assign').dialog({
        iconCls: 'icon-search',
        modal: true,
        width: 800,
        height: 480,
        href: '/User/Show',
        title: '详细列表',
        onLoad: function () { initGrid(s, s_code) }
    });
}
function stopRank(classno, rbh, week, day, term, date, jc, i) {
    tm = i;
    showconfirm("您是否对本次课程全体学生不做电子考勤?", function (r) {
        if (r) {
            var model = {};
            model.CLASS_NO = classno;
            model.WEEK = week;
            model.WEEKNUM = day;
            model.TERM_NO = term;
            model.JT_NO = jc;
            model.R_BH = rbh;
            model.Statmp = date;
            AjaxPost("/Apply/StopRankClass", String.toSerialize(model), stopRankSuccess, rErr);
        }
    });
}
function rErr(r)
{ }
function stopRankSuccess(r) {
    if (r.IsSucceed) {
        if (tm >= 0) {
            $('#tr_' + tm).remove();
        }
    }
}
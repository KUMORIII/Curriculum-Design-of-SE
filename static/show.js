var c = [[
                    { field: 'WaterDate', width: 100, title: '日期', align: 'center' },
                    { field: 'S_Name', width: 200, title: '课程名称', align: 'center' },
                    { field: 'JT_No', width: 80, title: '节次', align: 'center' },
                    { field: 'RoomNum', width: 120, title: '教室', align: 'center' },
                    { field: 'BName', width: 100, title: '楼栋', align: 'center' },
                    { field: 'Status', width: 80, title: '考勤状态', align: 'center', formatter: s },
                    { field: 'WaterTime', width: 180, title: '刷卡时间', align: 'center' }
                ]];
                    function initGrid(s, s_code) {
                        $('#dg').datagrid({
                            fitColumns: true,
                            ollapsible: true,
                            pagination: true,
                            rownumbers: true,
                            singleSelect: true,
                            height: 440,
                            url: '/User/GetAttendList',
                            queryParams: {
                                Status: 1,
                                WaterDate: $('#txt_startDate').val() + 'a' + getCurrentDate(),
                                Flag: s,
                                S_Code: s_code
                            },
                            columns: c
                        });
                    }
                    function s(val, row, idx) {
                        var h = "";
                        if (val == 1)
                            h += "<span class='radius-p green-bg'>正常签到</span>"
                        else if (val == 2)
                            h += "<span class='radius-p yellow-bg'>迟到</span>"
                        else if (val == 4)
                            h += "<span class='radius-p yellow-bg'>早退</span>"
                        else if (val == 5)
                            h += "<span class='radius-p orange-bg'>请假</span>"
                        else if (val == 3)
                            h += "<span class='radius-p red-bg'>缺勤</span>";
                        return h;
                    }
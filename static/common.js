var days = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
var host = "http://" + document.location.host;
var AjaxHandlerUrl = "http://" + document.location.host + "/";
function AjaxPost(url, postData, successFunc, errorFunc) {
    if (postData == null)
        postData = { json: true };
    else
        postData.json = true;
    $.ajax({ url: url, data: postData, type: 'post', dataType: 'json',
        success: function (data) {
            if (data) {
                if (data.IsSucceed != null) {
                    if (data.IsSucceed) {
                        if (data.Msg == "-404") {
                            timeOut();
                        }
                        else {
                            successFunc(data);
                        }
                    }
                    else
                        successFunc(data);
                }
                else {
                    successFunc(data);
                }
            }
        }
, error:
function (xhr) {
    if (xhr) {
        if (errorFunc) {
            errorFunc(xhr);
        }
        else {
            $.messager.alert("提示", xhr.status + ":" + xhr.statusText, "error", null);
        }
    }
}
    });
}
function AsynPost(url, postData, successFunc, errorFunc) {
    if (postData == null)
        postData = { json: true };
    else
        postData.json = true;
    $.ajax({ url: url, data: postData, type: 'post', async: false, dataType: 'json',
        success: function (data) {
            if (data) {
                if (data.Msg != null) {
                    if (data.Msg == "-404") {
                        timeOut();
                    }
                    else {
                        successFunc(data);
                    }
                }
                else {
                    successFunc(data);
                }
            }
        }
, error:
function (xhr) {
    if (xhr) {
        if (errorFunc) {
            errorFunc(xhr);
        }
        else {
            $.messager.alert("提示", xhr.status + ":" + xhr.statusText, "error", null);
        }
    }
}
    });
}
/*对象序列化为字符串*/
String.toSerialize = function (obj) {
    var ransferCharForJavascript = function (s) {
        var newStr = s.replace(
/[\x26\x27\x3C\x3E\x0D\x0A\x22\x2C\x5C\x00]/g,
function (c) {
    ascii = c.charCodeAt(0)
    return '\\u00' + (ascii < 16 ? '0' + ascii.toString(16) : ascii.toString(16))
}
);
        return newStr;
    }
    if (obj == null) {
        return null
    }
    else if (obj.constructor == Array) {
        var builder = [];
        builder.push("[");
        for (var index in obj) {
            if (typeof obj[index] == "function") continue;
            if (index > 0) builder.push(",");
            builder.push(String.toSerialize(obj[index]));
        }
        builder.push("]");
        return builder.join("");
    }
    else if (obj.constructor == Object) {
        var builder = [];
        builder.push("{");
        var index = 0;
        for (var key in obj) {
            if (typeof obj[key] == "function") continue;
            if (index > 0) builder.push(",");
            builder.push("\"" + key + "\":" + String.toSerialize(obj[key]) + "");
            index++;
        }
        builder.push("}");
        return builder.join("");
    }
    else if (obj.constructor == Boolean) {
        return obj.toString();
    }
    else if (obj.constructor == Number) {
        return obj.toString();
    }
    else if (obj.constructor == String) {
        return '"' + ransferCharForJavascript(obj) + '"';
    }
    else if (obj.constructor == Date) {
        return '{"__DataType":"Date","__thisue":' + obj.getTime() - (new Date(1970, 0, 1, 0, 0, 0)).getTime() + '}';
    }
    else if (this.toString != undefined) {
        return String.toSerialize(obj);
    }
}
/*
公共遮盖层
*/
function loading() {
    var modalHtml = '<div class="bodymask" style="width:' + $("body").width() + 'px;height:' + $("body").height() + 'px">&nbsp;</div><div class="loader"><p class="text">拼命加载中...</p></div>';
    $("body").append(modalHtml);
}
function closeloading() {
    $(".bodymask,.loader").remove();
}
function showconfirm(msg, fun) {
    $.messager.confirm('提示信息', msg, fun);
}
//弹出信息窗口 title:标题 msgString:提示信息 msgType:信息类型 [error,info,question,warning]
function msgShow(title, msgString, msgType) {
    $.messager.alert(title, msgString, msgType);
}
$(function () {
    if ($('#pageIndex').val()) {
        $($('.parent-m')[$('#pageIndex').val()]).addClass('parent-active');
    }
})
function initTerm() {
    AjaxPost("/Common/GetTermList", null, initTermSuccess, initTermErr);
}
function initTermSuccess(r) {
    var html = "";
    if (r.IsSucceed) {
        $.each(r.Obj, function (i, item) {
            if (i + 1 == r.Obj.length)
                html += "<option value='" + item.NAME + "' seleced='true'>" + item.NAME + "</option>";
            else
                html += "<option value='" + item.NAME + "'>" + item.NAME + "</option>";
        });
    }
    $('#txt_term').html(html);
    $('#txt_term').combobox();
}
function initTermErr(e) {
}
function closediv() {
    $('.qrcode').hide();
}
function getCurrentDate() {
    var currentDT = new Date();
    var y, m, date, day, hs, ms, ss, theDateStr;
    y = currentDT.getFullYear(); //四位整数表示的年份
    m = currentDT.getMonth(); //月
    if (m + 1 < 10)
        m = "0" + (m + 1);
    else
        m++;
    date = currentDT.getDate(); //日
    if (date < 10)
        date = "0" + date;
    return y + "-" + m + "-" + date;
}
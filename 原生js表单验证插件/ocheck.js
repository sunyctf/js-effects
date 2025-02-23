//Created by lx on 2016/11/15.
var oCHCK = function () {
    var chxm = false;
    var chQQ = false;
    var chphone = false;
    var chMail = false;
    var oCheck = document.getElementById('ocheck');    //父级IDIdName  oChxm
    function getByClass(o, s)//获取Class;
    {
        var aEle = document.getElementsByTagName('*');
        var arr = [];
        for (var i = 0; i < aEle.length; i++) {
            if (aEle[i].className == s) {
                arr.push(aEle[i])
            }
        }
        return arr;
    }

//姓名校验
    //ClassName  oChxm
    function oChxm() {
        var oChxm = getByClass(oCheck, 'oChxm')[0];
        var reQQ = /[\u4E00-\u9FA5]/g;
        oChxm.onkeyup = function () {
            if (this.value.length > 6) {
                this.value = this.value.substr(0, 6)
            }
            if (reQQ.test(this.value)) {
                this.nextSibling.innerHTML = '输入正确';
                this.nextSibling.className = '';
                this.nextSibling.className = 'ingreen';
                chxm = true;
                return;
            } else {
                this.nextSibling.innerHTML = '请输入正确的名字';
                this.nextSibling.className = '';
                this.nextSibling.className = 'inred';
                chxm = false;
                return;
            }
        }

    }

    oChxm();
// 手机校验
    //ClassName  oChphone
    function oChphone() {
        var oChphone = getByClass(oCheck, 'oChphone')[0];
        var reQQ = /^[1]\d{10}$/;
        oChphone.onkeyup = function () {
            if (this.value.length > 11) {
                this.value = this.value.substr(0, 11)
            }
            if (reQQ.test(this.value)) {
                this.nextSibling.innerHTML = '输入正确';
                this.nextSibling.className = '';
                this.nextSibling.className = 'ingreen';
                chphone = true;
                return;
            } else {
                this.nextSibling.innerHTML = '请输入正确的手机号码';
                this.nextSibling.className = '';
                this.nextSibling.className = 'inred';
                chphone = false;
                return;
            }
        }
    }

    oChphone();
// QQ校验
    //ClassName  oChQQ
    function oChQQ() {
        var oChQQ = getByClass(oCheck, 'oChQQ')[0];
        var reQQ = /^[1-9]\d{5,12}$/;
        oChQQ.onkeyup = function () {
            if (this.value.length >= 14) {
                this.value = this.value.substr(0, 14)
            }
            if (reQQ.test(this.value)) {
                this.nextSibling.innerHTML = '输入正确';
                this.nextSibling.className = '';
                this.nextSibling.className = 'ingreen';
                chQQ = true;
                return;
            } else {
                this.nextSibling.innerHTML = '请输入正确的QQ号码';
                this.nextSibling.className = '';
                this.nextSibling.className = 'inred';
                chQQ = false;
                return;
            }
        }
    }

    oChQQ();
//邮箱校验
    function oChmail() {
        var oChmail = getByClass(oCheck, 'oChmail')[0];
        var reMail = /^\w+@[a-z0-9]+\.[a-z]+$/i;
        oChmail.onkeyup = function () {
            if (this.value.length >= 30) {
                this.value = this.value.substr(0, 30)
            }
            if (reMail.test(this.value)) {
                this.nextSibling.innerHTML = '输入正确';
                this.nextSibling.className = '';
                this.nextSibling.className = 'ingreen';
                chMail = true;
                return;
            } else {
                this.nextSibling.innerHTML = '请输入正确的邮箱';
                this.nextSibling.className = '';
                this.nextSibling.className = 'inred';
                chMail = false;
                return;
            }

        }
    }

    oChmail();
    var oCheckSbumit = getByClass(window, 'oCheckSbumit')[0];
    oCheckSbumit.onclick = function () {
        oCheckSbumit1();
    };
    function oCheckSbumit1() {
        var chckevalue = false;
        if (chxm == true) {
            chckevalue = true;
        } else {
            alert('请输入名字');
            return false;
        }
        if (chphone == true) {
            chckevalue = true;
        } else {
            alert('请输入手机号码');
            return false;
        }
        if (chQQ == true) {
            chckevalue = true;
        } else {
            alert('请输入QQ号码');
            return false;
        }
        if (chMail == true) {
            chckevalue = true;
        } else {
            alert('请输入邮箱');
            return false;
        }
        if (chckevalue == true) {
            alert('提交成功');
            window.location.href='http://www.baidu.com';
        } else {
            alert('失败');
            return chckevalue;
        }
    }

    window.onkeyup = function () {
        console.log('检查是否通过验证:\n' + '姓名' + chxm + '\n' + '手机' + chphone + '\n' + 'QQ' + chQQ + '\n' + '邮箱' + chMail)
    }
};
oCHCK();
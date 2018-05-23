
const axios = require('axios');
var nodemailer = require('nodemailer');

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: '163',
    auth: {
        user: '18233008640@163.com',
        pass: 'chenjinxin505150'
    }
});

// NB! No need to recreate the transporter object. You can use
// the same transporter object for all e-mails

// setup e-mail data with unicode symbols


// send mail with defined transport object


// 特定日期的查询
const pointOfTime = ['2018-05-26', '2018-05-27','2018-05-28', '2018-05-29','2018-05-30','2018-05-31'];

// 所有日期的查询

const pointAllDay = [
    '2018-05-23', '2018-05-24', '2018-05-25', '2018-05-26', '2018-05-27', '2018-05-28', '2018-05-29','2018-05-30','2018-05-31',
    '2018-06-01', '2018-06-02', '2018-06-03', '2018-06-04', '2018-06-05', '2018-06-06', '2018-06-07','2018-06-08','2018-06-09',
    '2018-06-10', '2018-06-11', '2018-06-12', '2018-06-13', '2018-06-14', '2018-06-15', '2018-06-17','2018-06-18','2018-06-19',
];

// 查询api
const searchApi =  'http://yy.ihrdata.com/subscribe/getAvailable.json'
// 查询api header

const searchHeader = {

}

// 请求头参数


 
const getSearch = (subDate) => {
    axios.post(`${searchApi}?subDate=${subDate}&address=%E5%A4%A9%E6%B4%A5%E4%BA%BA%E5%8A%9B%E8%B5%84%E6%BA%90%E5%8F%91%E5%B1%95%E4%BF%83%E8%BF%9B%E4%B8%AD%E5%BF%83`)
    .then(function (response) {
        const {data:{status, data, message}} = response;
        if (status == 0) {
            const {
                maxNumAm,
                nowNumPm,
                nowNumAm,
                maxNumPm,
            } = data
            if (maxNumAm > nowNumAm) {
                console.log(subDate +'上午有号')
                postJson(subDate, 1)
            } else if(maxNumPm > nowNumPm) {
                console.log(subDate + '下午有号')
                postJson(subDate, 0)
            } else {
                console.log(subDate + '没号了')
            }
        } else {
            console.log(subDate + '还不能预约' + message)
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}

let pxun = 0;
function xunhuan () {
    if (pointOfTime.length - 1 < pxun){
        // xunhuana()
        return;
    }
    setTimeout(() => {
        getSearch(pointOfTime[pxun]);
        pxun++;
        xunhuan()
    }, 500)
}
xunhuan()


let axun = 0;
function xunhuana () {
    if (pointAllDay.length - 1 < axun){
        return;
    }
    setTimeout(() => {
        getSearch(pointAllDay[axun]);
        axun++;
        xunhuan()
    }, 500)
}

function postJson (subDate, isMoring) {
    
    axios.post(`http://yy.ihrdata.com/subscribe/insert.json?realname=%E9%99%88%E9%87%91%E9%91%AB&phone=18233008640&documentNo=130826199111295612&subDate=${subDate}&address=%E5%A4%A9%E6%B4%A5%E4%BA%BA%E5%8A%9B%E8%B5%84%E6%BA%90%E5%8F%91%E5%B1%95%E4%BF%83%E8%BF%9B%E4%B8%AD%E5%BF%83&isMoring=${isMoring}`)
    .then(function (response) {
        const {data:{status, success, message}} = response;
        if (success) {
            console.log( '预约成功' + message)
            var mailOptions = {
                from: '18233008640@163.com', // sender address
                to: 'chenjinxin@koolearn-inc.com', // list of receivers
                subject: '约成功了', // Subject line
                text: '约成功了', // plaintext body
                html: '<b>HTML 文本噢！</b>' // html body
            };
            transporter.sendMail(mailOptions, function(error, info){
                if(error){
                    console.log(error);
                }else{
                    console.log('Message sent: ' + info.response);
                }
            });
        } else {
            console.log( '预约失败' + message)
            var mailOptions = {
                from: '18233008640@163.com', // sender address
                to: 'chenjinxin@koolearn-inc.com', // list of receivers
                subject: '预约失败了', // Subject line
                text: '预约失败了，手动试试吧', // plaintext body
                html: '<b>HTML 文本噢！</b>' // html body
            };
            transporter.sendMail(mailOptions, function(error, info){
                if(error){
                    console.log(error);
                }else{
                    console.log('Message sent: ' + info.response);
                }
            });
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}




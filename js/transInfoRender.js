'use strict' 

function addtransDetail(txid,transData){
    var tdata = [];
    // 先获取当前查询交易编号对应的数据记录
    for(var i=0; i<transData.length; i++){
        if(txid == transData[i].hash)
            tdata.push(transData[i]);
    }
    console.log(tdata);

    $('.panel-body .row .id').text(txid);
    $('.panel-body .row .bh a').text(tdata[0].blockhash);
    //这里用.attr获取title属性内容或修改
    $('.panel-body .row .bh').attr('title','块高度：' + tdata[0].blockheight);
    $('.panel-body .row .weight').text(tdata[0].weight);//用weight代替确认数
    $('.panel-body .row .version').text(tdata[0].ver);
    $('.panel-body .row .txfee').text(tdata[0].fee + ' BTC');//fee没有，默认为0
    $('.panel-body .row .ins').text(tdata[0].vin_sz);
    $('.panel-body .row .outs').text(tdata[0].vout_sz);
    $('.panel-body .row .time').text(unifyTime(tdata[0].time));
 
    //开始展示某笔交易的详细地址和金额信息


    var inRow = '<div class="row"><a href="#"><div class="col-xs-8 wordwrap"></div>' +
                '</a><div class="col-xs-4"></div></div>';

    var outRow = '<div class="row"><div class="col-xs-8 wordwrap"><a href="#"></a></div>'+
                    '<div class="col-xs-4"></div></div>';

    //判断当前交易输入地址数量,并添加表格栏
    var len_inAddrs = (tdata[0].input_addrs).length;
        console.log(len_inAddrs);
        if(len_inAddrs){
            while(len_inAddrs--){
            $('.input').append(inRow);
            }
        }else{
            $('.input').text('No Inputs (Newly Generated Coins)');
        } 
    //判断当前交易输出地址数量，并添加表格栏
    var len_outAddrs = (tdata[0].output_addrs).length;
    while(len_outAddrs--){
        $('.output').append(outRow);
    }

    //填写输入输出地址的内容 
    $('.input .col-xs-8').each(function(j){
        $(this).text(tdata[0].input_addrs[j]);
    });

    $('.input .col-xs-4').each(function(j){
        $(this).text((tdata[0].input_values[j]/Math.pow(10,8)) + ' BTC');
    });


    $('.output .col-xs-8 a').each(function(j){      
        $(this).text(tdata[0].output_addrs[j]);       
    });

    $('.output .col-xs-4').each(function(j){       
        $(this).text((tdata[0].output_values[j]/Math.pow(10,8)) + ' BTC');
    });


}
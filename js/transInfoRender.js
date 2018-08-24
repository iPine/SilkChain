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
    $('.panel-body .row .confirnum').text(tdata[0].weight);//用weight代替确认数
    $('.panel-body .row .version').text(tdata[0].ver);
    $('.panel-body .row .txfee').text(tdata[0].fee + ' BTC');//fee没有，默认为0
    $('.panel-body .row .ins').text(tdata[0].vin_sz);
    $('.panel-body .row .outs').text(tdata[0].vout_sz);
    $('.panel-body .row .time').text(unifyTime(tdata[0].time));
   
    var addleft = '<div class="col-xs-8 wordwrap addressin"><a href="#"></a></div>' +
                  '<div class="col-xs-4 moneyin"></div>';

    var addright = '<div class="row"><div class="col-xs-8 wordwrap cout"><a href="#"></a></div>'+
                    '<div class="col-xs-4 cmoney"></div></div>';

    // 判断输入地址是否为coinbase，若是，则不用添加节点；若不是，则添加节点
    var address = $('.panel-body .row .addressin').text();
    console.log(address);
    console.log(tdata[0].txins);
    if(address.indexOf(tdata[0].txins) != -1){
        $('.panel-body .row .cout a').text(tdata[0].txouts);
        $('.panel-body .row .cmoney').text(tdata[0].txmoney + ' SLB');
  
    }else{
        $('.panel-body .addleft').html(addleft);
        $('.panel-body .addright').append(addright);

        $('.panel-body .row .addressin a').text(tdata[0].txins);
        $('.panel-body .row .moneyin').text((tdata[0].txmoney[1] + tdata[0].fee) + ' SLB');

        $('.panel-body .row .cout a').each(function(i){
            $(this).text(tdata[0].txouts[i]);
        });

        $('.panel-body .row .cmoney').each(function(i){
            $(this).text(tdata[0].txmoney[i] + ' SLB');
        });


    }

}
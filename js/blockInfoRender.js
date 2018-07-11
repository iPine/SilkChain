'use strict'

//单个block页面的详细信息展示
function addblockDetail(blockHash,blockHeight,blockData,transData){

    var bdata = [];
    var tdata = [];

    var identifier = ''; 
    if(blockHeight && blockHash == ""){
        $('thead>tr .b-height').text('#'+blockHeight);
        // 找相应高度对应的那条数据，然后读其他值
        bdata = getTransforBlock(blockHeight,blockData);
        // console.log(bdata);

        $('tbody>tr .b-hash').text(bdata[0].hash);
        identifier = blockHeight;

    }else if(blockHash && blockHeight == 0){
        // console.log(blockHash);
        // 说明传入的不是高度，而是哈希值
        $('tbody>tr .b-hash').text(blockHash);

        // 找相应哈希值对应的那条数据，然后读其他值
        bdata = getTransforBlock(blockHash,blockData);
        
        // console.log(bdata);

        $('thead>tr .b-height').text('#'+bdata[0].height);
        identifier = blockHash;
    }  
    
    // 获取当前block包含的交易数据
    tdata = getTransforBlock(identifier,transData);
    

     
    $('tbody>tr .r-hash').text(bdata[0].merkleroot);
    $('tbody>tr .p-hash').text(bdata[0].proofhash);
    $('tbody>tr .version').text(bdata[0].version);
    
    $('tbody>tr .b-size').text(bdata[0].size+" Byte");
    $('tbody>tr .b-p').text(bdata[0].flags);
    $('tbody>tr .b-time').text(unifyTime(bdata[0].time));
    $('tbody>tr .b-difficult').text(bdata[0].difficulty);
    $('tbody>tr .b-nonce').text(bdata[0].nonce);
    $('tbody>tr .b-confir').text(bdata[0].confirmations);//=最新块高度 -当前块高度
    $('h5.t-num').text("交易数： " + bdata[0].transactions);
    $('tbody>tr .t-fee').text(bdata[0].mint +' SLB');//mint就是交易费

    var blockTFee = 0;
    var length = tdata.length;
    console.log(tdata);

    // for(var i=0; i<length; i++){
    //     blockTFee += Math.abs(tdata[i].fee);
    // }
    
    $(".panel-heading .wordwrap a").text(tdata[0].txid);

    $(".panel-heading .col-xs-4").text(unifyTime(tdata[0].txntime));


    $(".panel-body .col-xs-12").html("<b>coinbase: </b>"+ tdata[0].txins);
    
    $(".panel-body .col-xs-8.cout a").text(tdata[0].txouts);
    $(".panel-body .col-xs-4.cmoney").text(tdata[0].txmoney + ' SLB');

    if(length>1){
        for(var j=1; j<length;j++){
            addTrans();
            $(".panel-heading .col-xs-8.add a").text(tdata[j].txid);
            $(".panel-heading .col-xs-4.add").text(unifyTime(tdata[j].txntime));
            $(".panel-body .col-xs-8.ins").text(tdata[j].txins);
            $(".panel-body .col-xs-4.imoney").text((tdata[j].txmoney[1] -  bdata[0].mint) + ' SLB');

            console.log($(".panel-body .out a").length);

            $(".panel-body .col-xs-8.out a").each(function(i){

                $(this).text(tdata[j].txouts[i]);
            });
            $('.panel-body .col-xs-4.omoney').each(function(i){
                $(this).text(tdata[j].txmoney[i] + ' SLB');
            });
        }
    }


}

//为单个block添加panel展示交易记录
function addTrans(){
    var panel = '<div class="panel panel-default">' +
        '<div class="panel-heading">' +
            '<div class="row">' +
                '<div class="col-xs-8 wordwrap add"><a href="#"></a></div>' +
                '<div class="col-xs-4 add"></div>' +
            '</div>' +
        '</div>' +
        '<div class="panel-body">' +
            '<div class="row">' +
                '<div class="col-sm-5">' +
                    '<div class="row">' +
                        '<a href="#">' +
                            '<div class="col-xs-8 wordwrap ins"></div>' +
                        '</a>' +
                        '<div class="col-xs-4 imoney"></div>' +
                    '</div>' +
                '</div>' +
                '<div class="col-sm-2" style="color: blue;">' +
                    '<span class="glyphicon glyphicon-log-in"></span>' +
                '</div>' +
                '<div class="col-sm-5">' +
                '<div class="row"><div class="col-xs-8 wordwrap out"><a href="#"></a></div><div class="col-xs-4 omoney"></div></div>' +
                '<div class="row"><div class="col-xs-8 wordwrap out"><a href="#"></a></div><div class="col-xs-4 omoney"></div></div>' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</div>';

    $('.container').append(panel);
    // $.each($('.container'),function(i,t){
    //     $(t).html($(t).html() + panel);
    // });

}


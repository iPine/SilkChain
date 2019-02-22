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
    $('tbody>tr .p-hash').text(bdata[0].previousblockhash);
    $('tbody>tr .version').text('0x'+parseInt(bdata[0].version).toString(16));
    
    $('tbody>tr .b-size').text(bdata[0].size/1000+" kB");
    // var main_chain = bdata[0].main_chain.substring(0,1).toUpperCase()+bdata[0].main_chain.substring(1);
    $('tbody>tr .b-p').text(bdata[0].main_chain);
    $('tbody>tr .b-time').text(unifyTime(bdata[0].time));
    $('tbody>tr .b-difficult').text(bdata[0].difficulty);
    $('tbody>tr .b-nonce').text(bdata[0].nonce);
    $('tbody>tr .b-confir').text(bdata[0].bits);//
    $('h5.t-num').text("交易数： " + bdata[0].transactions);
    $('tbody>tr .t-fee').text('0.'+bdata[0].fee +' BTC');//交易费格式

//开始展示区块内的交易list
    var blockTFee = 0;
    var length = tdata.length;
    console.log(tdata);
    while(length--){
        addTrans();
    }

    
        
    $(".panel-heading .wordwrap a").each(function(i){
        $(this).text(tdata[i].hash);
    });
    $(".panel-heading .col-xs-4").each(function(i){
        $(this).text(unifyTime(tdata[i].time));
    });
    //根据输入地址的数量添加表格栏
    $('.input').each(function(i){
        var inRow = '<div class="row"><a href="#"><div class="col-xs-8 wordwrap"></div>' +
                 '</a><div class="col-xs-4"></div></div>';
        
        var len_inAddrs = (tdata[i].input_addrs).length;
        console.log(len_inAddrs);
        if(len_inAddrs){
            while(len_inAddrs--){
            $(this).append(inRow);
            }
        }else{
            $(this).text('No Inputs (Newly Generated Coins)');
        } 
        
    });
    //根据输出地址的数量添加表格栏
    $('.output').each(function(i){
        var outRow = '<div class="row"><div class="col-xs-8 wordwrap">' +
                 '<a href="#"></a></div><div class="col-xs-4"></div></div>';
        
        var len_outAddrs = (tdata[i].output_addrs).length;
        while(len_outAddrs--){
            $(this).append(outRow);
        }
    });

        
   //填写输入输出地址的内容 
    $('.input').each(function(i){
        $(this).find('.col-xs-8').each(function(j){
            $(this).text(tdata[i].input_addrs[j]);
        });
    });
    $('.input').each(function(i){
        $(this).find('.col-xs-4').each(function(j){
            $(this).text((tdata[i].input_values[j]/Math.pow(10,8)) + ' BTC');
        });
        
    });
    $('.output').each(function(i){
       
        $(this).find('.col-xs-8 a').each(function(j){
            $(this).text(tdata[i].output_addrs[j]);
        });
        
    });
    $('.output').each(function(i){
        $(this).find('.col-xs-4').each(function(j){
            $(this).text((tdata[i].output_values[j]/Math.pow(10,8)) + ' BTC');
        });
    })
        


}


//为单个block添加panel展示交易记录
function addTrans(){
    var panel = '<div class="panel panel-default">' +
        '<div class="panel-heading">' +
            '<div class="row">' +
                '<div class="col-xs-8 wordwrap"><a href="#"></a></div>' +
                '<div class="col-xs-4"></div>' +
            '</div>' +
        '</div>' +
        '<div class="panel-body">' +
            '<div class="row">' +
                '<div class="col-sm-6 input">' +
                    
                '</div>' +
                '<div class="col-sm-1" style="color: blue;">' +
                    '<span class="glyphicon glyphicon-log-in"></span>' +
                '</div>' +
                '<div class="col-sm-5 output">' +
            
                '</div>' +
            '</div>' +
        '</div>' +
    '</div>';

    $('.container').append(panel);
    // $.each($('.container'),function(i,t){
    //     $(t).html($(t).html() + panel);
    // });

}


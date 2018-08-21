'use strict';


//首页block展示
function addBlock(blockData,transData,up){
    // $('.rowTop .top4').animate({
    //     width: 'hide'
    //   });
    // 显示最新的区块高度，总的交易数
    // showOverall(blockData);
    $(".bar-l").append('区块高度：' + '<span>'+blockData[50-up].height+'</span>');
    $(".bar-r").append('交易数：' + '<span>193400</span>');

    var bnew = '<div class="bnew">' +
                    '<div class="block top4 fr" ><div class="labelhead"></div>' +
                    '<div class="labelbottom"><div class="trans-circle"></div><div class="memory-bar"></div></div>' +
                    '</div>' +
                    '</div>';

    //最新block的弹入效果实现，这里注意display在animate里没有作用，需用opacity 
      $('.rowTop .bnew').remove();
      $('.rowTop').append(bnew);
      $('.bnew').animate({
          marginLeft: '0px',
          width: '200px',
          opacity: 1,
      },2000,'easeOutBounce',function(){
        $('.bnew').addClass('bnewT');
      });


    var svgC = 0;
    // 第一排区块上的文字信息
    $(".rowTop .block").each(function(i){
        
        // 控制block背景透明度的设置，先不这样做
        // $(this).css({
        //     opacity: 0.7-(i*0.1),

        // });

        // 控制after伪类,为每个block添加产生时间信息
        var timeWait = 0;
        if(i>0){
            timeWait = blockData[54-i-up].time - blockData[55-i-up].time;
            
// console.log($(this).attr('class'));
            // 判断是否是最新区块，若是则将伪类的参数添加给父元素.bnew
            if($(this).attr('class').indexOf('top4')!= -1){
                $(this).parent('.bnew').addClass('timewait').attr('data-content',timeWait+'秒');
            }else{
                $(this).addClass('timewait').attr('data-content',(timeWait)+'秒');
            }
        }
        

        // 区块head部分信息显示
        $(this).children(".labelhead").append('<a href="#"><li >区块高度:&nbsp;<span>'+blockData[54-i-up].height+'</span></li>' 
                                            + '<li >区块哈希:&nbsp;<span>'+blockData[54-i-up].hash.slice(0,5)+'.&nbsp;.&nbsp;.'+blockData[54-i-up].hash.slice(59,64)+'</span></li>'
                                            + '<li >上块哈希:&nbsp;<span>'+blockData[54-i-up].previousblockhash.slice(0,5)+'.&nbsp;.&nbsp;.'+blockData[54-i-up].previousblockhash.slice(59,64)+'</span></li>'
                                            + '<li >根哈希:&nbsp;<span>'+blockData[54-i-up].merkleroot.slice(0,6)+'.&nbsp;.&nbsp;.'+blockData[54-i-up].merkleroot.slice(58,64)+'</span></li>'
                                            + '<li >时间:&nbsp;<span>'+unifyTime(blockData[54-i-up].time)+'</span></li>'
                                            + '<li >交易数:&nbsp;<span>'+blockData[54-i-up].transactions+'</span></li></a>');  

        $(this).children(".labelbottom").children(".memory-bar").append('<div class="mb"></div>').addClass('mb');
        // 给每个memory-bar写入size信息
        $(this).children(".labelbottom").children(".memory-bar").append('<p>'+(blockData[54-i-up].size/1000)+'kB</p>');        
          
    });
    // 为第一排每个block添加svg，并将类名设置为区块高度
    var rowTopSVG = d3.selectAll(".rowTop .trans-circle")
            .append('svg')
            .attr({
                width: 132,
                height: 28,
                class: function(d,i){
                    return blockData[54-i-up].height;
                }
            });
    circleRender(rowTopSVG,transData);

    // 第二,三排区块上的文字信息
    $(".block-row:not(.rowTop) .block").each(function(i){

        // 控制after伪类,为每个block添加不同的产生时间信息
        // CSS中的.attr只能应用在伪类中的content属性
        var timeWait = 0;
            timeWait = blockData[54+i-up].time - blockData[55+i-up].time;
            $(this).addClass('timewait').attr('data-content',(timeWait) +'秒');


        // 区块head部分信息显示
        $(this).children(".labelhead").append('<a href="blockinfo.html" target="_blank"><li >区块高度:&nbsp;<span>'+blockData[55+i-up].height+'</span></li>' 
                                            + '<li >区块哈希:&nbsp;<span>'+blockData[55+i-up].hash.slice(0,5)+'.&nbsp;.&nbsp;.'+blockData[55+i-up].hash.slice(59,64)+'</span></li>'
                                            + '<li >上块哈希:&nbsp;<span>'+blockData[55+i-up].previousblockhash.slice(0,5)+'.&nbsp;.&nbsp;.'+blockData[55+i-up].previousblockhash.slice(59,64)+'</span></li>'
                                            + '<li >根哈希:&nbsp;<span>'+blockData[55+i-up].merkleroot.slice(0,6)+'.&nbsp;.&nbsp;.'+blockData[55+i-up].merkleroot.slice(58,64)+'</span></li>'
                                            + '<li >时间:&nbsp;<span>'+unifyTime(blockData[55+i-up].time)+'</span></li>'
                                            + '<li >交易数:&nbsp;<span>'+blockData[55+i-up].transactions+'</span></li></a>');


        $(this).children(".labelbottom").children(".memory-bar").append('<div class="mb"></div>').addClass('mb');

         // 给每个memory-bar写入size信息
        $(this).children(".labelbottom").children(".memory-bar").append('<p>'+(blockData[55+i-up].size/1000)+'kB</p>');
                
    });

    // 为第二排每个block添加svg，并将类名设置为区块高度
    var rowMBSVG = d3.selectAll(".block-row:not(.rowTop) .trans-circle")
            .append('svg')
            .attr({
                width: 132,
                height: 28,
                class: function(d,i){
                    return blockData[55+i-up].height;
                }
            });

    circleRender(rowMBSVG,transData);

    // 给li设置类名，便于统一样式
    $(".labelhead li").addClass("blockInfo");
    // 遍历每一个a标签，取其第一个li,便于设置样式
    $(function(){
        $(".labelhead>a").each(function(){
            // 取出a下的第一个li
            // var li = $(this).children().first().addClass("blockInfo-top");
            $(this).children().first().addClass("blockInfo-top");
        });
    });

}

// 绘制圆
function circleRender(svgContainer,transData){
    var xRange = Math.random() * 132;
    var yRange = Math.random() * 28;
    // var rRange = Math.floor(Math.random()*2 + 2);
    var rRange = 9;
    // console.log(xRange);

    // 分组函数可以不用
    // var nested = d3.nest()
    //                 .key(function(d){
    //                     return d.blockheight;
    //                 })
    //                 // .rollup(agg_add)
    //                 .entries(transData);

    // nested = nested.sort(function(a,b){
    //             return b.key - a.key;
    //         });
    // console.log(nested);

    svgContainer.each(function(i, d) {
        // console.log(d3.select(this).attr('class'));
        var height = d3.select(this).attr('class')
        // console.log(height);
        var data = [];
        // for(var i=0; i<nested.length; i++){
        //     if(nested[i].key == height)
        //         data.push(nested[i].values);
        // }

        data = getTransforBlock(height,transData);
        // console.log(data);
        d3.select(this).append('svg:g').selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .attr({
                cx: xRange,
                cy: yRange,
                r: function(dd,j){
                    // console.log(j);
                    // console.log(dd);
                    return Math.sqrt(rRange*(dd['vins'] + dd['vouts']));
                },
                fill: '#5254a3',
                class: function(dd,i){
                    // return dd.key;
                    return dd.blockheight;
                }
                // class: 'circle'
            })
            .style('fill-opacity',0.5)
            .call(d3.behavior.drag().on("drag", move))
            .append('title')
            .text(function(dd){
                    return "输入输出地址数: " + (dd['vins'] + dd['vouts']);
                });

    });
}

// 从数据文件中获取某个block的具体数据，或其包含的交易数据
function getTransforBlock(identifier,data){
    var dtdata = [];
     for(var i=0; i<data.length;i++){
        // console.log(identifier)
            // 从trans数据提取某个block对应的几条交易信息，以高度为标识
            if(data[0].blockheight && data[i].blockheight == identifier){
                dtdata.push(data[i]);
            }else if(data[0].blockhash && data[i].blockhash == identifier){
            // 从trans数据提取某个block对应的几条交易信息，以hash为标识
                dtdata.push(data[i]);
            }else if(data[0].height && data[i].height== identifier){
                // 从block数据提取某条block信息，以高度为标识
                dtdata.push(data[i]);
            }else if(data[0].hash && data[i].hash == identifier){
                // 从block数据提取某条block信息，以hash为标识
                dtdata.push(data[i]);
            }
        
    }
    return dtdata;
}

// bar展示总体信息
// function showOverall(blockData){
   
//     $(".bar-l").append('<span>'+blockData[0].height+'</span>');
//     $(".bar-r").append('<span>193481</span>');
// }

// 时间格式转换函数
function unifyTime(seconds){
    Date.prototype.toLocaleString = function() {
            var month = this.getMonth() + 1;
            month = month < 10 ? '0' + month : '' + month;
            var seconds = this.getSeconds();
            var minutes = this.getMinutes();
            seconds = seconds < 10 ? '0' + seconds : '' + seconds;
            minutes = minutes < 10 ? '0' + minutes : '' + minutes;
          return this.getFullYear() + "-" + month + "-" + this.getDate() + " " + this.getHours() + ":" + minutes + ":" + seconds;
    };
    var unixTimestamp = new Date(seconds * 1000);
    var commonTime = unixTimestamp.toLocaleString();
    return commonTime;
}
// 鼠标拖拽函数
function move(d){
  var dragTarget = d3.select(this);
  dragTarget
    .attr("cx", d3.event.dx + parseInt(dragTarget.attr("cx")))
    .attr("cy", function(){return d3.event.dy + parseInt(dragTarget.attr("cy"))});

  d = d + d3.event.dx;
  // console.log(d);
};


// block传参函数
function argsTrans(blockheight,blockhash){
     if(window.localStorage){
            localStorage.bh = blockheight;
            localStorage.hash = blockhash;
            location.href = 'blockinfo.html';
    }else{
            alert("not support");
    }
}

//trans传参函数
 function argsTransTwo(txid){
     if(window.localStorage){
            localStorage.id = txid;
            location.href = 'transinfo.html';
    }else{
            alert("not support");
    }
}

// block相关的搜索功能实现
function searchB(){
    // 给搜索框的按钮添加点击跳转事件
    $('#searchbtn').click(function(){
        var bh = 0;
        var bhash = "";
        var inBox = $('#searchkeys').val();
        // debugger

        if(inBox.length < 10){
            bh = parseInt(inBox);
        }
        else{
            if(inBox.slice(0,6) == '000000'){
                bhash = inBox;
                debugger;
            }
        }
        argsTrans(bh,bhash);
    });

     //给搜索框的keydown添加跳转事件
    $('#searchkeys').keydown(function(event){
        if(event.which == 13){
            var bh = 0;
            var bhash = "";
            var inBox = $('#searchkeys').val();
            if(inBox.length < 10){
                bh = parseInt(inBox);
            }
            else{
                if(inBox.slice(0,6) == '000000'){
                    bhash = inBox;
                    debugger;
                }
            }
            argsTrans(bh,bhash);
        }
    });
}

// block刷新函数
function refresh(){
    var up =0;
    var transNum = 193400;
    var add = setInterval(function(){
      up +=1;
      // console.log(up);
      if(up == 50){
        clearInterval(add);
      }},5000);

    var re = setInterval(function(){
      $(".bar-r").append('交易数：' + '<span>193400</span>');
      // 刷新之前需要清空block的信息；先remove圆，再清空文字
      var circle = d3.selectAll('.trans-circle').selectAll('svg').remove();
      $('.labelhead').html('');
      $('.memory-bar').html('');
      $(".bar-l").html('');
      $(".bar-r").html('');

      addBlock(blockData,transData,up);

      

      // console.log(blockData[50-up].transactions);
      transNum += blockData[50-up].transactions;
      $(".bar-r").html('交易数：' + '<span>' +transNum+ '</span>');

      if(up == 50){
        clearInterval(re);
      }
    },5000);


  }
'use strict'

// var blockData =  blockData();
function addBlockList(blockData){

    $('tbody>tr>.b-height').each(function(i){
            $(this).children('a').text(blockData[i].height);
            
    });

    $('tbody>tr').each(function(i){
            $(this).children('.t-num').text(blockData[i].transactions);
            
    });

    $('tbody>tr').each(function(i){
            $(this).children('.b-time').text(unifyTime(blockData[i].time));
            
    });
    
}
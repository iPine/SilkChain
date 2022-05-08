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

function addTransList(transData){
    $('tbody>tr>.t-id').each(function(i){
            $(this).children('a').text(transData[i].hash);
            
    });

    $('tbody>tr').each(function(i){
            $(this).children('.t-input').text(transData[i].vin_sz);
            
    });

    $('tbody>tr').each(function(i){
            $(this).children('.t-output').text(transData[i].vout_sz);
            
    });
}
'use strict'


function addTransList(transData){
    $('tbody>tr>.t-id').each(function(i){
            $(this).children('a').text(transData[i].txid);
            
    });

    $('tbody>tr').each(function(i){
            $(this).children('.t-input').text(transData[i].vins);
            
    });

    $('tbody>tr').each(function(i){
            $(this).children('.t-output').text(transData[i].vouts);
            
    });
}
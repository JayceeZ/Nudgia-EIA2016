/**
 * Created by alexandre on 01/06/16.
 */

var currentID = 0;

window.generateID = function(){
    currentID++;
    return ""+currentID;
};


window.getFormatedText = function(t){
    var text = [];
    var split = t.split('\n');
    for(var l in split){
        text.push(split[l]);
        text.push(<br />);
    }
    return text;
};
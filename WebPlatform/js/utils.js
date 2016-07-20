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

window.getSortedPictures = function(pictures){
    var sorted = [];
    for(var pic in pictures){
        var i;
        for(i = 0; i < sorted.length; i++){
            if(pictures[pic].score >= sorted[i].score)
                break;
        }
        sorted.splice(i,0,pictures[pic])
    }
    return sorted;
};
img="";
status="";
objects=[];

function preload(){
    img=loadImage("dog_cat.jpg");
}

function setup(){
    canvas=createCanvas(380, 380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}

function start(){
    objectDetector=ml5.objectDetector('cocossd', modelloaded );
    document.getElementById("status").innerHTML="Status : Detecting Objects";
}

function modelloaded(){
    console.log("Model has been loaded");
    status=true;
   
}

function gotresult(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}

function draw(){
    image(video, 0 , 0, 380, 380);
   if(status!=""){  
    objectDetector.detect(video, gotresult);

    for(index=0; index<objects.length; index++){
        document.getElementById("status").innerHTML="Status : objects dected";
        document.getElementById("number_of_obj").innerHTML="Number of objects detected are : "+objects.length;
        fill('#FF0000');
        percent=floor(objects[index].confidence*100);
        label_name=(objects[index].label);
        text(label_name+" "+percent+"%", objects[index].x, objects[index].y);
        noFill();
        stroke('#FF0000');
        rect(objects[index].x, objects[index].y, objects[index].height, objects[index].width);
    }
   }
   
    /*fill('#FF0000');
    text("Dog", 45, 75);
    noFill();
    stroke('#FF0000');
    rect(30, 60, 450,350);
    
    fill('#FF0000');
    text("Cat", 320, 120);
    noFill();
    stroke('#FF0000');
    rect(300, 90, 270, 320);*/
}
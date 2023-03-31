status = "";
video = "";
objects = [];
function preload()
{
    video = createVideo("video.mp4");
    video.hide();
}
function setup()
{
    canvas = createCanvas(300, 300);
    canvas.center();
}
function draw()
{
    image(video, 0, 0, 300, 300)
    if(status != "")
    {
        objectDetector.detect(video, gotResults);
        for(i=0; i<objects.length; i++)
        {
            document.getElementById("status").innerHTML = "Status: Detected Image";
            document.getElementById("number_of_objects").innerHTML = "Number of Objects: " + objects.length;
            fill("blue");
            percentage = floor(objects[i].confidence*100);
            text(objects[i].name+ " " +percentage+ "%"+ objects[i].x+ 15 + objects[i].y + 15);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}
function start()
{
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "detecting objects";
}
function modelLoaded(results)
{
    console.log("Model Loaded!");
    status = true;
    song.loop();
    song.speed(1);
    song.volume(0);
}
function gotResults(error, results)
{
    if(error)
    {
        console.error(error);
    }
    console.log(results);
    objects = results;
}
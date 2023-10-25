musica = '';
x_esq =  0;
x_dir = 0;
y_dir = 0;
y_esq = 0;
score_esq = 0;
score_dir = 0;
rate = 0;

function preload(){
    musica = loadSound('music.mp3');
}

function tocar(){
    musica.play();
    musica.setVolume(0.5);
    musica.rate(1);
}

function setup(){
    canvas = createCanvas(900, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(900, 500);
    video.hide();
    poseNet = ml5.poseNet(video, modelo_carregado());
    poseNet.on('pose', gotPoses);
}



function modelo_carregado(){
    console.log('Carreguei');
}


function gotPoses(results){
    console.log(results);
    if(results.length > 0){
    x_esq = results[0].pose.leftWrist.x;
    y_esq = results[0].pose.leftWrist.y;
    x_dir = results[0].pose.rightWrist.x;
    y_dir = results[0].pose.rightWrist.y;
    score_esq = results[0].pose.keypoints[9].score;
    score_dir = results[0].pose.keypoints[10].score;
    console.log('X Esquerdo: ' + floor(x_esq) + ' Y esquerdo: ' + floor(y_esq) + ' X direito: ' + floor(x_dir) + ' Y direito: ' + floor(y_dir));
    
}
}

function draw(){
    image(video, 0, 0, 900, 500);
    if(score_esq > 0.5){
        fill('blue');
        braco_esq = Number(y_esq);
        bo_esquerdo = floor(braco_esq)
        braco_esquerdo = bo_esquerdo/500;
        console.log(braco_esquerdo);
        // musica.setVolume(braco_esquerdo);
        document.getElementById('volume').innerHTML = 'O volume é ' + braco_esquerdo;
        circle(x_esq, y_esq, 30);
        musica.setVolume(braco_esquerdo);
    }
    else{
        musica.setVolume(0.5);
    }

    if(score_esq > 0.5){
        circle(x_dir, y_dir, 30);
        rate = 0;
        if(y_dir > 100 && y_dir <= 200){
            musica.rate(0.5);
            rate = 0.5;
            document.getElementById('velocidade').innerHTML = 'Velocidade = ' + rate;
        }
        else if(y_dir > 200 && y_dir <= 300){
            musica.rate(1);
            rate = 1;
            document.getElementById('velocidade').innerHTML = 'Velocidade = ' + rate;
        }
        else if(y_dir > 300 && y_dir <= 400){
            musica.rate(1.5);
            rate = 1.5;
            document.getElementById('velocidade').innerHTML = 'Velocidade = ' + rate;
        }       
        else if(y_dir > 400 && y_dir <= 500){
            musica.rate(2);
            rate = 2;
            document.getElementById('velocidade').innerHTML = 'Velocidade = ' + rate;
        }
        
    }
}
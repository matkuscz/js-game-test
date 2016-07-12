console.log("Inside hra.css");

function startGame() {
  aktualni_hra = new hra(0 ,10 ,1 );

  console.log("Instance hry vytvorena / nastavena do vychoziho stavu ??? ...");

  obrazovka.start();
}

function updatniObrazovku() {
  obrazovka.textovyVystup.html("Copak se děje:");
  $('.log').animate({opacity:0},200,"linear",function(){
    $(this).animate({opacity:1},200);
  });

  generatorUdalosti.tikni();

  obrazovka.textUdalosti.html(generatorUdalosti.textUdalosti);

  // Prezil jsi udalost ?
  if(aktualni_hra.hp <= 0)
  {
    obrazovka.textovyVystup.html("Seš K.O. - varoval jsem tě...\nTvůj finalni LEVEL:" + aktualni_hra.expy);
    obrazovka.stavHrace.hide(2000);
    clearInterval(obrazovka.interval);
    return;
  }

  // Regen
  aktualni_hra.hp += 3;
  //obrazovka.textovyVystup.html("Regeneruješ se");

  // LVL UP !!!
  aktualni_hra.expy += 1;

  obrazovka.zivoty.html(aktualni_hra.hp);
  obrazovka.expy.html(aktualni_hra.expy);
  obrazovka.utok.html(aktualni_hra.utok);
}

function hra(expy, hp, utok) {
  this.expy = expy;
  this.hp = hp;
  this.utok = utok;
}

var generatorUdalosti = {
  textUdalosti : "",
  tikni : function() {
    this.generujUdalost();
  },
  generujUdalost : function() {
    if( Math.random() > 0.5 ) {
      this.textUdalosti="Pohodička ...";
      aktualni_hra.expy += 1;
    }
    else {
      this.textUdalosti = "Drak velkej jak dva baráky tě totálně zpražil !";
      aktualni_hra.hp -= 7;
    }
  }
}

var obrazovka = {
  zivoty : $("#zivotyHodnota"),
  expy : $("#expyHodnota"),
  utok : $("#utokHodnota"),
  textUdalosti : $('#textUdalosti'),
  textovyVystup : $("#textovyVystup"),
  stavHrace : $('.stavHrace'),
  start : function() {
    this.stavHrace.hide();
    this.stavHrace.show(6000);

    this.zivoty.html(aktualni_hra.hp);
    this.expy.html(aktualni_hra.expy);
    this.utok.html(aktualni_hra.utok);
    this.textovyVystup.html("Vítej v brutalní hře kterou nemáš šanci dát, pokud seš lama :)");

    this.interval = setInterval(updatniObrazovku, 6000);
  },
  clear : function() {
    //this.textovyVystup.html("");
  },
}

var aktualni_hra;
startGame();

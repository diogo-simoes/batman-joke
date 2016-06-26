
var s = Snap('#stage');
var batman = Snap('#batman');
var replay = Snap('#replay');
var s, background, batman, replay, target, bat, joke;

//Scene 1
function scene1() {
  background = s.rect(0,0,640,480);
  joke = 'Array(16).join("bruce" * 10E3) + "Batman!!";';

  var console = s.text(40, 400, '> _');
  console.attr({
    fill: '#fafafa',
    'font-size': '20px',
    'font-weight': '600',
    'font-family': 'monospace'
  });

  var typing = setInterval( function () {
    var typed = console.attr('text').slice(0, -1) + joke.slice(0,1) + '_';
    joke = joke.substring(1);
    console.attr({text: typed});
    if (joke.length == 0) {
      clearInterval(typing);
      setTimeout(function () {
        console.remove();
        scene2();
      }, 1000);
    }
  }, 200);
};

//Scene 2
function scene2 () {
  target = s.circle(100, 100, 60);
  target.attr({
    fill: '#fafafa',
    opacity: '0.0'
  });
  var beam = s.path('M65,149L920,680L148,65Z');
  beam.attr({
    'opacity': '0.0',
    fill: '#fafafa'
  });
  
  var batsignal = s.group(target, beam);
  
  function bleep (t, cb) {
    setTimeout( function () {
      target.attr({
        'opacity': '1.0'
      });
      beam.attr({
        'opacity': '0.25'
      });
      if (cb === undefined) {
        setTimeout( function () {
          target.attr({
            'opacity': '0.0'
          });
          beam.attr({
            'opacity': '0.0'
          });
        }, 500);
      } else {
        setTimeout( function () {
          cb();
        }, 800);
      }
      //
    }, t);
  }
  
  bleep(1000);
  bleep(1800, scan1);
  
  function scan1 () {
    batsignal.animate({
      transform: 't50,250r40,640,480'
    }, 1600, mina.easein, scan2);
  }
  
  function scan2 () {
    batsignal.animate({
      transform: 't90,0r-25,640,480'
    }, 1400, mina.easein, scan3);
  }
  
  function scan3 () {
    batsignal.animate({
      transform: 't128,226r10,640,580'
    }, 800, mina.easein, batfade);
  }
  
  function batfade () {
    beam.animate({
      'opacity': '0.0'
    }, 600, mina.easein);
    
    target.animate({
      r: 120
    }, 800, function () {
      batsignal.remove();
      target = s.circle(320, 240, 120);
      target.attr({
        fill: '#fafafa'
      });
      bat = s.group(batman.select('#bat-elements').clone());
      bat.attr({transform: 's1.25t12,-114'});
      bat.attr({'opacity': '0.0'});
      bat.animate({'opacity': '1.0'}, 1200, mina.easein, scene3);
    });
  }
}

//Scene 3
function scene3 () {
  var nannan = [];
  target.animate({r: 500}, 800);
  bat.animate({transform: 't12,-250'}, 800);

  for (var i = 0; i < 16; i++) {
    var nan = s.text(50 + i * 24, 280 + (i % 2 === 0 ? -1 : 1) * 3, "NaN");
    nan.attr({
      'font-family': 'Bangers',
      'font-size': '16px',
      'opacity': '0.0'
    });
    nannan.push(nan);
  }
  
  var nanner = setInterval(nanConsumer, 300);
  
  function nanConsumer () {
    if (nannan.length === 0) {
      clearInterval(nanner);
      return flashBatman();
    }
    var nan = nannan.shift();
    nan.animate({'opacity': '1.0'}, 200);
  }
  
  function flashBatman () {
    var itsthebatman = s.text(450, 275, "Batman!!");
    itsthebatman.attr({
      'font-family': 'Bangers',
      'font-size': '24px'
    });
    itsthebatman.animate({'font-size': '38px'}, 800, mina.bounce, bindReset);
  }
  
  function bindReset () {
    var replaySign = s.group(replay.select('#replay-elements').clone());
    replaySign.attr({transform: 's0.01t-57220,-49200'});
    replaySign.select('path').attr({fill: '#fafafa'});
    //replaySign.attr({'opacity': '0.0'});
    var replayButton = s.group(bat, replaySign);
    
    setInterval(bounce, 2000);
    function bounce () {
      replayButton.attr({transform: 't0,-8'});
      replayButton.animate({transform: 't0,0'}, 1000, mina.bounce);
    };
    
    replayButton.attr({'cursor': 'pointer'});
    replayButton.click( function () {
      s.clear();
      background = s.rect(0,0,640,480);
      scene1();
    });
  }
}

scene1();
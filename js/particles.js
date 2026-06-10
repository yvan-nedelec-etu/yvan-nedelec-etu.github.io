/* Particules interactives — réagissent à la souris */
(function () {
  var canvas = document.getElementById('bg');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var COUNT = 55;
  var particles = [];
  var mouse = { x: -9999, y: -9999 };
  var REPEL_DIST = 130;
  var REPEL_FORCE = 0.025;

  document.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  document.addEventListener('mouseleave', function () {
    mouse.x = -9999; mouse.y = -9999;
  });

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
  }

  function init() {
    particles = [];
    for (var i = 0; i < COUNT; i++) {
      particles.push({
        x:  Math.random() * canvas.width,
        y:  Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        r:  0.6 + Math.random() * 1.4,
        ox: 0, oy: 0   /* origin offset for floating */
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < COUNT; i++) {
      var p = particles[i];

      /* Répulsion souris */
      var dmx = p.x - mouse.x;
      var dmy = p.y - mouse.y;
      var dm  = Math.sqrt(dmx * dmx + dmy * dmy);
      if (dm < REPEL_DIST && dm > 0) {
        var force = (1 - dm / REPEL_DIST) * REPEL_FORCE;
        p.vx += (dmx / dm) * force;
        p.vy += (dmy / dm) * force;
      }

      /* Limite de vitesse */
      var speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      if (speed > 1.6) { p.vx *= 0.97; p.vy *= 0.97; }

      /* Lignes entre voisins */
      for (var j = i + 1; j < COUNT; j++) {
        var q  = particles[j];
        var dx = p.x - q.x;
        var dy = p.y - q.y;
        var d  = Math.sqrt(dx * dx + dy * dy);
        if (d < 135) {
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(79,70,229,' + ((0.11 * (1 - d / 135))).toFixed(3) + ')';
          ctx.lineWidth   = 0.7;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }

      /* Lignes vers la souris */
      if (dm < 180) {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(79,70,229,' + (0.14 * (1 - dm / 180)).toFixed(3) + ')';
        ctx.lineWidth   = 0.8;
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }

      /* Particule */
      var alpha = dm < REPEL_DIST ? 0.55 : 0.25;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r + (dm < REPEL_DIST ? (1 - dm / REPEL_DIST) * 1.2 : 0), 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(79,70,229,' + alpha + ')';
      ctx.fill();

      /* Déplacement */
      p.x += p.vx;
      p.y += p.vy;
      p.vx *= 0.9995;
      p.vy *= 0.9995;

      if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();
})();

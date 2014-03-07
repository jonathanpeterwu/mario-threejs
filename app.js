window.addEventListener('load', initialize, false)

function initialize() {
  var scene = new THREE.Scene();
      //camera(zoom,someshit,not sure, near, far) READ DOCS MAYBE GUISE
      //also whats a frustum
      var camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, .1, 10);
      var renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);

      //THE WORST IDEAAAAA
      var geometry = new THREE.CubeGeometry(1,1,1);
      //we can also set textures
      var material = new THREE.MeshLambertMaterial({color: 0x333333});
      //set shape of geo
      var cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      camera.position.z = 3;
      camera.position.x = 3;
      camera.position.y = 1;
      console.log(camera)

      // var ambientLight = new THREE.AmbientLight(0x00044);
      // scene.add(ambientLight)

      var directionalLight = new THREE.DirectionalLight(0xFFFFFF);
      directionalLight.position.set(3,1,10).normalize();
      scene.add(directionalLight);

      var render = function () {
        requestAnimationFrame(render);
        cube.rotation.x += 0.1;
        renderer.render(scene, camera);
      };

      render();

    }
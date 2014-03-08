window.addEventListener( 'load', initialize, false )

function initialize() {
  var world = new World()
  world.setRender();
  world.setCameraPosition();
  world.setLighting();
  var cube = new CubeFactory().createCube("blue");
  world.setScene( cube );

  world.render( cube );
}


World = function(){
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 70, window.innerWidth/window.innerHeight, .1, 10 );
  var renderer = new THREE.WebGLRenderer();

  return {
    setRender: function() {
      renderer.setSize( window.innerWidth, window.innerHeight );
      document.body.appendChild( renderer.domElement );
    },

    render: function( cube ) {
      var self = this
      requestAnimationFrame( function(){
       self.render( cube )
      });

      cube.rotation.x += 0.1;
      renderer.render( scene, camera );
    },

    setCameraPosition: function(){
      camera.position.z = 3;
      camera.position.x = 3;
      camera.position.y = 1;
    },

    setLighting: function() {
      var directionalLight = new THREE.DirectionalLight(0xFFFFFF);
      directionalLight.position.set( 3,1,10 ).normalize();
      scene.add( directionalLight );
    },

    setScene: function( cube ) {
      scene.add( cube );
    }
  }
}

function Cube( color ) {
  this.geometry = new THREE.CubeGeometry(1,1,1);
  this.material = new THREE.MeshLambertMaterial( {color: color} );
}

function CubeFactory() {
  this.cubes = [];
}

CubeFactory.prototype = {
  createCube: function(color) {
    var cube = new Cube(color);
    this.cubes.push(cube);
    return new THREE.Mesh(cube.geometry, cube.material)
  }
};




// Cube.prototype = {
//   createCube: function() {
//     console.log(this.geometry);
//     console.log(this.material);
//     var cube = new THREE.Mesh( this.geometry, this.material );
//     return cube;
//   }
// }
window.addEventListener( 'load', initialize, false )

function initialize() {
  var world = new World()
  world.setRender();
  world.setCameraPosition();
  world.setLighting();
  var cube = new Cube( "blue" ).createCube()
  world.setScene( cube );

  world.render( cube );
}


World = function(){
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 70, window.innerWidth/window.innerHeight, .1, 10 );
  var renderer = new THREE.WebGLRenderer();


  return {
    setRender: function() {
      console.log("setRender")
      renderer.setSize( window.innerWidth, window.innerHeight );
      document.body.appendChild( renderer.domElement );
    },

    render: function( cube ) {
      console.log("render")
      var self = this
      requestAnimationFrame( function(){
       self.render( cube )
      });

      // cube.rotation.x += 0.1;
      // console.log("its working")
      renderer.render( scene, camera );
    },

    setCameraPosition: function(){
      console.log("setCamera")
      camera.position.z = 3;
      camera.position.x = 3;
      camera.position.y = 1;
    },

    setLighting: function() {
      console.log("setLighting")
      var directionalLight = new THREE.DirectionalLight(0xFFFFFF);
      directionalLight.position.set( 3,1,10 ).normalize();
      scene.add( directionalLight );
    },

    setScene: function( cube ) {
      console.log("setScene")
      scene.add( cube );
    }
  }
}

function Cube( color ){
  var geometry = new THREE.CubeGeometry(1,1,1);
  var material = new THREE.MeshLambertMaterial( {color: 0x333} );
}

Cube.prototype = {
  createCube: function(){
    var cube = new THREE.Mesh( this.geometry, this.material );
    return cube
  }
}